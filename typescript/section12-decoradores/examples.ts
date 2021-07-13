function planVillano(constructor: Function) {
  constructor.prototype.imprimirPlan = function () {
    console.log('El plan de ' + this.nombre + ' es dominar el mundo');
  }
}

@planVillano
class Villano3 {
  constructor(public nombre: string) {

  }
}

let lex: any = new Villano3('Lex luthor')
lex.imprimirPlan()

console.log("\n Multiples decoradores \n");
// Multiples decoradores
function imprimible(constructor: Function) {
  constructor.prototype.imprimir = function () {
    console.log(this);
  }
}

@imprimible
@planVillano
class Villano4 {
  constructor(public nombre: string) {

  }
}

let lex2: any = new Villano4('Lex luthor')
lex2.imprimirPlan()
lex2.imprimir()

console.log("\n Decoradores de funciones \n");
// Decoradores de funciones

function editable(esEditable: boolean) {
  return function (target: any, nombrePropiedada: string, description: PropertyDescriptor) {
    description.writable = esEditable;
  }
}

class Villano5 {
  constructor(public nombre: string) {

  }

  @editable(true)
  plan() {
    console.log('El plan es dominar el mundo');
  }
}
let lex3: any = new Villano5('Lex luthor')
lex3.plan = function () {
  console.log('El plan es cortar flores');
}


console.log("\n Decoradores de propiedades \n");
// Decoradores de propiedades

function editablePropiedad(esEditable: boolean) {
  return function (target: any, nombrePropiedada: string): any {
    let descriptor: PropertyDescriptor = {
      writable: esEditable
    }

    return descriptor;
  }
}

class Villano6 {

  @editablePropiedad(true)
  public nombre: string
  constructor(nombre: string) {
    this.nombre = nombre;
  }

  @editable(false)
  plan() {
    console.log('El plan es dominar el mundo');
  }
}
let lex4: any = new Villano6('Lex luthor')
console.log(lex4);

console.log("\n Decoradores de parametros \n");
// Decoradores de parametros

function parametro(target: any,metod: string, index: number){
  console.log('Target');
  console.log(target, metod, index);
}

class Villano7 {
  constructor(public nombre: string) {
  }

  imprimir(plan: boolean, @parametro mensaje: string){
    if (plan) {
      console.log('El plan es: ' + mensaje);
    } else {
      console.log(mensaje);
    }
  }
}
let lex5: any = new Villano7('Lex luthor')
console.log(lex4);

