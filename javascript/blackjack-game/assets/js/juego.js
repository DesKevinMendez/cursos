let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']
let puntosJugador = 0;
let puntosComputadora = 0;

const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
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

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta()
    puntosComputadora = puntosComputadora + valorCarta(carta)
    smalls[1].innerText = puntosComputadora
  
    const imgCarta = document.createElement('img')
    imgCarta.classList.add('carta')
    imgCarta.src = `assets/cartas/${carta}.png`
    divCartasComputadora.append(imgCarta)

    if(puntosMinimos > 21) {
      break
    }

  } while ((puntosComputadora < puntosMinimos) && puntosminimos <= 21);
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
  divCartasJugador.append(imgCarta)

  if (puntosJugador > 21) {
    console.log('Perdiste man :v');
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
  } else if (puntosJugador === 21){
    console.log('Ganaste puto');
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador)
  }
})

btnDetener.addEventListener('click', ()=>{
  btnPedir.disabled = true
  btnDetener.disabled = true
  turnoComputadora(puntosJugador)
})
