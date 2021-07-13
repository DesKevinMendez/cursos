interface Xmen {
  nombre: string;
  poder: string;
  regenerar(nombreReal: string): string
}
function enviarMision(xman: Xmen) {
  console.log('Enviando a: ' + xman.nombre);
  xman.regenerar(xman.nombre)
}

let wolverine: Xmen = {
  nombre: "wolverine",
  poder: 'Regeneración',
  regenerar: function (nombre: string): string {
    console.log('Se ha regenerado');
    return nombre
  }
}

// enviarMision(wolverine)
class Mutante implements Xmen {
  nombre: string;
  poder: string;

  constructor(nombre: string, poder: string) {
    this.nombre = nombre;
    this.poder = poder;
  }

  regenerar(nombre: string): string {
    console.log('Hola ' + nombre);
    return this.poder;
  }
}

interface DosNumerosFunc {
  (num1: number, num2: number): number
};

let sumar: DosNumerosFunc;

sumar = function (a: number, b: number): number {
  return a + b
}