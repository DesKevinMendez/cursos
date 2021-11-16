import './../css/componentes.css'
import carbon from '../assets/img/carbon.png'

export const saludar = (nombre) => {
  const h1 = document.createElement('h1')
  h1.innerText = `Hola ${nombre}`
  document.body.append(h1)

  const img = document.createElement('img')
  img.src = carbon
  document.body.append(img)
}