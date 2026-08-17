// Day 8 — JavaScript Starter: Rest, Spread, Callbacks, Closures
function sumAll(...nums) {
  return nums.reduce((a, b) => a + b, 0)
}
console.log(sumAll(1, 2, 3, 4, 5))

// Spread
const firstHalf = [1, 2, 3]
const secondHalf = [4, 5, 6]
const combined = [...firstHalf, ...secondHalf]
console.log(combined)

// Closure
function createCounter(start) {
  start = start || 0
  let count = start
  return {
    increment: function () { return ++count },
    decrement: function () { return --count },
    getValue: function () { return count }
  }
}

const counter = createCounter(10)
console.log(counter.increment())
console.log(counter.getValue())
