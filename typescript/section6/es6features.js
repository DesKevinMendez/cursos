"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Variable let
var nombre = "Kevin Méndez";
if (true) {
    var nombre_1 = "Jos Marín";
    if (true) {
        var nombre_2 = "Otro nombre";
    }
}
console.log(nombre); /**print: Kevin Méndez */
// Constantes
var OPCIONES = "Activo";
if (true) {
    var OPCIONES_1 = "Desactivado"; /**Permite porque está en otro scope */
}
for (var _i = 0, _a = [1, 2, 3, 4, 5]; _i < _a.length; _i++) {
    var I = _a[_i];
    console.log(I);
}
// templates literales
var nombre1 = "Bruce";
var nombre2 = "lee";
var mensaje = nombre1 + " " + nombre2 + "\nahora esta es otra linea\notrao linea ";
console.log(mensaje);
// Funciones flecha (lamda function)
// function sumar(a: number,b: number) {
//   return a+b;
// }
// console.log(sumar(1,1));
var sumar = function (a, b) { return a + b; };
console.log(sumar(1, 1));
var capitan = {
    nombre: 'Hulk',
    darOrder: function () {
        var _this = this;
        var self = this;
        setTimeout(function () {
            /**La function () cambia el scope de this */
            console.log(self.nombre);
        }, 1000);
        setTimeout(function () { return console.log(_this.nombre); }, 1000);
    }
};
capitan.darOrder();
// Destructuración de objetos.
var avengers = {
    nick: 'Samuel JAckson',
    ironman: "Robert Downey Jr",
    vision: 'Paul Bettany'
};
var nick = avengers.nick, ironmanModify = avengers.ironman, vision = avengers.vision;
console.log(nick + " " + ironmanModify + " " + vision);
// destructuración de arreglos
console.log('destructuración de arreglos\n');
var avengersArray = ['JAckson', 'Robert', 'paul'];
var avenger1 = avengersArray[0], avenger2 = avengersArray[1], avenger3 = avengersArray[2];
console.log(avenger1 + " " + avenger2 + " " + avenger3);
var onlyThirtyAvenger = avengersArray[2]; // Se deben de separar por ,
console.log(onlyThirtyAvenger);
// Nuevo ciclo for of 
console.log('Nuevo ciclo for of\n');
var thor = {
    nombre: 'thor',
    arma: 'Mjolnir'
};
var ironman = {
    nombre: 'Ironman',
    arma: 'Armorsuit'
};
var capitanAmerica = {
    nombre: 'Capitan america',
    arma: 'Escudo'
};
var avengersAdded = [thor, ironman, capitanAmerica];
for (var _b = 0, avengersAdded_1 = avengersAdded; _b < avengersAdded_1.length; _b++) {
    var avenger = avengersAdded_1[_b];
    console.log(avenger.nombre, avenger.arma);
}
console.log('Clases ES6\n');
// Clases ES6
console.log('');
var Avenger = /** @class */ (function () {
    function Avenger(nombre, poder) {
        this.nombre = nombre;
        this.poder = poder;
    }
    return Avenger;
}());
var AvengerVolador = /** @class */ (function (_super) {
    __extends(AvengerVolador, _super);
    function AvengerVolador(nombre, poder) {
        var _this = _super.call(this, nombre, poder) || this;
        _this.vuela = true;
        return _this;
    }
    return AvengerVolador;
}(Avenger));
var Hulk = new Avenger('Holk', 'destruir');
var Falcon = new AvengerVolador('Falcon X', 'Volador');
console.log(Hulk);
console.log(Falcon);
