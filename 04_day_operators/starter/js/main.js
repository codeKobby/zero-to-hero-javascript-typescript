// Day 4 - Predict each result before running.

const price = 12
const quantity = 3
const total = price * quantity
console.log('Total:', total)

console.log('Is 21 odd?', 21 % 2 !== 0)
console.log('Strict comparison:', 5 === '5')
console.log('Loose comparison:', 5 == '5')

const isLoggedIn = true
const hasPaidPlan = false
console.log('Can use paid feature:', isLoggedIn && hasPaidPlan)
console.log('Can see account screen:', isLoggedIn || hasPaidPlan)
console.log('Is not logged in:', !isLoggedIn)
