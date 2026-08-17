export {}

// Day 10: Arrays & Generics
const temperatures: number[] = [72, 85, 68, 90, 75]

// Array methods
const above80: number[] = temperatures.filter(t => t > 80)
const doubled: number[] = temperatures.map(t => t * 2)
const total: number = temperatures.reduce((sum, t) => sum + t, 0)

console.log('Above 80:', above80)
console.log('Doubled:', doubled)
console.log('Total:', total)

// at() method
console.log('First:', temperatures.at(0))
console.log('Last:', temperatures.at(-1))

// Generic function
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

console.log('First item:', getFirst(temperatures))
console.log('First string:', getFirst(['hello', 'world']))

// Tuple
type Point2D = [number, number]
const origin: Point2D = [0, 0]
const coordinate: Point2D = [10, 20]
console.log(`Origin: (${origin[0]}, ${origin[1]})`)
console.log(`Point: (${coordinate[0]}, ${coordinate[1]})`)
