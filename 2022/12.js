const fs = require('fs')
const input = fs.readFileSync('./12-input.txt', 'utf8')

const grid = input.split('\n').map(row => row.split('')).slice(0, -1)

let coordsOfE = grid => {
  for (const [i, row] of grid.entries()) {
    for (const [j, item] of row.entries()) {
      if (item === 'E') return [j, i]
    }
  }
}
// console.log(grid)

const getVal = ([x, y]) => grid[y] && grid[y][x]

const dirs = {
  up: (x, y) => [x, y - 1],
  down: (x, y) => [x, y + 1],
  right: (x, y) => [x + 1, y],
  left: (x, y) => [x - 1, y]
}

const determinePrevSquare = (x, y) => {
  const up = dirs['up'](x, y)
  const down = dirs['down'](x, y)
  const right = dirs['right'](x, y)
  const left = dirs['left'](x, y)
  const currentVal = getVal([x, y])
  const options = [up, down, right, left]
  // const targetChar = String.fromCharCode(currentVal.charCodeAt(0) - 1)
  let targetChar
  if (currentVal === 'E') targetChar = 'z'
  else if (currentVal === 'a') targetChar = 'S'
  else targetChar = String.fromCharCode(currentVal.charCodeAt(0) - 1)

  // console.log(options)
  for (const coords of options) {
    if (getVal(coords) === targetChar) return coords
  }

  for (const coords of options) {
    if (getVal(coords) === currentVal) return coords
  }

  return []
}

const pathFinder = ([x, y], memo={}) => {
  if (getVal([x, y]) === 'S') return 0

  const [newX, newY] = determinePrevSquare(x, y)
  const coordStr = `${x},${y}`
  
  if (!memo[coordStr]) memo[coordStr] = 1 + pathFinder([newX, newY])
  return memo[coordStr]
}

// console.log(determinePrevSquare(4, 1))
console.log(pathFinder(coordsOfE(grid)))
// console.log(coordsOfE(grid))
