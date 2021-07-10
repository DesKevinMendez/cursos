"use strict";
var Apocalipsis = /** @class */ (function () {
    function Apocalipsis(nombre) {
        this.nombre = nombre;
    }
    Apocalipsis.llamarApocalipsis = function () {
        if (!Apocalipsis.instance) {
            Apocalipsis.instance = new Apocalipsis('Soy apocalipsis');
        }
        return Apocalipsis.instance;
    };
    return Apocalipsis;
}());
// let apocalipsis = new Apocalipsis('Apocalipsis');
var real = Apocalipsis.llamarApocalipsis();
console.log(real);
