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

const decideKnotMove = (knot, knotAhead) => {
  if (knotAhead.x === knot.x && knotAhead.y > knot.y) return orthogonalMoves['U']
  if (knotAhead.x === knot.x && knotAhead.y < knot.y) return orthogonalMoves['D']
  if (knotAhead.x > knot.x && knotAhead.y === knot.y) return orthogonalMoves['R']
  if (knotAhead.x < knot.x && knotAhead.y === knot.y) return orthogonalMoves['L']
  if (knotAhead.x > knot.x && knotAhead.y > knot.y) return diagonalMoves['UR']
  if (knotAhead.x > knot.x && knotAhead.y < knot.y) return diagonalMoves['DR']
  if (knotAhead.x < knot.x && knotAhead.y < knot.y) return diagonalMoves['DL']
  if (knotAhead.x < knot.x && knotAhead.y > knot.y) return diagonalMoves['UL']
}

const areTouching = (pt1, pt2) => (pt1.x >= pt2.x - 1 && pt1.x <= pt2.x + 1) && (pt1.y >= pt2.y - 1 && pt1.y <= pt2.y + 1)

const moveKnot = (knot, knotAhead, dir) => {
  if (!knotAhead) return orthogonalMoves[dir](knot)
  if (areTouching(knot, knotAhead)) return knot
  return decideKnotMove(knot, knotAhead)(knot)
}

const main = (input, numberOfKnots) => {
  const positions = [...Array(numberOfKnots)].map(_ => ({ x: 0, y: 0 }))
  const pointsVisited = { '0,0': true }

  for (const move of input.split('\n').slice(0, -1)) {
    const [dir, len] = move.split(' ')

    for (const _ of Array(+len)) {
      for (const [i, knot] of positions.entries()) {
        positions[i] = moveKnot(knot, positions[i - 1], dir)

        if (i === numberOfKnots - 1) {
          const ptStr = `${positions[i].x},${positions[i].y}`
          if (!pointsVisited[ptStr]) pointsVisited[ptStr] = true
        }
      }
    }
  }
  return Object.keys(pointsVisited).length
}

console.log(`Answer 1: ${main(input, 2)}, Answer 2: ${main(input, 10)}`)
