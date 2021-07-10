var Validaciones;
(function (Validaciones) {
    function validarTexto(params) {
        if (params.length > 3) {
            return true;
        }
        return false;
    }
    Validaciones.validarTexto = validarTexto;
})(Validaciones || (Validaciones = {}));
var Validaciones;
(function (Validaciones) {
    function validarFecha(fecha) {
        if (isNaN(fecha.valueOf())) {
            return false;
        }
        return true;
    }
    Validaciones.validarFecha = validarFecha;
})(Validaciones || (Validaciones = {}));
/// <reference path="validaciones/textos.ts" />
/// <reference path="validaciones/fechas.ts" />
console.log(Validaciones.validarTexto("Barry Allen"));
console.log("\n");
// let hoy = new Date();
// console.log(Validaciones.validarFecha(hoy));
// Correr en consola:
/* tsc --outFile build/app.js validaciones/textos validaciones/fechas namespacesAndModules */ 
