class AvengerSetterGetter {
  private _nombre:string | undefined;
  constructor(nombre?: string) {
    this._nombre = nombre;
  }

  get nombre():string|undefined{
    if (this._nombre) {
      return this._nombre
    } else {
      return "No tiene nombre"
    }
  }

  set nombre(value: string|undefined) {
    this._nombre = value;
  }
}

let ciclope: AvengerSetterGetter = new AvengerSetterGetter('Ciclope')
let otroCiclope: AvengerSetterGetter = new AvengerSetterGetter()

console.log(ciclope.nombre);
console.log(otroCiclope.nombre);
otroCiclope.nombre = 'Otro nombre'
console.log(otroCiclope.nombre);