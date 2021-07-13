namespace Validaciones {
  export function validarFecha(fecha: Date): boolean {
    if (isNaN(fecha.valueOf())) {
      return false;
    }
    return true;
  }
}
