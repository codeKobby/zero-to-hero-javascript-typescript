export {}

// Day 8: Rest, Spread, Callbacks, Closures

// Rest parameters
function sumAll(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0)
}
console.log(sumAll(1, 2, 3, 4, 5))

// Spread syntax
const firstHalf: number[] = [1, 2, 3]
const secondHalf: number[] = [4, 5, 6]
const combined: number[] = [...firstHalf, ...secondHalf]
console.log(combined)

// Typed callbacks
function processItems<T>(items: T[], callback: (item: T, index: number) => void): void {
  items.forEach((item, index) => callback(item, index))
}

processItems(['a', 'b', 'c'], (letter, i) => console.log(`${i}: ${letter}`))

// Closure
function createCounter(start: number = 0) {
  let count = start
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  }
}

const counter = createCounter(10)
console.log(counter.increment())  // 11
console.log(counter.getValue())   // 11
