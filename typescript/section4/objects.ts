let flash: { nombre: string, edad: number, poderes: string[] } = {
  nombre: 'Barry Allen',
  edad: 24,
  poderes: ['puede correr muy rapido', 'Viajar por el tiempo']
}

let flashWithFunction: { nombre: string, edad: number, poderes: string[], getNombre: () => string } = {
  nombre: 'Barry Allen',
  edad: 24,
  poderes: ['puede correr muy rapido', 'Viajar por el tiempo'],
  getNombre() {
    return this.nombre;
  }
}

flashWithFunction.getNombre();

let superman: { nombre: string, edad: number, poderes: string[], getNombre: () => string } = {
  nombre: 'Clark Kent',
  edad: 400,
  poderes: ['puede volar', 'Super velocidad'],
  getNombre() {
    return this.nombre;
  }
}

// tipos personalizados

type Heroe = {
  nombre: string; edad: number; poderes: string[]; getNombre: () => string
}
let ironMan: Heroe = {
  nombre: 'Tony Start',
  edad: 40,
  poderes: ['puede volar', 'es robot'],
  getNombre() {
    return this.nombre;
  }
}

// Multiples tipos permitidos

let loquesea: string | number = 'Kevin Méndez'
loquesea = 10;

// Revisar el tipo de un objeto o variable

let cosa: any = 123

if (typeof cosa === 'number') {
  console.log('Cosa es un numero');
} else {
  console.log('Este código indica que no es un string');
}