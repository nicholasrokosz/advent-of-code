const fs = require('fs')
const input = fs.readFileSync('./04-input.txt', 'utf8')

const data = input.split('\n').map(line => line.split(/[-,]/).map(str => +str))
let total = 0
let total2 = 0

for (const rangePair of data) {
  const [min1, max1, min2, max2] = rangePair

  if (max1 >= min2 && max2 >= min1)  {
    total2++
    if ((min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1)) {
      total++
    }
  }
}

console.log(total)
console.log(total2)
