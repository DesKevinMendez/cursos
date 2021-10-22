let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

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

const perdirCarta = ()=>{
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
console.log(valorCarta(perdirCarta()))