let check = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      check.push(i+tipo)
    }
  }

  for (const tipo of tipos) {
    for (const esp of especiales) {
      check.push(esp+tipo)
    }
  }
  check = _.shuffle(check)
  console.log(check);
}

crearDeck()