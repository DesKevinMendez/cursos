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
var AvengerH = /** @class */ (function () {
    function AvengerH(nombre, nombreReal) {
        this.nombre = nombre;
        this.nombreReal = nombreReal;
        this.nombre = nombre;
        this.nombreReal = nombreReal;
    }
    AvengerH.prototype.getNombre = function () {
        return this.nombre;
    };
    return AvengerH;
}());
var Xmen = /** @class */ (function (_super) {
    __extends(Xmen, _super);
    function Xmen(nombre, nombreReal) {
        return _super.call(this, nombre, nombreReal) || this;
    }
    Xmen.prototype.getNombre = function () {
        return _super.prototype.getNombre.call(this);
    };
    return Xmen;
}(AvengerH));
var antman2 = new Xmen('Ciclope', 'Scott Lang');
console.log(antman2);
console.log("\n");
console.log(antman2.getNombre());
