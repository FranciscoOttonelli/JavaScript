


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


const stock = [
    gol,
    civic,
    bmw,
    v12,
    suspension,
    sticker,
    vitara,
    a5,
    ka
];




function mostrarStock(stock) {
    for (const producto of stock) {
        alert(
            "Producto: " + producto.producto +
            "\nPrecio: $" + producto.precio +
            "\nStock: " + producto.stock +
            "\nModelo: " + producto.modelo
        );
    }
}

function plataActual(nombre, presupuesto) {
    alert(
        "Bien, " + nombre +
        ". Tené en cuenta que te quedan $" +
        presupuesto + "."
    );

    return presupuesto;
}

function saberDeAuto(motor, velocidad, color) {
    alert(
        "Sabías que tu auto tiene el motor " +
        motor +
        ", que lo hace correr a una gran velocidad de " +
        velocidad +
        ", y viene en un maravilloso color " +
        color +
        "?"
    );
}

const veintemil = (nombre) => {
    alert(
        "Tenés $20000, " +
        nombre +
        ", usalos con astucia"
    );
};



const nombre = prompt("Cómo te llamás?");

const presupuestoInicial = 20000;
let presupuesto = presupuestoInicial;

veintemil(nombre);




const autos = [
    gol,
    civic,
    bmw,
    vitara,
    a5,
    ka
];

let elegirAuto = prompt(
    nombre +
    ", elegí tu auto:\n" +
    "1 - VW Gol: $12.000\n" +
    "2 - Honda Civic: $16.000\n" +
    "3 - BMW 430i: $19.700\n" +
    "4 - Suzuki Vitara: $12.000\n" +
    "5 - Audi A5: $20.000\n" +
    "6 - Ford Ka: $30.000"
);

let autoElegido;

switch (elegirAuto) {

    case "1":
        autoElegido = autos[0];
        compras.push(autoElegido)
        break;

    case "2":
        autoElegido = autos[1];
        compras.push(autoElegido)
        break;

    case "3":
        autoElegido = autos[2];
        compras.push(autoElegido)
        break;

    case "4":
        autoElegido = autos[3];
        compras.push(autoElegido)
        break;

    case "5":
        autoElegido = autos[4];
        compras.push(autoElegido)
        break;

    case "6":
        autoElegido = autos[5];
        compras.push(autoElegido)
        break;

    default:
        alert("Esa opción no existe.");
        break;
}




if (autoElegido) {

    if (autoElegido.stock > 0) {

        if (autoElegido.precio <= presupuesto) {

            presupuesto -= autoElegido.precio;


            autoElegido.actualizarStock(-1);

            alert(
                "Compraste un " +
                autoElegido.producto +
                " modelo " +
                autoElegido.modelo +
                "."
            );

            plataActual(nombre, presupuesto);

        } else {

            alert(
                "No te alcanza para comprar el " +
                autoElegido.producto +
                "."
            );
        }

    } else {

        alert(
            "Nos quedamos sin stock de " +
            autoElegido.producto +
            "."
        );
    }
}



const accesorios = [
    v12,
    suspension,
    sticker
];

let elegirAccesorio = prompt(
    "Ahora elegí un accesorio:\n" +
    "1 - Motor V12: $8.000\n" +
    "2 - Suspensión neumática: $4.000\n" +
    "3 - Sticker de arcoíris en la puerta: $300"
);

let accesorioElegido;

switch (elegirAccesorio) {

    case "1":
        accesorioElegido = accesorios[0];
        compras.push(accesorioElegido);

        break;

    case "2":
        accesorioElegido = accesorios[1];
        compras.push(accesorioElegido);

        break;

    case "3":
        accesorioElegido = accesorios[2];
        compras.push(accesorioElegido);
        break;

    default:
        alert("Esa opción no existe.");
        compras.push(accesorioElegido);
        break;
}



while (
    accesorioElegido &&
    accesorioElegido.precio > presupuesto
) {

    alert(
        "No te alcanza para " +
        accesorioElegido.producto +
        "."
    );

    elegirAccesorio = prompt(
        "Elegí otro:\n" +
        "1 - Motor V12: $8.000\n" +
        "2 - Suspensión: $4.000\n" +
        "3 - Sticker: $300"
    );

    switch (elegirAccesorio) {

        case "1":
            accesorioElegido = accesorios[0];
            break;

        case "2":
            accesorioElegido = accesorios[1];
            break;

        case "3":
            accesorioElegido = accesorios[2];
            break;

        default:
       
            break;
    }
}


if (accesorioElegido) {

    presupuesto -= accesorioElegido.precio;


    accesorioElegido.actualizarStock(-1);

    alert(
        "Compraste: " +
        accesorioElegido.producto
    );
}




if (presupuesto > 0) {

    alert(
        "Y hasta te sobró plata, " +
        nombre +
        ", disfrutá tu auto ;)"
    );

} else {

    alert(
        "Muy bien hecho, disfrutá tu auto ;)."
    );
}



alert("¿Querés saber más de tu auto?");

saberDeAuto(
    "1.6",
    "170km/h",
    "rojo"
);




const limpiavidrios = new Producto(
    "Limpiavidrios",
    500,
    10,
    "Universal"
);

const hilux = new Producto(
    "Toyota Hilux",
    18000,
    1,
    2020
);

stock.push(limpiavidrios);
stock.unshift(hilux);




let conocerStock = prompt(
    "¿Querés conocer nuestro stock?\n" +
    "Elegí un número del 1 al " +
    stock.length
);

const productoConsultado = stock[Number(conocerStock) - 1];

if (productoConsultado) {

    if (productoConsultado.stock > 0) {

        alert(
            "¡Tenemos " +
            productoConsultado.producto +
            " en stock!"
        );

    } else {

        alert(
            "Justo nos quedamos sin ese :("
        );
    }

} else {

    alert("Ese producto no existe.");
}




const checkStock = stock.find(p => p.producto === "Honda Civic");


const aLiquidar = stock.filter(p => p.stock > 3);


const total = compras.reduce(
    (acc, producto) => acc + producto.precio,
    0
);



const cuantoGastaste = prompt("Querés saber cuanto gastaste?")
if (cuantoGastaste.toUpperCase() === "SI") {
    console.log("En total gastaste " + total + ", disfruta tus compras ;).")
} else {
    console.log("Bueno, el que tiene plata compra como quiere ¯\_(ツ)_/¯")
}

const liquidacion = prompt("¡Productos a liquidar!, tenemos un stock amplio de varios productos, y están en descuento, querés que te cuente?");
if (liquidacion.toUpperCase() === "SI") {
    console.log(
        "Dale, los afortunados en descuento son:\n" +
        aLiquidar
            .map(producto => producto.producto + " - $" + producto.precio)
            .join("\n") +
        "\nDecime cuál te interesa."
    );
} else {
    console.log("Bueno, en otra será :)")
}

const empleado = prompt("Ah, sos empleado? Haberme dicho antes y te salteabas todo la intro. Querés ver el stock actual?")
if (empleado.toUpperCase() === "SI"){
    const buscar = prompt("Dale, ingresá el nombre del producto que querés ver.");
    const resultados = stock.filter(producto =>
    producto.producto
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(
            buscar.toLowerCase().replaceAll(" ", "")
        )
       
);
 console.log(resultados);
}
else{
    alert("Perdón, pequeña confusión");
}


