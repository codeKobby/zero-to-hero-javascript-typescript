export {}

type NumberOperation = (number: number) => number

function applyToNumber(number: number, operation: NumberOperation): number {
  return operation(number)
}

function double(number: number): number {
  return number * 2
}

function createCounter(): () => number {
  let count: number = 0

  return function(): number {
    count = count + 1
    return count
  }
}

console.log('Double 5: ' + applyToNumber(5, double))
console.log('Square 5: ' + applyToNumber(5, number => number * number))

const nextCount: () => number = createCounter()
console.log('Counter: ' + nextCount())
console.log('Counter: ' + nextCount())

const anotherCounter: () => number = createCounter()
console.log('Another counter: ' + anotherCounter())

// Try this, read the error, then restore the comment:
// applyToNumber(5, 'double')
