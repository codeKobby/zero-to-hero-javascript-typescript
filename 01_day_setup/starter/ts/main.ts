export {} // Makes this file a module — prevents global scope conflicts

// Day 1 — TypeScript Starter: Setup & Tooling
// TypeScript adds early warnings about types BEFORE the code runs.
// The .ts file is compiled to plain JavaScript, then Node runs that.

console.log('Hello, World!')

// --- Introduction to data types (now with explicit annotations) ---
let firstName: string = 'Ada'
let lastName: string = 'Lovelace'
let country: string = 'UK'
let city: string = 'London'
let age: number = 36
let isMarried: boolean = true

console.log(firstName, lastName, country, city, age, isMarried)

// --- Inference: TypeScript figures out the type on its own ---
let notAssigned // inferred as any (TS 4.4+) until assigned
let emptyValue = null
let userAge = 25 // inferred as number

// --- Checking data types at runtime (this is still JavaScript) ---
console.log(typeof 'Ada') // string
console.log(typeof 5) // number
console.log(typeof true) // boolean
console.log(typeof null) // object  <-- the famous quirk
console.log(typeof undefined) // undefined

// --- Arithmetics ---
console.log(2 + 3) // Addition:          5
console.log(3 - 2) // Subtraction:       1
console.log(2 * 3) // Multiplication:    6
console.log(3 / 2) // Division:          1.5
console.log(3 % 2) // Modulus: remainder 1
console.log(3 ** 2) // Exponentiation:   9

// --- Variables: let changes, const does not ---
const gravity: number = 9.81 // earth gravity, does not change
const boilingPoint: number = 100 // water boiling point, does not change
const PI: number = 3.14 // a constant

console.log(userAge, gravity, boilingPoint, PI)
