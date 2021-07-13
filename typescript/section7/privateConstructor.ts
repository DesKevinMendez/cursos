class Apocalipsis {
  static instance: Apocalipsis;

  private constructor(public nombre:string) {
  }

  static llamarApocalipsis(): Apocalipsis {
    if (!Apocalipsis.instance) {
      Apocalipsis.instance = new Apocalipsis('Soy apocalipsis')
    }

    return Apocalipsis.instance;
  }
}

// let apocalipsis = new Apocalipsis('Apocalipsis');

let real = Apocalipsis.llamarApocalipsis()
console.log(real);