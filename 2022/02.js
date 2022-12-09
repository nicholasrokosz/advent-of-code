const fs = require('fs')
const input = fs.readFileSync('./02-input.txt', 'utf8')

const data = input.split('\n').map(str => str.split(' ')).slice(0, -1)
const winMap = {
  A: 'Y',
  B: 'Z',
  C: 'X'
}
const drawMap = {
  A: 'X',
  B: 'Y',
  C: 'Z'
}
const loseMap = {
  A: 'Z',
  B: 'X',
  C: 'Y'
}
const valMap = {
  X: 1,
  Y: 2,
  Z: 3
}

let total = 0

for (const round of data) {
  const [theirMove, yourMove] = round
  total += valMap[yourMove]
  
  switch (yourMove) {
    case winMap[theirMove]:
      total += 6
      break;
    case drawMap[theirMove]:
      total += 3
      break;
  }
}
console.log('answer 1: ' + total)

// part 2
let total2 = 0
const win = move =>  6 + valMap[winMap[move]]
const draw = move =>  3 + valMap[drawMap[move]]
const lose = move =>  valMap[loseMap[move]]

for (const round of data) {
  const [theirMove, yourMove] = round
  switch (yourMove) {
    case 'Z':
      total2 += win(theirMove)
      break;
    case 'Y':
      total2 += draw(theirMove)
      break;
    case 'X':
      total2 += lose(theirMove)
      break;
  }
}

console.log('answer 2: ' + total2)
