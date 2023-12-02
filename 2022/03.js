const fs = require('fs')
const input = fs.readFileSync('./03-input.txt', 'utf8')

const charVal = char => char.charCodeAt(0) - (char === char.toUpperCase() ? 38 : 96)

// part 1
let total = 0

for (const rucksack of input.split('\n')) {
  const compartment1 = rucksack.slice(0, rucksack.length / 2)
  const compartment2 = rucksack.slice(rucksack.length / 2)

  for (const char of compartment1) {
    if (compartment2.includes(char)) {
      total += charVal(char)
      break
    }
  }
}

console.log('Answer 1: ' + total)

// part 2
const groupsArr = []
let group = []
let total2 = 0

for (const rucksack of input.split('\n')) {

  if (group.length === 3) {
    groupsArr.push(group)
    group = []
  }

  group.push(rucksack)
}

for (const group of groupsArr) {
  for (const char of group[0]) {
    if (group[1].includes(char) && group[2].includes(char)) {
      total2 += charVal(char)
      break
    }
  }
}

console.log(total2)
