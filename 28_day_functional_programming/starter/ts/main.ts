export {}

// Day 28 - TypeScript: predictable transformations
function pipe<T>(...functions: Array<(value: T) => T>): (input: T) => T {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}

function updateUser<T extends object>(user: T, changes: Partial<T>): T {
  return { ...user, ...changes }
}

const normalize = pipe(
  (text: string) => text.trim(),
  (text: string) => text.toLowerCase(),
  (text: string) => text.replaceAll(' ', '-')
)

const user = { name: 'Mina', completedLessons: 27 }
const updated = updateUser(user, { completedLessons: 28 })

console.log('Normalized:', normalize(' JavaScript Basics '))
console.log('Original:', user)
console.log('Updated:', updated)

// Try this, read the error, then restore the comment:
// const broken = pipe(
//   (value: string) => value.trim(),
//   (value: string) => value.length
// )
