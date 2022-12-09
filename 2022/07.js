const fs = require('fs')
const crypto = require('crypto')
const input = fs.readFileSync('./07-input.txt', 'utf8')

const linesArr = input.split('\n')
const currentDirs = []
const dirSizes = {}

const cd = cmd => {
  const dir = cmd.slice(5)

  if (dir === '..') {
    currentDirs.pop()
  } else if (!(dir in dirSizes)) {
    dirSizes[dir] = 0
    currentDirs.push(dir)
  } else {
    const hashedDir = `${dir}-${crypto.randomUUID()}`
    dirSizes[hashedDir] = 0
    currentDirs.push(hashedDir)
  }
}

for (const [index, line] of linesArr.entries()) {
  if (line.startsWith('$ cd')) cd(line)
  else if (/^\d/.test(line)) currentDirs.forEach(dir => dirSizes[dir] += +line.match(/\d+/)) 
}

const answer1 = Object.values(dirSizes).filter(n => n <= 100_000).reduce((a, b) => a + b)
const answer2 = Math.min(...Object.values(dirSizes).filter(n => n >= dirSizes['/'] - 40_000_000))
console.log(`Answer 1: ${answer1} Answer 2: ${answer2}`)
