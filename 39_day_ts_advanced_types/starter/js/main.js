// Day 39 — JavaScript Equivalent: Advanced Type Patterns (plain JS)

// Discriminated unions work in plain JS:
function getArea(shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius
    case 'square':
      return shape.size * shape.size
    case 'rectangle':
      return shape.width * shape.height
  }
}

console.log(getArea({ kind: 'circle', radius: 5 }))
console.log(getArea({ kind: 'square', size: 4 }))
console.log(getArea({ kind: 'rectangle', width: 3, height: 6 }))

// Mapped types — just use Object.keys/values/entries:
var original = { a: 1, b: 2, c: 3 }
var doubled = Object.fromEntries(
  Object.entries(original).map(function (entry) { return [entry[0], entry[1] * 2] })
)
console.log(doubled)  // { a: 2, b: 4, c: 6 }
