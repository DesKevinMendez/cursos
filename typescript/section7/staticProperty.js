"use strict";
var Xmen2 = /** @class */ (function () {
    function Xmen2() {
    }
    Xmen2.crearXmen = function () {
        return new Xmen2();
    };
    Xmen2.nombre = "wolverine";
    return Xmen2;
}());
// let wolverine: Xmen2 = new Xmen2()
console.log(Xmen2.nombre);
var wolverine = Xmen2.crearXmen();
