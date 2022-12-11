const fs = require('fs')
const input = fs.readFileSync('./10-input.txt', 'utf8')

const cycles = [1]

const executeInstruction = instruction => {
  if (instruction === 'noop') cycles.push(cycles[cycles.length - 1])
  else {
    cycles.push(cycles[cycles.length - 1])
    cycles.push(cycles[cycles.length - 1] + +instruction.split(' ')[1])
  }
}

const signalStrength = cycleNumber => cycles[cycleNumber - 1] * cycleNumber

for (const instruction of input.split('\n').slice(0, -1)) {
  executeInstruction(instruction)
}

console.log(signalStrength(20) + signalStrength(60) + signalStrength(100) + signalStrength(140) + signalStrength(180) + signalStrength(220))
