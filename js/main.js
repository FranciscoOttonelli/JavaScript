class Producto {
    constructor(producto, precio, stock, modelo, tipo) {
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
        this.modelo = modelo;
        this.tipo = tipo;
    }

    actualizarStock(cantidad) {
        this.stock += cantidad;
    }
}

const STORAGE_KEY = "ottonelliCarsState";

const estadoGuardado = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "{}"
);

let compras = estadoGuardado.compras ?? [];

const stockGuardado = estadoGuardado.stock ?? {};

let productos = [];
let autos = [];
let accesorios = [];

const autosContainer =
    document.getElementById("autos-container");

const accesoriosContainer =
    document.getElementById("accesorios-container");

const comprasContainer =
    document.getElementById("compras-container");

const totalElemento =
    document.getElementById("total");

const feedback =
    document.getElementById("feedback");

const vaciarCarrito =
    document.getElementById("vaciar-carrito");

const loadingMessage =
    document.getElementById("loading-message");

const asyncMessage =
    document.getElementById("async-message");

function mostrarToast(mensaje, correcto = true) {
    Toastify({
        text: mensaje,
        duration: 3500,
        gravity: "top",
        position: "right",
        close: true,
        style: {
            background: correcto
                ? "#3d9b5f"
                : "#c43d3d"
        }
    }).showToast();
}

setTimeout(() => {
    asyncMessage.textContent =
        "🔔 Recordatorio: tu presupuesto máximo para las compras es de $20.000. ¡Revisá el stock disponible!";

    asyncMessage.classList.add("show");
}, 3000);

async function cargarProductos() {
    loadingMessage.textContent =
        "⏳ Cargando vehículos y accesorios...";

    try {
        const respuesta =
            await fetch("./data.json");

        if (!respuesta.ok) {
            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );
        }

        const datos =
            await respuesta.json();

        productos = datos.map(item => {
            const producto = new Producto(
                item.nombre,
                item.precio,
                item.stock,
                item.modelo,
                item.tipo
            );

            producto.stock =
                stockGuardado[
                    producto.producto
                ] ?? producto.stock;

            return producto;
        });

        autos = productos.filter(
            producto =>
                producto.tipo === "auto"
        );

        accesorios = productos.filter(
            producto =>
                producto.tipo === "accesorio"
        );

        renderTodo();

        loadingMessage.textContent =
            "✅ Productos cargados correctamente.";

        mostrarToast(
            "✅ Productos cargados con éxito.",
            true
        );

    } catch (error) {
        console.error(
            "Error al cargar los productos:",
            error
        );

        loadingMessage.textContent =
            "❌ No se pudieron cargar los productos. Revisá la conexión o el archivo data.json.";

        mostrarToast(
            "❌ No se pudieron cargar los productos.",
            false
        );

    } finally {
        loadingMessage.classList.add(
            "finished"
        );
    }
}

function guardarEstado() {
    const estado = {
        compras,
        stock: productos.reduce(
            (acc, producto) => {
                acc[producto.producto] =
                    producto.stock;

                return acc;
            },
            {}
        )
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(estado)
    );
}

function renderProductos(
    lista,
    contenedor
) {
    contenedor.innerHTML =
        lista.map(producto => {

            const {
                producto: nombre,
                precio,
                stock,
                modelo
            } = producto;

            const icono =
                nombre.includes("Motor")
                    ? "⚙️"
                    : nombre.includes("Suspensión")
                        ? "🔧"
                        : nombre.includes("Sticker")
                            ? "🏷️"
                            : "🚗";

            return `
                <article class="card">

                    <div class="card-image">
                        <span>${icono}</span>
                    </div>

                    <div class="card-info">

                        <h3>${nombre}</h3>

                        <p>
                            Modelo: ${modelo}
                        </p>

                        <p>
                            Stock disponible: ${stock}
                        </p>

                        <p class="price">
                            $${precio.toLocaleString("es-AR")}
                        </p>

                        <button
                            class="buy-button"
                            data-producto="${nombre}"
                            ${stock <= 0 ? "disabled" : ""}
                        >
                            ${stock > 0
                                ? "Comprar"
                                : "Sin stock"}
                        </button>

                    </div>

                </article>
            `;
        }).join("");
}

function renderCompras() {
    comprasContainer.innerHTML =
        compras.length === 0
            ? `
                <p class="empty-message">
                    Todavía no realizaste ninguna compra.
                </p>
            `
            : compras.map(
                (compra, indice) => {

                    const {
                        producto,
                        precio,
                        modelo
                    } = compra;

                    return `
                        <div class="compra-item">

                            <div>

                                <strong>
                                    ${producto}
                                </strong>

                                <small>
                                    Modelo: ${modelo}
                                </small>

                            </div>

                            <strong>
                                $${precio.toLocaleString("es-AR")}
                            </strong>

                            <button
                                class="delete-button"
                                data-indice="${indice}"
                            >
                                Eliminar
                            </button>

                        </div>
                    `;
                }
            ).join("");

    const total =
        compras.reduce(
            (acc, compra) =>
                acc + compra.precio,
            0
        );

    totalElemento.textContent =
        `$${total.toLocaleString("es-AR")}`;
}

