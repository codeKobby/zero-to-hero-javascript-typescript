// Day 10 — JavaScript Starter: Arrays & Generics
const temperatures = [72, 85, 68, 90, 75]

// Array methods
const above80 = temperatures.filter(t => t > 80)
const doubled = temperatures.map(t => t * 2)
const total = temperatures.reduce((sum, t) => sum + t, 0)

console.log('Above 80:', above80)
console.log('Doubled:', doubled)
console.log('Total:', total)

// at() method
console.log('First:', temperatures.at(0))
console.log('Last:', temperatures.at(-1))
