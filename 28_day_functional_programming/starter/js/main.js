// Day 28 - JavaScript: predictable transformations
function pipe(...functions) {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}

function updateUser(user, changes) {
  return { ...user, ...changes }
}

const normalize = pipe(
  (text) => text.trim(),
  (text) => text.toLowerCase(),
  (text) => text.replaceAll(' ', '-')
)

const user = { name: 'Mina', completedLessons: 27 }
const updated = updateUser(user, { completedLessons: 28 })

console.log('Normalized:', normalize(' JavaScript Basics '))
console.log('Original:', user)
console.log('Updated:', updated)
