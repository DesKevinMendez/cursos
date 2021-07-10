var heroe = 'Flash';
function imprime_heroe() {
    return heroe;
}
var activar_batisenal = function () {
    return 'Batiseñal activado';
};
console.log(imprime_heroe());
console.log(activar_batisenal());
function nombreCompleto(nombre, apellido) {
    return nombre + ' ' + apellido;
}
nombreCompleto('kevin', 'mendez');
// funciones con parametros opcionales
function nombreCompleto2(nombre, apellido) {
    if (apellido) {
        return nombre + ' ' + apellido;
    }
    else {
        return nombre;
    }
}
nombreCompleto2('kevin');
// funciones con parametros opcionales
function nombreCompleto3(nombre, apellido, capitalizado) {
    if (capitalizado === void 0) { capitalizado = false; }
    if (capitalizado) {
        return capitalizar(nombre + ' ' + apellido);
    }
    return nombre + ' ' + apellido;
}
function capitalizar(palabra) {
    return palabra.charAt(0).toUpperCase() + palabra.substr(1).toLowerCase();
}
nombreCompleto3('kevin', 'stark');
// Funciones con parametros REST
function nombreCompletoREST(nombre) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return nombre + ' ' + args.join(' ');
}
nombreCompletoREST('kevin', 'Ezequiel', 'Mendez', 'Orellana');
//  Funciones tipo function
function suma(a, b) {
    return a + b;
}
var miFuncion;
miFuncion = 10;
miFuncion = suma;
