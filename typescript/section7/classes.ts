class Avenger {
  public nombre: string;
  protected equipo: string;
  private nombreReal: string;
  private puedePelear: boolean = false;
  private peleasGanadas: number = 0;

  constructor(nombre: string, equipo: string, nombreReal: string) {
    this.nombre = nombre;
    this.equipo = equipo;
    this.nombreReal = nombreReal;
  }

  public bio(): void {
    let mensaje: string = `${this.nombre} ${this.nombreReal} ${this.equipo}`
    console.log(mensaje);
  }

  private cambiarEquipo(nuevoEquipo: string): boolean {
    if (nuevoEquipo === this.equipo) {
      return false;
    } 
    return true
  }

  public cambiarEquipoPublico (nuevoEquipo: string): boolean {
    return this.cambiarEquipo(nuevoEquipo)
  }
}

let antman: Avenger = new Avenger('Antman', 'Capitan', 'Scott Lang');

antman.bio();
console.log(antman.cambiarEquipoPublico('ironman'))

console.log(antman);