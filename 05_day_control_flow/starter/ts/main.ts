export {}

// Day 5: Control Flow
const examScore: number = 85

// if/else
if (examScore >= 90) {
  console.log('Grade: A')
} else if (examScore >= 80) {
  console.log('Grade: B')
} else if (examScore >= 70) {
  console.log('Grade: C')
} else {
  console.log('Grade: F')
}

// Ternary
const passStatus: string = examScore >= 60 ? 'Pass' : 'Fail'
console.log(passStatus)

// Discriminated union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.size ** 2
  }
}

console.log(area({ kind: 'circle', radius: 5 }))
console.log(area({ kind: 'square', size: 4 }))
