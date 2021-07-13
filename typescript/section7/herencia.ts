class AvengerH {
  constructor(public nombre: string, private nombreReal: string) {
    this.nombre = nombre;
    this.nombreReal = nombreReal;
  }

  protected getNombre(): string {
    return this.nombre;
  }
}

class Xmen extends AvengerH {
  constructor(nombre: string, nombreReal: string){
    super(nombre, nombreReal)
  }

  public getNombre(): string {
    return super.getNombre();
  }
}

let antman2: Xmen = new Xmen('Ciclope', 'Scott Lang');

console.log(antman2);
console.log("\n");
console.log(antman2.getNombre());