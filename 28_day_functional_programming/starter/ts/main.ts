export {}

// Day 28: Functional Programming

// Pure functions
function add(a: number, b: number): number {
  return a + b
}

function multiply(a: number, b: number): number {
  return a * b
}

// Pipe — left to right composition
function pipe<T>(...fns: Array<(val: T) => T>): (input: T) => T {
  return (input: T) => fns.reduce((acc, fn) => fn(acc), input)
}

const transform = pipe(
  (x: number) => x + 1,
  (x: number) => x * 2,
  (x: number) => x - 3
)

console.log('Pipe result:', transform(5))  // ((5+1)*2)-3 = 9

// Currying
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b)
}

const addCurried = curry(add)
console.log('Curried add:', addCurried(3)(4))  // 7

// Immutability helper
function updateUser<T extends Record<string, unknown>>(
  user: T,
  updates: Partial<T>
): T {
  return { ...user, ...updates }
}

const user = { name: 'Alice', age: 25, role: 'admin' }
const updated = updateUser(user, { age: 26 })
console.log('Original:', user)
console.log('Updated:', updated)
