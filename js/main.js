class Producto {
    constructor(producto, precio, stock, modelo) {
        this.producto = producto;
        this.precio = precio;
        this.stock = stock;
        this.modelo = modelo;
    }

    actualizarStock(cantidad) {
        this.stock += cantidad;
    }
}

// Productos base del simulador.
const gol = new Producto("VW Gol", 12000, 1, 2010);
const civic = new Producto("Honda Civic", 16000, 1, 2012);
const bmw = new Producto("BMW 430i", 19700, 1, 2018);

const v12 = new Producto("Motor V12", 8000, 1, "V12");
const suspension = new Producto("Suspensión", 4000, 1, "Neumática");
const sticker = new Producto("Sticker", 300, 1, "Arcoíris");

const vitara = new Producto("Suzuki Vitara", 12000, 6, 2021);
const a5 = new Producto("Audi A5", 20000, 1, 2013);
const ka = new Producto("Ford Ka", 30000, 8, 2002);

const autos = [gol, civic, bmw, vitara, a5, ka];
const accesorios = [v12, suspension, sticker];
const productos = [...autos, ...accesorios];

// ---------------- LOCAL STORAGE ----------------

const STORAGE_KEY = "ottonelliCarsState";

// JSON.parse + ?? para recuperar el estado guardado o empezar vacío.
const estadoGuardado = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "{}"
);

// El carrito se recupera al abrir/refrescar la página.
const compras = estadoGuardado.compras ?? [];

// Recuperamos también el stock actualizado.
const stockGuardado = estadoGuardado.stock ?? {};

productos.forEach(producto => {
    producto.stock =
        stockGuardado[producto.producto] ?? producto.stock;
});

function guardarEstado() {
    const estado = {
        compras,
        stock: productos.reduce((acc, producto) => {
            acc[producto.producto] = producto.stock;
            return acc;
        }, {})
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(estado)
    );
}

// ---------------- DOM ----------------

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

const asyncMessage =
    document.getElementById("async-message");

// ---------------- TEMPORIZADOR ----------------

// Después de 3 segundos mostramos información
// complementaria del simulador.
setTimeout(() => {

    asyncMessage.textContent =
        "🔔 Recordatorio: tu presupuesto máximo para las compras es de $20.000. ¡Revisá el stock disponible!";

    asyncMessage.classList.add("show");

}, 3000);

// ---------------- RENDER ----------------

function renderProductos(lista, contenedor) {

    contenedor.innerHTML = lista
        .map(producto => {

            // Destructuring de los datos del producto.
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
                            ${stock > 0 ? "Comprar" : "Sin stock"}
                        </button>

                    </div>

                </article>
            `;
        })
        .join("");
}

function renderCompras() {

    // Destructuring de cada objeto guardado en el carrito.
    comprasContainer.innerHTML =
        compras.length === 0

            ? `
                <p class="empty-message">
                    Todavía no realizaste ninguna compra.
                </p>
            `

            : compras
                .map((compra, indice) => {

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
                })
                .join("");

    const total = compras.reduce(
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

// ---------------- FEEDBACK ----------------

function mostrarFeedback(
    mensaje,
    correcto = true
) {

    feedback.textContent = mensaje;

    feedback.classList.toggle(
        "success",
        correcto
    );

    feedback.classList.toggle(
        "error",
        !correcto
    );
}

// ---------------- COMPRAR ----------------

function comprarProducto(producto) {

    const presupuesto = 20000;

    const totalGastado = compras.reduce(
        (acc, compra) =>
            acc + compra.precio,
        0
    );

    // Guardamos los valores anteriores para
    // poder revertir la operación si algo falla.
    const stockAnterior =
        producto?.stock;

    const cantidadComprasAnterior =
        compras.length;

    try {

        // Este error podría producirse si en el futuro
        // llega un producto inexistente.
        if (!producto) {
            throw new Error(
                "El producto no existe."
            );
        }

        if (producto.stock <= 0) {

            mostrarFeedback(
                `No hay stock disponible de ${producto.producto}.`,
                false
            );

            return;
        }

        if (
            totalGastado + producto.precio >
            presupuesto
        ) {

            mostrarFeedback(
                `No te alcanza para comprar ${producto.producto}.`,
                false
            );

            return;
        }

        // Guardamos una copia simple del objeto
        // para poder serializarlo con JSON.
        compras.push({
            ...producto
        });

        producto.actualizarStock(-1);

        guardarEstado();

        mostrarFeedback(
            `¡Compraste ${producto.producto}! Se guardó tu compra.`,
            true
        );

    } catch (error) {

        console.error(
            "Error al procesar la compra:",
            error
        );

        // Si la operación falla,
        // restauramos el estado anterior.
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

    } finally {

        // finally se ejecuta siempre,
        // haya error o no.
        renderTodo();
    }
}

// ---------------- ELIMINAR ----------------

function eliminarCompra(indice) {

    const compra =
        compras[indice];

    // ?. evita errores si por alguna razón
    // la compra no existe.
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
}

// ---------------- EVENTOS ----------------

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
            : mostrarFeedback(
                "No se encontró el producto.",
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
            : mostrarFeedback(
                "No se encontró el producto.",
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

// Vacía el carrito, actualiza stock,
// Storage y DOM.
vaciarCarrito.addEventListener(
    "click",
    () => {

        if (compras.length === 0) {

            mostrarFeedback(
                "El carrito ya está vacío.",
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

        // Borramos completamente
        // el estado del Storage.
        localStorage.removeItem(
            STORAGE_KEY
        );

        renderTodo();

        mostrarFeedback(
            "Carrito vacío. El stock fue restaurado.",
            true
        );
    }
);

// Primer renderizado:
// mantiene el estado recuperado del localStorage.
renderTodo();