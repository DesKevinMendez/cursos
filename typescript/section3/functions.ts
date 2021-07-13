let heroe: string = 'Flash'

function imprime_heroe(): string {
  return heroe;
}

let activar_batisenal = function (): string {
  return 'Batiseñal activado'
}

console.log(imprime_heroe());
console.log(activar_batisenal());

function nombreCompleto(nombre: string, apellido: string): string {
  return nombre + ' ' + apellido
}

nombreCompleto('kevin', 'mendez')

// funciones con parametros opcionales
function nombreCompleto2(nombre: string, apellido?: string): string {
  if (apellido) {
    return nombre + ' ' + apellido
  } else {
    return nombre;
  }
}

nombreCompleto2('kevin')

// funciones con parametros opcionales
function nombreCompleto3(nombre: string, apellido: string, capitalizado: boolean = false): string {
  if (capitalizado) {
    return capitalizar(nombre + ' ' + apellido)
  }
  return nombre + ' ' + apellido
}

function capitalizar(palabra: string): string {
  return palabra.charAt(0).toUpperCase() + palabra.substr(1).toLowerCase()
}

nombreCompleto3('kevin', 'stark')

// Funciones con parametros REST

function nombreCompletoREST(nombre: string, ...args: string[]): string {
  return nombre + ' ' + args.join(' ');
}

nombreCompletoREST('kevin', 'Ezequiel', 'Mendez', 'Orellana')


//  Funciones tipo function

function suma(a: number, b: number): number {
  return a + b
}
let miFuncion: (a: number, b: number)=>number;

miFuncion = 10;
miFuncion = suma;

