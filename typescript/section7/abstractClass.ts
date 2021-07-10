abstract class Mutantes {
  constructor(public nombre: string, public nombreReal: string) {
  }
}

class Xmen3 extends Mutantes {

}
let sombra = new Xmen3('Sombre', 'Natalia');
console.log(sombra);