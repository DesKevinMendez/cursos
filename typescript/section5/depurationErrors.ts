/** este es un comentario 
 * multilinea
 * heroe es el personaje principal
 * Esta varibale conteien....
*/
let heroe: string = "Kevin Méndez"
let edad: number = 40;

let mensaje = imprimir(heroe, edad);

console.log(mensaje);

function imprimir(heroe: string, edad: number): string {
  heroe = heroe.toLowerCase();
  edad = edad + 10;

  return heroe + ' ' + edad;
}