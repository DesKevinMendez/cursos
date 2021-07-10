function functionGenerica<T>(arg: T): T {
  return arg;
}

console.log(functionGenerica(15.6456435).toFixed(2));
console.log(functionGenerica("una cadena").charAt(0));
console.log(functionGenerica(new Date()).getTime());

type Heroe = {
  nombre: string
  nombreReal: string
}

type Villano = {
  nombre: string;
  poder: string;
}

let deadpool = {
  nombre: "Deadpool",
  nombreReal: 'Wade Winston',
  poder: "Regeneración"
}

console.log(functionGenerica<Heroe>(deadpool));

console.log("===========\nArreglos genericos \n===========\n");

let heroes: Array<string> = ['flash', 'Batman', 'Superman'] // Generico
let villanos: string[] = ['Lex luthor', 'Flash Reverso'] // Explicito
console.log("\n===========\nClasses genericas \n===========\n");


class Cuadrado<T extends number|string> {
  base: T;
  altura: T;
  constructor(base: T, altura: T){
    this.base = base;
    this.altura = altura;
  }
  area(): number {
    return +this.base * +this.altura
  }
}

let cuadrado = new Cuadrado<number|string>(1,1);

cuadrado.base = "10"
cuadrado.altura = 10

console.log(cuadrado.area());



