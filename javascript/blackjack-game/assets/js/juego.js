let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']
let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir')
const divCartasJugador = document.querySelector('#jugador-cartas')
const smalls = document.querySelectorAll('small')

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i+tipo)
    }
  }

  for (const tipo of tipos) {
    for (const esp of especiales) {
      deck.push(esp+tipo)
    }
  }
  return _.shuffle(deck)
}

crearDeck()

const pedirCarta = ()=>{
  if (deck.length === 0) {
    throw 'No hay más cartas en el deck'
  }
  return crearDeck().pop()
}

const valorCarta = (carta)=> {
  const valor = carta.substring(0, carta.length - 1)
  return (isNaN(valor)) ? 
    (valor === 'A') ? 11 : 10
    : parseInt(valor)
}

// Events

btnPedir.addEventListener('click', (e)=>{
  e.preventDefault()
  const carta = pedirCarta()
  puntosJugador = puntosJugador + valorCarta(carta)
  smalls[0].innerText = puntosJugador

  const imgCarta = document.createElement('img')
  imgCarta.classList.add('carta')
  imgCarta.src = `assets/cartas/${carta}.png`

  if (puntosJugador >= 21) {
    console.log('Perdiste man :v');
    btnPedir.disabled = true
  } else {
    console.log('Sigue jugando puto :v');
    divCartasJugador.append(imgCarta)
  }
})
