"use strict";
var AvengerSetterGetter = /** @class */ (function () {
    function AvengerSetterGetter(nombre) {
        this._nombre = nombre;
    }
    Object.defineProperty(AvengerSetterGetter.prototype, "nombre", {
        get: function () {
            if (this._nombre) {
                return this._nombre;
            }
            else {
                return "No tiene nombre";
            }
        },
        set: function (value) {
            this._nombre = value;
        },
        enumerable: false,
        configurable: true
    });
    return AvengerSetterGetter;
}());
var ciclope = new AvengerSetterGetter('Ciclope');
var otroCiclope = new AvengerSetterGetter();
console.log(ciclope.nombre);
console.log(otroCiclope.nombre);
otroCiclope.nombre = 'Otro nombre';
console.log(otroCiclope.nombre);
