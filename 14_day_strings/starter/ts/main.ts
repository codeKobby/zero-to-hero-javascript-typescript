export {}

// Day 14: Strings
const sentence: string = 'Hello, World! Welcome to TypeScript'

// Template literals
const name14: string = 'Alice'
const age14: number = 25
console.log(`${name14} is ${age14} years old`)

// String methods
console.log(sentence.slice(0, 5))       // Hello
console.log(sentence.at(-1))            // !
console.log(sentence.split(' '))        // array of words
console.log(sentence.includes('World')) // true
console.log(sentence.toUpperCase())

// padStart/padEnd
console.log('5'.padStart(3, '0'))       // 005
console.log('Hi'.padEnd(10, '.'))       // Hi........

// Template literal types
type Greeting = `Hello, ${string}`
const g: Greeting = 'Hello, World'  // ✅
// const bad: Greeting = 'Goodbye'  // ❌

console.log(g)
