// Day 8 - Trace the function values and calls before running this file.

function applyToNumber(number, operation) {
  return operation(number)
}

function double(number) {
  return number * 2
}

function createCounter() {
  let count = 0

  return function() {
    count = count + 1
    return count
  }
}

console.log('Double 5: ' + applyToNumber(5, double))
console.log('Square 5: ' + applyToNumber(5, number => number * number))

const nextCount = createCounter()
console.log('Counter: ' + nextCount())
console.log('Counter: ' + nextCount())

const anotherCounter = createCounter()
console.log('Another counter: ' + anotherCounter())
