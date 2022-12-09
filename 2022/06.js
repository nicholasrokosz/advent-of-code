const fs = require('fs')
const inputStream = fs.createReadStream('./06-input.txt')

const findStartOfPacket = (buffer, n) => {
  const strChunk = buffer.toString()
  const rollingN = strChunk.slice(0, n).split('')
  let count = n

  for (const char of strChunk.slice(n)) {
    if ([...new Set(rollingN)].length === n) return count

    count++
    rollingN.shift()
    rollingN.push(char)
  }
}

inputStream.on('data', chunk => {
  console.log(`Answer 1: ${findStartOfPacket(chunk, 4)} Answer 2: ${findStartOfPacket(chunk, 14)}`)
})
