export {}

const price: number = 12
const quantity: number = 3
const total: number = price * quantity
console.log('Total:', total)

console.log('Is 21 odd?', 21 % 2 !== 0)
const untrustedInput: unknown = '5'
console.log('Strict comparison:', 5 === untrustedInput)

const isLoggedIn: boolean = true
const hasPaidPlan: boolean = false
console.log('Can use paid feature:', isLoggedIn && hasPaidPlan)
console.log('Can see account screen:', isLoggedIn || hasPaidPlan)
console.log('Is not logged in:', !isLoggedIn)

// Try this, read the error, then restore the comment:
// const mixedTotal = price + '12'
