let nombre = prompt("¿Cómo es  tu nombre?");
let edad = prompt("¿Cuántos años tenés?");
let año = prompt("¿En qué año estamos?");
edad = parseInt(edad);
año = parseInt(año);
let nacimiento = año - edad;
console.log("Entonces, " +nombre+ ", permitime decirte que naciste en " +nacimiento);
alert("Entonces, " +nombre+ ", permitime decirte que naciste en " +nacimiento);