function renderTodo() {
    renderProductos(
        autos,
        autosContainer
    );

    renderProductos(
        accesorios,
        accesoriosContainer
    );

    renderCompras();
}

function mostrarFeedback(
    mensaje,
    correcto = true
) {
    feedback.textContent =
        mensaje;

    feedback.classList.toggle(
        "success",
        correcto
    );

    feedback.classList.toggle(
        "error",
        !correcto
    );
}

function comprarProducto(producto) {
    const presupuesto = 20000;

    const totalGastado =
        compras.reduce(
            (acc, compra) =>
                acc + compra.precio,
            0
        );

    const stockAnterior =
        producto?.stock;

    const cantidadComprasAnterior =
        compras.length;

    try {
        if (!producto) {
            throw new Error(
                "El producto no existe."
            );
        }

        if (producto.stock <= 0) {
            mostrarToast(
                `❌ No hay stock disponible de ${producto.producto}.`,
                false
            );

            return;
        }

        if (
            totalGastado +
            producto.precio >
            presupuesto
        ) {
            mostrarToast(
                `❌ No te alcanza para comprar ${producto.producto}.`,
                false
            );

            return;
        }

        compras.push({
            ...producto
        });

        producto.actualizarStock(-1);

        guardarEstado();

        mostrarFeedback(
            `¡Compraste ${producto.producto}!`,
            true
        );

        mostrarToast(
            `✅ Compra realizada: ${producto.producto}`,
            true
        );

    } catch (error) {
        console.error(
            "Error al procesar la compra:",
            error
        );

        compras.splice(
            cantidadComprasAnterior
        );

        if (producto) {
            producto.stock =
                stockAnterior;
        }

        mostrarFeedback(
            "⚠️ No se pudo procesar la operación, intentá de nuevo.",
            false
        );

        mostrarToast(
            "⚠️ No se pudo procesar la operación.",
            false
        );

    } finally {
        renderTodo();
    }
}

function eliminarCompra(indice) {
    const compra =
        compras[indice];

    const producto =
        productos.find(
            item =>
                item.producto ===
                compra?.producto
        );

    if (!producto) {
        return;
    }

    producto.actualizarStock(1);

    compras.splice(
        indice,
        1
    );

    guardarEstado();

    renderTodo();

    mostrarFeedback(
        `Eliminaste ${compra.producto}. El stock volvió a actualizarse.`,
        true
    );

    mostrarToast(
        `🗑️ Eliminaste ${compra.producto}.`,
        true
    );
}

autosContainer.addEventListener(
    "click",
    evento => {
        if (
            !evento.target.classList.contains(
                "buy-button"
            )
        ) {
            return;
        }

        const nombreProducto =
            evento.target.dataset.producto;

        const producto =
            productos.find(
                item =>
                    item.producto ===
                    nombreProducto
            );

        producto
            ? comprarProducto(producto)
            : mostrarToast(
                "❌ No se encontró el producto.",
                false
            );
    }
);

accesoriosContainer.addEventListener(
    "click",
    evento => {
        if (
            !evento.target.classList.contains(
                "buy-button"
            )
        ) {
            return;
        }

        const nombreProducto =
            evento.target.dataset.producto;

        const producto =
            productos.find(
                item =>
                    item.producto ===
                    nombreProducto
            );

        producto
            ? comprarProducto(producto)
            : mostrarToast(
                "❌ No se encontró el producto.",
                false
            );
    }
);

comprasContainer.addEventListener(
    "click",
    evento => {
        if (
            !evento.target.classList.contains(
                "delete-button"
            )
        ) {
            return;
        }

        const indice =
            Number(
                evento.target.dataset.indice
            );

        eliminarCompra(indice);
    }
);

vaciarCarrito.addEventListener(
    "click",
    () => {
        if (compras.length === 0) {
            mostrarToast(
                "⚠️ El carrito ya está vacío.",
                false
            );

            return;
        }

        compras.forEach(
            compra => {
                const producto =
                    productos.find(
                        item =>
                            item.producto ===
                            compra.producto
                    );

                producto?.actualizarStock(1);
            }
        );

        compras.splice(
            0,
            compras.length
        );

        localStorage.removeItem(
            STORAGE_KEY
        );

        renderTodo();

        mostrarFeedback(
            "Carrito vacío. El stock fue restaurado.",
            true
        );

        mostrarToast(
            "🛒 Carrito vacío. Stock restaurado.",
            true
        );
    }
);

cargarProductos();