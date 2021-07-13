namespace Validaciones {
  export function validarTexto(params:string): boolean {
    if (params.length > 3) {
      return true;
    }
    return false;
  }
}
