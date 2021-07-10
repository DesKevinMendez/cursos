enum Volumen {
  min = 1, medio, max = 20
}

let audio: number = Volumen.min;

console.log(audio);

/**
 * Nota:
 * medio tomará el valor de 2, porque ts le suma uno al valor anterior
 * si hubiese un valor llamado max2 seguido de max, y no se le asigna 
 * ningun valor max2, éste tomará el valor de 21 
 */