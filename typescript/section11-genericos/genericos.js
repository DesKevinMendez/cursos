"use strict";
function functionGenerica(arg) {
    return arg;
}
console.log(functionGenerica(15.6456435).toFixed(2));
console.log(functionGenerica("una cadena").charAt(0));
console.log(functionGenerica(new Date()).getTime());
var deadpool = {
    nombre: "Deadpool",
    nombreReal: 'Wade Winston',
    poder: "Regeneración"
};
console.log(functionGenerica(deadpool));
console.log("===========\nArreglos genericos \n===========\n");
var heroes = ['flash', 'Batman', 'Superman']; // Generico
var villanos = ['Lex luthor', 'Flash Reverso']; // Explicito
console.log("\n===========\nClasses genericas \n===========\n");
var Cuadrado = /** @class */ (function () {
    function Cuadrado(base, altura) {
        this.base = base;
        this.altura = altura;
    }
    Cuadrado.prototype.area = function () {
        return +this.base * +this.altura;
    };
    return Cuadrado;
}());
var cuadrado = new Cuadrado(1, 1);
cuadrado.base = "10";
cuadrado.altura = 10;
console.log(cuadrado.area());
