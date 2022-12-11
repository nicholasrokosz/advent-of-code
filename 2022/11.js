const fs = require('fs')
const input = fs.readFileSync('./11-input.txt', 'utf8')

const buildMonkey = desc => {
  const lines = desc.split('\n').slice(1)
  const monkey = {}

  monkey.items = lines[0].match(/\d+/g).map(str => +str)
  monkey.op = eval(`old => ${lines[1].match(/old.+/g)}`)
  monkey.test = worry => worry % lines[2].match(/\d+/g)[0] === 0 ? lines[3].slice(-1) : lines[4].slice(-1)
  monkey.itemsInspected = 0

  return monkey
}

const monkeys = input.split('\n\n').map(desc => buildMonkey(desc))
// console.log(monkeys[0].test(2))

const takeTurn = monkeyNumber => {
  const { items, op, test } = monkeys[monkeyNumber]

  for (const item of items) {
    const newValue = Math.floor(op(item) / 3)
    const nextMonkey = test(newValue)

    monkeys[nextMonkey].items.push(newValue)
    monkeys[monkeyNumber].itemsInspected++
  }

  monkeys[monkeyNumber].items = []
}

const executeRound = () => {
  for (const monkey in monkeys) {
    takeTurn(monkey)
  }
}

const part1 = numberOfRounds => {
  for (const _ of Array(numberOfRounds)) {
    executeRound()
  }

  return monkeys.map(monkey => monkey.itemsInspected).sort((a, b) => a - b).slice(-2).reduce((a, b) => a * b)
}

console.log(`Answer 1: ${part1(20)}`)
