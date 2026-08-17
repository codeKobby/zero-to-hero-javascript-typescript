export {}

// Day 15: Numbers & Math
const amount: number = 1234567.89

// Formatting
console.log(amount.toFixed(2))
console.log(amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))

// Math methods
console.log(Math.round(4.5))   // 5
console.log(Math.floor(4.9))   // 4
console.log(Math.ceil(4.1))    // 5
console.log(Math.max(1, 5, 3)) // 5

// Clamp function
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

console.log(clamp(-5, 0, 100))   // 0
console.log(clamp(150, 0, 100))  // 100
console.log(clamp(50, 0, 100))   // 50

// Random dice
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6
const dice: DiceRoll = (Math.floor(Math.random() * 6) + 1) as DiceRoll
console.log(`Rolled: ${dice}`)

// Linear interpolation
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

console.log(`Lerp 0-100 at 50%: ${lerp(0, 100, 0.5)}`)
