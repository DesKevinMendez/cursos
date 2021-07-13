const mensajes: string[] = [
  "El texto es muy corto",
  "El texto es muy largo"
]

export function obtenerError(numErro: number): string {
  if (numErro > mensajes.length) {
    return "El código de error no existe"
  }
  return mensajes[numErro]
}