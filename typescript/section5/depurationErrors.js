"use strict";
var heroe = "Kevin Méndez";
var edad = 40;
var mensaje = imprimir(heroe, edad);
console.log(mensaje);
function imprimir(heroe, edad) {
    heroe = heroe.toLowerCase();
    edad = edad + 10;
    return heroe + ' ' + edad;
}
//# sourceMappingURL=depurationErrors.js.map