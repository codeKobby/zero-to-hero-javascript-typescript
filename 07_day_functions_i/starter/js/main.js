// Day 7 - Functions: predict the returned value before you run each call.

function calculateTotal(price, quantity) {
  return price * quantity
}

function makeGreeting(name, greeting = 'Hello') {
  return greeting + ', ' + name + '!'
}

const calculateDiscount = (price, percent) => {
  const discount = price * percent / 100
  return price - discount
}

const bookTotal = calculateTotal(12, 3)
console.log('Book total: ' + bookTotal)
console.log(makeGreeting('Ada'))
console.log(makeGreeting('Grace', 'Welcome'))
console.log('Discounted price: ' + calculateDiscount(80, 25))
