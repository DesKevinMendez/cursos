"use strict";
var Avenger = /** @class */ (function () {
    function Avenger(nombre, equipo, nombreReal) {
        this.puedePelear = false;
        this.peleasGanadas = 0;
        this.nombre = nombre;
        this.equipo = equipo;
        this.nombreReal = nombreReal;
    }
    Avenger.prototype.bio = function () {
        var mensaje = this.nombre + " " + this.nombreReal + " " + this.equipo;
        console.log(mensaje);
    };
    Avenger.prototype.cambiarEquipo = function (nuevoEquipo) {
        if (nuevoEquipo === this.equipo) {
            return false;
        }
        return true;
    };
    Avenger.prototype.cambiarEquipoPublico = function (nuevoEquipo) {
        return this.cambiarEquipo(nuevoEquipo);
    };
    return Avenger;
}());
var antman = new Avenger('Antman', 'Capitan', 'Scott Lang');
antman.bio();
console.log(antman.cambiarEquipoPublico('ironman'));
console.log(antman);
