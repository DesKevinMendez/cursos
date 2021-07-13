"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function planVillano(constructor) {
    constructor.prototype.imprimirPlan = function () {
        console.log('El plan de ' + this.nombre + ' es dominar el mundo');
    };
}
var Villano3 = /** @class */ (function () {
    function Villano3(nombre) {
        this.nombre = nombre;
    }
    Villano3 = __decorate([
        planVillano
    ], Villano3);
    return Villano3;
}());
var lex = new Villano3('Lex luthor');
lex.imprimirPlan();
console.log("\n Multiples decoradores \n");
// Multiples decoradores
function imprimible(constructor) {
    constructor.prototype.imprimir = function () {
        console.log(this);
    };
}
var Villano4 = /** @class */ (function () {
    function Villano4(nombre) {
        this.nombre = nombre;
    }
    Villano4 = __decorate([
        imprimible,
        planVillano
    ], Villano4);
    return Villano4;
}());
var lex2 = new Villano4('Lex luthor');
lex2.imprimirPlan();
lex2.imprimir();
console.log("\n Decoradores de funciones \n");
// Decoradores de funciones
function editable(esEditable) {
    return function (target, nombrePropiedada, description) {
        description.writable = esEditable;
    };
}
var Villano5 = /** @class */ (function () {
    function Villano5(nombre) {
        this.nombre = nombre;
    }
    Villano5.prototype.plan = function () {
        console.log('El plan es dominar el mundo');
    };
    __decorate([
        editable(true)
    ], Villano5.prototype, "plan", null);
    return Villano5;
}());
var lex3 = new Villano5('Lex luthor');
lex3.plan = function () {
    console.log('El plan es cortar flores');
};
console.log("\n Decoradores de propiedades \n");
// Decoradores de propiedades
function editablePropiedad(esEditable) {
    return function (target, nombrePropiedada) {
        var descriptor = {
            writable: esEditable
        };
        return descriptor;
    };
}
var Villano6 = /** @class */ (function () {
    function Villano6(nombre) {
        this.nombre = nombre;
    }
    Villano6.prototype.plan = function () {
        console.log('El plan es dominar el mundo');
    };
    __decorate([
        editablePropiedad(true)
    ], Villano6.prototype, "nombre", void 0);
    __decorate([
        editable(false)
    ], Villano6.prototype, "plan", null);
    return Villano6;
}());
var lex4 = new Villano6('Lex luthor');
console.log(lex4);
console.log("\n Decoradores de parametros \n");
// Decoradores de parametros
function parametro(target, metod, index) {
    console.log('Target');
    console.log(target, metod, index);
}
var Villano7 = /** @class */ (function () {
    function Villano7(nombre) {
        this.nombre = nombre;
    }
    Villano7.prototype.imprimir = function (plan, mensaje) {
        if (plan) {
            console.log('El plan es: ' + mensaje);
        }
        else {
            console.log(mensaje);
        }
    };
    __decorate([
        __param(1, parametro)
    ], Villano7.prototype, "imprimir", null);
    return Villano7;
}());
var lex5 = new Villano7('Lex luthor');
console.log(lex4);
