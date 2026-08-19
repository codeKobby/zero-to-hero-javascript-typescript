# Day 7 worked solutions

Read these only after attempting the exercise and tracing the call.

## Level 1

1. `16`
2. `undefined` — there is no `return`, so nothing is sent back.
3. `'Ada Lovelace'`
4. `6`
5. The function itself (the recipe), not a value — parentheses run it.
6. `14`
7. `undefined` — braces require an explicit `return`; the expression alone is dropped.
8. `greet()` → `'Hi, friend'`; `greet('Ada')` → `'Hi, Ada'`.
9. `w` receives 3, `h` receives 4 — parameters are positional.

## Level 2

```js
// 1. Square
function square(number) {
  return number * number
}
console.log(square(4)) // 16

// 2. Full name
function fullName(firstName, lastName) {
  return firstName + ' ' + lastName
}
console.log(fullName('Ada', 'Lovelace'))
console.log(fullName('Grace', 'Hopper'))

// 3. Describe pet with a default
function describePet(name, type = 'animal') {
  return name + ' is a ' + type
}
console.log(describePet('Rex'))                 // Rex is a animal
console.log(describePet('Rex', 'dog'))          // Rex is a dog

// 4. Discount
function calculateDiscount(price, percent) {
  return price - (price * percent / 100)
}
console.log(calculateDiscount(80, 25)) // 60

// 5. Last character
function lastChar(text) {
  return text[text.length - 1]
}
console.log(lastChar('Ada')) // a

// 6. Arrow version of the discount
const calculateDiscountArrow = (price, percent) =>
  price - (price * percent / 100)
console.log(calculateDiscountArrow(80, 25)) // 60
```

## Level 3

```js
// 1. Receipt returning an object
function calculateReceipt(subtotal) {
  return {
    subtotal: subtotal,
    tax: subtotal * 0.15,
    total: subtotal * 1.15
  }
}
console.log(calculateReceipt(100))
// { subtotal: 100, tax: 15, total: 115 }

// 2. Temperature converter + classifier
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32
}
function describeTemperature(celsius) {
  if (celsius < 0) return 'cold'
  if (celsius < 25) return 'warm'
  return 'hot'
}
console.log(toCelsius(68))         // 20
console.log(toFahrenheit(20))      // 68
console.log(describeTemperature(-5)) // cold

// 3. Default does not apply to '' — an empty string is supplied.
function createMessage(name, greeting = 'Hello') {
  return greeting + ', ' + name + '!'
}
console.log(createMessage('Ada', '')) // ", Ada!" (empty greeting used)

// 4. Local scope
function makeSecret() {
  const secret = 'hidden'
  return secret
}
console.log(makeSecret()) // hidden
// console.log(secret)    // Error: secret only exists inside makeSecret

// 5. The undefined hunt
function withoutReturn(value) {
  const doubled = value * 2
  // no return — caller gets undefined
}
function withReturn(value) {
  return value * 2
}
console.log(withoutReturn(5)) // undefined (clue: prints undefined)
console.log(withReturn(5))    // 10
```

## TypeScript

```ts
function square(number: number): number {
  return number * number
}

function fullName(firstName: string, lastName: string): string {
  return firstName + ' ' + lastName
}

// calculateTotal('12', 3)
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```