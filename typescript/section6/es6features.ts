// Variable let
let nombre = "Kevin Méndez"

if (true) {
  let nombre = "Jos Marín"
  if (true) {
    let nombre = "Otro nombre"
  }
}

console.log(nombre); /**print: Kevin Méndez */

// Constantes

const OPCIONES: string = "Activo"

if (true) {
  const OPCIONES: string = "Desactivado" /**Permite porque está en otro scope */
}

for (const I of [1, 2, 3, 4, 5]) {
  console.log(I);
}

// templates literales

let nombre1: string = "Bruce"
let nombre2: string = "lee"

let mensaje: string = `${nombre1} ${nombre2}
ahora esta es otra linea
otrao linea `

console.log(mensaje);

// Funciones flecha (lamda function)

// function sumar(a: number,b: number) {
//   return a+b;
// }

// console.log(sumar(1,1));

let sumar = (a: number, b: number) => a + b

console.log(sumar(1, 1));

let capitan = {
  nombre: 'Hulk',
  darOrder: function () {
    let self = this;
    setTimeout(function () {
      /**La function () cambia el scope de this */
      console.log(self.nombre)
    }, 1000);

    setTimeout(() => console.log(this.nombre), 1000)
  }
}
capitan.darOrder()

// Destructuración de objetos.

let avengers = {
  nick: 'Samuel JAckson',
  ironman: "Robert Downey Jr",
  vision: 'Paul Bettany'
}

let { nick, ironman: ironmanModify, vision, } = avengers;
console.log(`${nick} ${ironmanModify} ${vision}`);

// destructuración de arreglos
console.log('destructuración de arreglos\n');

let avengersArray = ['JAckson', 'Robert', 'paul']
let [avenger1, avenger2, avenger3] = avengersArray

console.log(`${avenger1} ${avenger2} ${avenger3}`);
let [,,onlyThirtyAvenger] = avengersArray // Se deben de separar por ,
console.log(onlyThirtyAvenger);

// Nuevo ciclo for of 

console.log('Nuevo ciclo for of\n');
let thor = {
  nombre: 'thor',
  arma: 'Mjolnir'
}

let ironman = {
  nombre: 'Ironman',
  arma: 'Armorsuit'
}

let capitanAmerica = {
  nombre: 'Capitan america',
  arma: 'Escudo'
}

let avengersAdded = [thor, ironman, capitanAmerica]

for (const avenger of avengersAdded) {
  console.log(avenger.nombre, avenger.arma);
}
console.log('Clases ES6\n');
// Clases ES6
console.log('');

class Avenger {
  nombre:string;
  poder:string;

  constructor(nombre:string, poder:string) {
    this.nombre = nombre;
    this.poder = poder;
  }
}

class AvengerVolador extends Avenger {
  vuela:boolean;
  constructor(nombre:string, poder:string) {
    super(nombre, poder);
    this.vuela = true
  }
}

let Hulk = new Avenger('Holk', 'destruir')
let Falcon = new AvengerVolador('Falcon X', 'Volador')
console.log(Hulk);
console.log(Falcon);