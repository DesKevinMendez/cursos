// // puntosJugador = 0;
const miModulo = (() => {
  'use strict';

  let deck = []
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K']
  let puntosJugadores = []

  const btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo')

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small')

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck()

    puntosJugadores = []
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0)
    }
    btnPedir.disabled = false
    btnDetener.disabled = false

    puntosHTML.forEach((elem)=>elem.innerText = 0)
    divCartasJugadores.forEach((elem)=>elem.innerText = '')
  }

  const crearDeck = () => {
    deck = []
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

  // Turno 0 es primer jugador, y último compmutadora
  const acumularPuntos = (carta, turno) => {
    console.log('🚀 ~ acumularPuntos ~ puntosJugadoßres', puntosJugadores)
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
    console.log('🚀 ~ acumularPuntos ~ puntosJugadores', puntosJugadores)
    puntosHTML[turno].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.classList.add('carta')
    imgCarta.src = `assets/cartas/${carta}.png`
    divCartasJugadores[turno].append(imgCarta)

  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora ] = puntosJugadores
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana')
      } else if (puntosMinimos > 21) {
        alert('Computadora gana')
      } else if ( puntosComputadora > 21) {
        alert('Jugador gana')
      } else {
        alert('Computadora gana')
      }
    }, 500)
  }

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0
    do {
      const carta = pedirCarta()

      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1)

    } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);
    determinarGanador()
  }

  // Events

  btnPedir.addEventListener('click', (e)=>{
    e.preventDefault()
    const carta = pedirCarta()

    const puntosJugador = acumularPuntos(carta, 0)
    crearCarta(carta, 0)
      
    if (puntosJugador > 21) {
      console.log('Perdiste man :v');
      btnPedir.disabled = true
      btnDetener.disabled = true
      console.log('🚀 ~ btnPedir.addEventListener ~ puntosJugador', puntosJugador)
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
    turnoComputadora(puntosJugadores[0])
  })

  btnNuevo.addEventListener('click', ()=>{
    inicializarJuego()
  })

  return { inicializarJuego }

})()
