// Day 15 — JavaScript Starter: Numbers & Math
var amount = 1234567.89

// Formatting
console.log(amount.toFixed(2))
console.log(amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))

// Math methods
console.log(Math.round(4.5))
console.log(Math.floor(4.9))
console.log(Math.ceil(4.1))
console.log(Math.max(1, 5, 3))

// Clamp
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
console.log(clamp(-5, 0, 100))
console.log(clamp(150, 0, 100))
console.log(clamp(50, 0, 100))
