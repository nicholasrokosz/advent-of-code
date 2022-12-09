const fs = require('fs')
const input = fs.readFileSync('./08-input.txt', 'utf8')

const grid = input.split('\n').slice(0, -1).map(row => row.split(''))
const rotatedGrid = grid.map((row, rowIndex) => row.map((column, columnIndex) => grid[columnIndex][rowIndex]))

// part 1
const checkVisibility = (height, rowIndex, columnIndex) => {
  const right = Math.max(...grid[rowIndex].slice(columnIndex + 1))
  const left = Math.max(...grid[rowIndex].slice(0, columnIndex))
  const down = Math.max(...rotatedGrid[columnIndex].slice(rowIndex + 1))
  const up = Math.max(...rotatedGrid[columnIndex].slice(0, rowIndex))

  return height > right || height > left || height > down || height > up
}

let numberOfVisibleTrees = grid.length * 4 - 4

for (const [rowIndex, row] of grid.slice(1,-1).entries()) {
  for (const [columnIndex, treeHeight] of row.slice(1,-1).entries()) {
    if (checkVisibility(treeHeight, rowIndex + 1, columnIndex + 1)) numberOfVisibleTrees++
  }
}

console.log('Answer 1: ' + numberOfVisibleTrees)

//part 2
const calculateVisScore = (treeHeight, rowIndex, columnIndex) => {
  const checkDirection = arr => {
    const i = arr.findIndex(n => n >= treeHeight)

    return i === - 1 ? arr.length : i + 1
  }

  const right = checkDirection(grid[rowIndex].slice(columnIndex + 1))
  const left = checkDirection(grid[rowIndex].slice(0, columnIndex).reverse())
  const down = checkDirection(rotatedGrid[columnIndex].slice(rowIndex + 1))
  const up = checkDirection(rotatedGrid[columnIndex].slice(0, rowIndex).reverse())

  return right * left * down * up
}

let highestVisScore = 0

for (const [rowIndex, row] of grid.slice(1,-1).entries()) {
  for (const [columnIndex, treeHeight] of row.slice(1,-1).entries()) {
    const visScore = calculateVisScore(treeHeight, rowIndex + 1, columnIndex + 1) 

    if (visScore > highestVisScore) highestVisScore = visScore
  }
}

console.log('Answer 2: ' + highestVisScore)

// console.log(Math.max(...grid.slice(1, -1).map((row, rowIndex) => row.slice(1, -1).map((treeHeight, columnIndex) => calculateVisScore(treeHeight, rowIndex + 1, columnIndex + 1)))))
// const blah = grid.slice(1, -1).map((row, rowIndex) => row.slice(1, -1).map((treeHeight, columnIndex) => calculateVisScore(treeHeight, rowIndex + 1, columnIndex + 1)))
// console.log(blah)
