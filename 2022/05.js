const fs = require('fs')
const input = fs.readFileSync('./05-input.txt', 'utf8')

const buildStacks = str => {
  const cratesArr = str.split('\n').slice(0, -1).map(str => str.replaceAll('    ', ' [] ').trim().split(/[\s]+/))
  const numberOfStacks = cratesArr[0].length
  const stacks = [...Array(numberOfStacks)].map(i => [])

  for (let i = cratesArr.length - 1; i >= 0; i--) {
    for (const [index, crate] of cratesArr[i].entries()) {
      if (crate === '[]') continue
      stacks[index].push(crate)
    }
  }

  return stacks
}

const executeMoves = (stacks, moves, modelNumber='9000') => {
  const stacksCopy = stacks.map(subArr => [...subArr])

  for (const move of moves) {
    const [n, from, to] = move
    const origin = stacksCopy[from - 1]
    const destination = stacksCopy[to - 1]

    if (modelNumber === '9000') {
      for (let i = 0; i < n; i++) {
        destination.push(origin.pop())
      }
    } else {
      destination && destination.push(...origin.splice(-n))
    }
  }
  
  return stacksCopy
}

const buildAnswerString = stacks => stacks.reduce((a, b) => a + (b.slice(-1)[0]?.replaceAll(/[\[\]]/g, '') ?? ''), '')

const [stacksStr, movesStr] = input.split('\n\n')
const stacks = buildStacks(stacksStr)
const moves = movesStr.split('\n').map(str => str.split(' ').filter(i => !isNaN(+i)).map(str => +str))

const movedStacks9000 = executeMoves(stacks, moves)
const movedStacks9001 = executeMoves(stacks, moves, '9001')

console.log('Answer 1: ' + buildAnswerString(movedStacks9000))
console.log('Answer 2: ' + buildAnswerString(movedStacks9001))
