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

const compras = [];

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

// 1. SELECCIÓN PRECISA: referencias al DOM.
const autosContainer = document.getElementById("autos-container");
const accesoriosContainer = document.getElementById("accesorios-container");
const comprasContainer = document.getElementById("compras-container");
const totalElemento = document.getElementById("total");
const feedback = document.getElementById("feedback");

// 2. RENDERIZADO DINÁMICO: recorre un array y genera HTML con backticks.
function renderProductos(productos, contenedor) {
    contenedor.innerHTML = "";

    productos.forEach((producto, indice) => {
        contenedor.innerHTML += `
            <article class="card">
                <div class="card-image">
                    <span>${producto.producto.includes("Motor") ? "⚙️" : producto.producto.includes("Suspensión") ? "🔧" : producto.producto.includes("Sticker") ? "🏷️" : "🚗"}</span>
                </div>

                <div class="card-info">
                    <h3>${producto.producto}</h3>
                    <p>Modelo: ${producto.modelo}</p>
                    <p>Stock disponible: ${producto.stock}</p>
                    <p class="price">$${producto.precio.toLocaleString("es-AR")}</p>
                    <button class="buy-button" data-indice="${indice}" ${producto.stock <= 0 ? "disabled" : ""}>
                        ${producto.stock > 0 ? "Comprar" : "Sin stock"}
                    </button>
                </div>
            </article>
        `;
    });
}

function renderCompras() {
    if (compras.length === 0) {
        comprasContainer.innerHTML = `<p>Todavía no realizaste ninguna compra.</p>`;
        totalElemento.textContent = "$0";
        return;
    }

    comprasContainer.innerHTML = compras.map(producto => `
        <div class="compra-item">
            <span>${producto.producto}</span>
            <strong>$${producto.precio.toLocaleString("es-AR")}</strong>
        </div>
    `).join("");

    const total = compras.reduce((acc, producto) => acc + producto.precio, 0);
    totalElemento.textContent = `$${total.toLocaleString("es-AR")}`;
}

// 3. FEEDBACK VISUAL: muestra la consecuencia de la acción.
function mostrarFeedback(mensaje, correcto = true) {
    feedback.textContent = mensaje;
    feedback.classList.toggle("success", correcto);
}

// 4. EVENTOS: detectamos clicks en los botones de compra.
autosContainer.addEventListener("click", (evento) => {
    if (!evento.target.classList.contains("buy-button")) return;

    const indice = Number(evento.target.dataset.indice);
    const producto = autos[indice];

    comprarProducto(producto);
});

accesoriosContainer.addEventListener("click", (evento) => {
    if (!evento.target.classList.contains("buy-button")) return;

    const indice = Number(evento.target.dataset.indice);
    const producto = accesorios[indice];

    comprarProducto(producto);
});

function comprarProducto(producto) {
    const presupuesto = 20000;

    if (producto.stock <= 0) {
        mostrarFeedback(`No hay stock disponible de ${producto.producto}.`, false);
        return;
    }

    // Mantenemos el presupuesto original del simulador.
    const totalGastado = compras.reduce((acc, producto) => acc + producto.precio, 0);

    if (totalGastado + producto.precio > presupuesto) {
        mostrarFeedback(`No te alcanza para comprar ${producto.producto}.`, false);
        return;
    }

    compras.push(producto);
    producto.actualizarStock(-1);

    mostrarFeedback(`¡Compraste ${producto.producto}! El stock se actualizó.`, true);

    renderProductos(autos, autosContainer);
    renderProductos(accesorios, accesoriosContainer);
    renderCompras();
}

// Primer renderizado.
renderProductos(autos, autosContainer);
renderProductos(accesorios, accesoriosContainer);
renderCompras();
