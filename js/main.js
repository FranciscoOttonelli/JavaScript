const nombre = prompt("¿Cómo es  tu nombre?");
let edad = prompt("¿Cuántos años tenés?");
let año = prompt("¿En qué año estamos?");
edad = parseInt(edad);
año = parseInt(año);


while (año<2026) {
alert("¿Seguro?")
año = parseInt(prompt("¿En qué año estamos?"));

}






if (edad > 0 && edad < 130) {
    let nacimiento = año - edad;
    alert(`Entonces, ${nombre}, permitime decirte que naciste en ${nacimiento}.`);
} else {
    alert("Ingresaste una edad inválida.");
}
