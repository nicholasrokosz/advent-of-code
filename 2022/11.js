const fs = require('fs')
const input = fs.readFileSync('./11-input.txt', 'utf8')

const buildMonkey = desc => {
  const lines = desc.split('\n').slice(1)
  const monkey = {}

  monkey.items = lines[0].match(/\d+/g).map(str => +str)
  monkey.op = eval(`old => ${lines[1].match(/old.+/g)}`)
  monkey.divisibleBy = lines[2].match(/\d+/g)[0]
  monkey.test = worry => worry % monkey.divisibleBy === 0 ? lines[3].slice(-1) : lines[4].slice(-1)
  monkey.itemsInspected = 0

  return monkey
}

const monkeys = input.split('\n\n').map(desc => buildMonkey(desc))
const divisor = monkeys.map(monkey => monkey.divisibleBy).reduce((a, b) => a * b)

const takeTurn = (monkeyNumber, part) => {
  const { items, op, test } = monkeys[monkeyNumber]

  for (const item of items) {
    let newValue
    if (part === 'part1') newValue = Math.floor(op(item) / 3)
    else newValue = op(item) % divisor
    const nextMonkey = test(newValue)

    monkeys[nextMonkey].items.push(newValue)
    monkeys[monkeyNumber].itemsInspected++
  }

  monkeys[monkeyNumber].items = []
}

const executeRound = part => {
  for (const monkey in monkeys) {
    takeTurn(monkey, part)
  }
}

const main = part => {
  for (const _ of Array(part === 'part1' ? 20 : 10000)) {
    executeRound(part)
  }

  return monkeys.map(monkey => monkey.itemsInspected).sort((a, b) => a - b).slice(-2).reduce((a, b) => a * b)
}

console.log(main('part2'))
