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



const STORAGE_KEY = "ottonelliCarsState";


const estadoGuardado = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? "{}"
);


const compras = estadoGuardado.compras ?? [];


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



function renderProductos(lista, contenedor) {
    contenedor.innerHTML = lista
        .map(producto => {

            // Destructuring
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

                        <p>Modelo: ${modelo}</p>

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

    comprasContainer.innerHTML =
        compras.length === 0
            ? `
                <p class="empty-message">
                    Todavía no realizaste ninguna compra.
                </p>
            `
            : compras
                .map((compra, indice) => {

                    // Destructuring
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
        (acc, compra) => acc + compra.precio,
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


function comprarProducto(producto) {

    const presupuesto = 20000;

    const totalGastado = compras.reduce(
        (acc, compra) =>
            acc + compra.precio,
        0
    );

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


    compras.push({
        ...producto
    });

    producto.actualizarStock(-1);

    guardarEstado();
    renderTodo();

    mostrarFeedback(
        `¡Compraste ${producto.producto}! Se guardó tu compra.`,
        true
    );
}

function eliminarCompra(indice) {

    const compra = compras[indice];

    const producto = productos.find(
        item =>
            item.producto === compra?.producto
    );

    if (!producto) {
        return;
    }
    producto.actualizarStock(1);


    compras.splice(indice, 1);


    guardarEstado();
    renderTodo();

    mostrarFeedback(
        `Eliminaste ${compra.producto}. El stock volvió a actualizarse.`,
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

        const producto = productos.find(
            item =>
                item.producto === nombreProducto
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

        const producto = productos.find(
            item =>
                item.producto === nombreProducto
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

        compras.forEach(compra => {

            const producto =
                productos.find(
                    item =>
                        item.producto ===
                        compra.producto
                );

            producto?.actualizarStock(1);
        });

  
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
    }
);

renderTodo();