// Decoradores de clase

function consola(constructor: Function) {
  console.log(constructor);
}

@consola
class Villano {
  constructor(public nombre: string) {

  }
}

// Decoradores de fabrica

function imprimirConsola(imprimir: boolean): Function {
  if (imprimir) {
    return consola;
  } else {
    return () => null;
  }
}

@imprimirConsola(true)
class Villano2 {
  constructor(public nombre: string) {

  } 
}
