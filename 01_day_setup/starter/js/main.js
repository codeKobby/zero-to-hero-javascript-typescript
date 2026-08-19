// Day 1 — JavaScript Starter: Setup & Tooling
// JavaScript is the language the computer actually runs.

console.log('Hello, World!')

// --- Introduction to data types ---
let firstName = 'Ada' // string
let lastName = 'Lovelace' // string
let country = 'UK' // string
let city = 'London' // string
let age = 36 // number
let isMarried = true // boolean

let notAssigned // undefined, nothing assigned yet
let emptyValue = null // null, deliberately empty

console.log(firstName, lastName, country, city, age, isMarried)

// --- Checking data types ---
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
let userAge = 25 // will change
const gravity = 9.81 // earth gravity, does not change
const boilingPoint = 100 // water boiling point, does not change
const PI = 3.14 // a constant

console.log(userAge, gravity, boilingPoint, PI)
