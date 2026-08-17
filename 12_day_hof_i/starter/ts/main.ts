export {}

// Day 12: Higher-Order Functions I — map, filter, reduce, forEach
const prices: number[] = [25, 45, 10, 65, 30]

// forEach
prices.forEach((price, index) => console.log(`${index}: $${price}`))

// map
const withTax: number[] = prices.map(p => p * 1.08)
console.log('With tax:', withTax)

// filter
const affordable: number[] = prices.filter(p => p < 40)
console.log('Affordable:', affordable)

// reduce
const totalCost: number = prices.reduce((sum, p) => sum + p, 0)
console.log('Total:', totalCost)

// Chaining
const result: string[] = prices
  .filter(p => p > 20)
  .map(p => `$${p.toFixed(2)}`)
console.log('Filtered & formatted:', result)
