var Volumen;
(function (Volumen) {
    Volumen[Volumen["min"] = 1] = "min";
    Volumen[Volumen["medio"] = 2] = "medio";
    Volumen[Volumen["max"] = 20] = "max";
})(Volumen || (Volumen = {}));
var audio = Volumen.min;
console.log(audio);
/**
 * Nota:
 * medio tomará el valor de 2, porque ts le suma uno al valor anterior
 * si hubiese un valor llamado max2 seguido de max, y no se le asigna
 * ningun valor max2, éste tomará el valor de 21
 */ 
