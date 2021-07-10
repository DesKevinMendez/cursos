"use strict";
function enviarMision(xman) {
    console.log('Enviando a: ' + xman.nombre);
    xman.regenerar(xman.nombre);
}
var wolverine = {
    nombre: "wolverine",
    poder: 'Regeneración',
    regenerar: function (nombre) {
        console.log('Se ha regenerado');
        return nombre;
    }
};
// enviarMision(wolverine)
var Mutante = /** @class */ (function () {
    function Mutante(nombre, poder) {
        this.nombre = nombre;
        this.poder = poder;
    }
    Mutante.prototype.regenerar = function (nombre) {
        console.log('Hola ' + nombre);
        return this.poder;
    };
    return Mutante;
}());
;
var sumar;
sumar = function (a, b) {
    return a + b;
};
