// Day 4 — JavaScript Starter: Operators & Type Coercion
const numA = 5
const numB = 5
console.log(numA === numB)   // true
console.log('hello' === 'hello')  // true

// Nullish coalescing
const inputCount = 0
console.log(inputCount || 10)   // 10
console.log(inputCount ?? 10)   // 0

// Optional chaining
const profile = { name: 'Alice', address: { city: 'NYC' } }
const city = profile?.address?.city ?? 'Unknown'
const zip = profile?.address?.zip ?? 'No zip'
console.log('City:', city, '| ZIP:', zip)
