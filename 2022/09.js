const fs = require('fs')
const input = fs.readFileSync('./09-input.txt', 'utf8')

const orthogonalMoves = {
  U: ({x, y}) => ({ x, y: y + 1 }),
  D: ({x, y}) => ({ x, y: y - 1 }),
  R: ({x, y}) => ({ x: x + 1, y }),
  L: ({x, y}) => ({ x: x - 1, y }),
}

const diagonalMoves = {
  UR: ({x, y}) => ({ x: x + 1, y: y + 1 }),
  DR: ({x, y}) => ({ x: x + 1, y: y - 1 }),
  UL: ({x, y}) => ({ x: x - 1, y: y + 1 }),
  DL: ({x, y}) => ({ x: x - 1, y: y - 1 }),
}

const decideTailMove = (dir) => {
  if (h.x === t.x || h.y === t.y) return orthogonalMoves[dir]
  if (h.x > t.x && h.y > t.y) return diagonalMoves['UR']
  if (h.x > t.x && h.y < t.y) return diagonalMoves['DR']
  if (h.x < t.x && h.y < t.y) return diagonalMoves['DL']
  if (h.x < t.x && h.y > t.y) return diagonalMoves['UL']
}

const areTouching = (pt1, pt2) => (pt1.x >= pt2.x - 1 && pt1.x <= pt2.x + 1) && (pt1.y >= pt2.y - 1 && pt1.y <= pt2.y + 1)

let h = { x: 0, y: 0 }, t = { x: 0, y: 0 }, pointsVisited = { '0,0': true }

for (const move of input.split('\n').slice(0, -1)) {
  const [dir, len] = move.split(' ')

  for (const _ of Array(+len)) {
    h = orthogonalMoves[dir](h)
    if (areTouching(h, t)) continue
    t = decideTailMove(dir)(t)
    const ptStr = `${t.x},${t.y}`
    if (!pointsVisited[ptStr]) pointsVisited[ptStr] = true
  }
}

console.log(Object.keys(pointsVisited).length)
