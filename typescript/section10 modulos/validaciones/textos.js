"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerError = void 0;
var mensajes = [
    "El texto es muy corto",
    "El texto es muy largo"
];
function obtenerError(numErro) {
    if (numErro > mensajes.length) {
        return "El código de error no existe";
    }
    return mensajes[numErro];
}
exports.obtenerError = obtenerError;
