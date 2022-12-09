const fs = require('fs')
const input = fs.readFileSync('./01-input.txt', 'utf8')

// v1
const sumArr = input.split('\n\n').map(i => i.split('\n').reduce((a, b) => a + +b, 0))
const answer1 = Math.max(...sumArr)
const answer2 = sumArr.sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b)
console.log(answer1, answer2)

// v2
let large = 0, larger = 0, largest = 0
const data2 = input.split('\n\n')

for (const str of data2) {
  let subTotal = 0
  const subArr = str.split('\n')

  for (const numStr of subArr) {
    subTotal += +numStr
  }

  if (subTotal > largest) {
    large = larger
    larger = largest
    largest = subTotal
  } else if (subTotal > larger) {
    large = larger
    larger = subTotal
  } else if (subTotal > large) {
    large = subTotal
  }
}

const answer1Alt = largest
const answer2Alt = large + larger + largest

console.log(answer1Alt, answer2Alt)

// v3
console.log(Math.max(...fs.readFileSync('./01-input.txt', 'utf8').split('\n\n').map(i => i.split('\n').reduce((a, b) => a + +b, 0))), fs.readFileSync('./01-input.txt', 'utf8').split('\n\n').map(i => i.split('\n').reduce((a, b) => a + +b, 0)).sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b))
