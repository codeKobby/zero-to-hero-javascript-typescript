export {}

// Day 7 - This is the same program as main.js, with TypeScript contracts.

function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

function makeGreeting(name: string, greeting: string = 'Hello'): string {
  return greeting + ', ' + name + '!'
}

const calculateDiscount = (price: number, percent: number): number => {
  const discount: number = price * percent / 100
  return price - discount
}

const bookTotal: number = calculateTotal(12, 3)
console.log('Book total: ' + bookTotal)
console.log(makeGreeting('Ada'))
console.log(makeGreeting('Grace', 'Welcome'))
console.log('Discounted price: ' + calculateDiscount(80, 25))

// Try this, read the error, then restore the comment:
// calculateTotal('12', 3)
