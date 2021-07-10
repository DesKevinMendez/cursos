class Xmen2 {
  static nombre:string  = "wolverine";
  constructor() {
  }

  static crearXmen() {
    return new Xmen2()
  }
}

// let wolverine: Xmen2 = new Xmen2()
console.log(Xmen2.nombre);

let wolverine = Xmen2.crearXmen()