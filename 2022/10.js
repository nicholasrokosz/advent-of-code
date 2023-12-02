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

// part 1
for (const instruction of input.split('\n').slice(0, -1)) {
    executeInstruction(instruction)
}

console.log(signalStrength(20) + signalStrength(60) + signalStrength(100) + signalStrength(140) + signalStrength(180) + signalStrength(220))

// part 2
let output = ''
let lineNumber = 0

for (const [index, X] of cycles.entries()) {
    if (lineNumber === 6) break
    const sprite = [X - 1, X, X + 1]
    const cycleNumber = index - (40 * lineNumber)

    if (sprite.includes(cycleNumber)) output += '#'
    else output += '.'

    if ((index + 1) % 40 === 0) {
        output += '\n'
        lineNumber++
    }
}

console.log(output)
