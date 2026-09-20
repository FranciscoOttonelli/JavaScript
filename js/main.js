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
let autoElegido;
let accesorioElegido;
const stock = ["VW Gol", "Honda Civic", "BMW 430i", "Motor V12", "Suspensión", "Sticker"];
function mostrarStock(stock) {
    for (const producto of stock) {
        alert("Ahora tenemos: " + producto);
    }
}
function plataActual(nombre, presupuesto){
    alert("Bien, tené en cuenta que te quedan "+ presupuesto
    +".")
return presupuesto;
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
        
        autoElegido = 0;
break;
    case "2":
        presupuesto -= Civic;
       
        autoElegido = 1;
 break;
    case "3":
        presupuesto -= bmw;
       
        autoElegido = 2;
 break;
}

plataActual(nombre, presupuesto);
let accesorios = prompt("Ahora elegí un accesorio: 1 - Motor V12: $8.000 / 2 - Suspensión neumática: $4.000 / 3 - Sticker de arcoíris en la puerta : $300");




if (accesorios === "1") {
    precioAccesorio = V12;
accesorioElegido = 3;
} else if (accesorios === "2") {
    precioAccesorio = suspension;
    accesorioElegido = 4;
} else if (accesorios === "3") {
    precioAccesorio = sticker;
    accesorioElegido = 5;
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


stock.splice(autoElegido, 1);

if (accesorioElegido > autoElegido) {
    accesorioElegido--;
}

stock.splice(accesorioElegido, 1);

stock.push("Limpiavidrios");
alert ("Se añadió al stock el " +stock[6]);
stock.unshift("Toyota Hilux");
alert("¡Nuevo ingreso! Ahora podés comprar nuestra nueva "+stock[0]);
let conocerStock = prompt("Querés conocer nuestro stock? Dame un número del 1-8");
switch(conocerStock){
case "1": 
    if(stock.includes("Toyota Hilux")){
        alert("¡Esa es nuestra nueva Toyota Hilux!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;

    case "2":
        if(stock.includes("VW Gol")){
        alert("¡Ese es el VW Gol!")}
    
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
 case "3":
        if(stock.includes("Honda Civic")){
        alert("¡Ese es el Honda Civic!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
     case "4":
        if(stock.includes("BMW 430i")){
        alert("¡Ese es el BMW 430i!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
     case "5":
        if(stock.includes("Motor V12")){
        alert("¡Ese es el Motor V12!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
     case "6":
        if(stock.includes("Suspensión")){
        alert("¡Esa es la suspensión!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
     case "7":
        if(stock.includes("Sticker")){
        alert("¡Ese es el sticker!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;
     case "8":
        if(stock.includes("Limpiavidrios")){
        alert("¡Ese es el Limpiavidrios!")
    }
    else{
        alert("Justo nos quedamos sin ese :(")
    }
    break;

}
mostrarStock(stock)
















