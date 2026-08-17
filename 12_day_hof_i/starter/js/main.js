// Day 12 — JavaScript Starter: Higher-Order Functions I
const prices = [25, 45, 10, 65, 30]

// forEach
prices.forEach(function (price, index) {
  console.log(index + ': $' + price)
})

// map
const withTax = prices.map(function (p) { return p * 1.08 })
console.log('With tax:', withTax)

// filter
const affordable = prices.filter(function (p) { return p < 40 })
console.log('Affordable:', affordable)

// reduce
const totalCost = prices.reduce(function (sum, p) { return sum + p }, 0)
console.log('Total:', totalCost)
