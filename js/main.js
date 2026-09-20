const nombre = prompt("Cómo te llamás?");

const presupuestoInicial = 20000;
let presupuesto = presupuestoInicial;
let Gol = 12000;
let Civic = 16000;
let bmw = 19700;
let V12 = 8000;
let suspension = 4000;
let sticker = 300;
let precioAccesorio;
function plataActual(nombre, presupuesto){
    alert("Bien, tené en cuenta que te quedan "+ presupuesto
    +".");
}

function saberDeAuto(motor, velocidad, color){
alert("Sabías que tu auto tiene el motor " + motor +", que lo hace correr a una gran velocidad de " + velocidad +", y viene en un maravilloso color "+color+"?")};
const veintemil = (nombre) => {
    alert("Tenés $20000, " +nombre+ ", usalos con astucia");
}



 veintemil(nombre)

let elegirAuto = prompt(nombre + ", elegí tu auto: 1 - Gol: $12.000 / 2 - Civic: $16.000 / 3 - BMW 430i $19.700")
switch (elegirAuto) {
    case "1":
        presupuesto -= Gol;
        break;

    case "2":
        presupuesto -= Civic;
        break;

    case "3":
        presupuesto -= bmw;
        break;

}
plataActual(nombre, presupuesto);
let accesorios = prompt("Ahora elegí un accesorio: 1 - Motor V12: $8.000 / 2 - Suspensión neumática: $4.000 / 3 - Sticker de arcoíris en la puerta : $300");




if (accesorios === "1") {
    precioAccesorio = V12;
} else if (accesorios === "2") {
    precioAccesorio = suspension;
} else if (accesorios === "3") {
    precioAccesorio = sticker;
}

while (precioAccesorio > presupuesto) {
    alert("No te alcanza para ese accesorio.");

    accesorios = prompt(
        "Elegí otro:\n1 - Motor V12: $8.000\n2 - Suspensión: $4.000\n3 - Sticker: $300"
    );

    if (accesorios === "1") {
        precioAccesorio = V12;
    } else if (accesorios === "2") {
        precioAccesorio = suspension;
    } else if (accesorios === "3") {
        precioAccesorio = sticker;
    }
}

presupuesto -= precioAccesorio;
if (presupuesto > 0){
alert ("Y hasta te sobró plata, "+nombre+", disfrutá tu auto ;)")
}
 else {
alert ("Muy bien hecho, disfrutá tu auto ;).")
}
alert ("Querés saber más de tu auto?")
saberDeAuto("1.6", "170km/h", "rojo");











