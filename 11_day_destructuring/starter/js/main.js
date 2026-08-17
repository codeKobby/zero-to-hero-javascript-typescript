// Day 11 — JavaScript Starter: Destructuring, Spread & Rest
const currentUser = { id: 1, name: 'Alice', email: 'alice@test.com', role: 'admin' }

// Object destructuring
const { name, role = 'guest' } = currentUser
console.log(name + ' (' + role + ')')

// Rest in destructuring
const { id, ...remainingFields } = currentUser
console.log(remainingFields)

// Array destructuring
const [first, second, ...rest] = [95, 87, 72, 68, 91]
console.log('Top two:', first, second)
console.log('Rest:', rest)

// Swap
let x = 1, y = 2
;[x, y] = [y, x]
console.log('x=' + x + ', y=' + y)
