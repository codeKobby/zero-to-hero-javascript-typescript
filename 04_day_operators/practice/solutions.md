# Day 4 worked solutions

## Level 1 — Mechanical

1. `17 % 5` → `2`
2. `2 ** 3` → `8`
3. `5 === '5'` → `false`; `5 == '5'` → `true`
4. `0 == false` → `true`; `'' == 0` → `true` (both `==` conversions)
5. `Boolean([])` → `true`; `Boolean({})` → `true`
6. `true && false` → `false`; `true || false` → `true`
7. `let n = 5; n += 3; n -= 2;` → `6`
8. `8 % 2 === 0` → `true`; `7 % 2 === 0` → `false`

## Level 2

1. Cart total:

~~~js
const price = 12
const quantity = 3
const discount = 5
const total = price * quantity - discount
console.log(total) // 31
~~~

2. Even/odd reporter:

~~~js
const numbers = [21, 22, 7, 8]
for (const n of numbers) {
  console.log(n, n % 2 === 0 ? 'even' : 'odd')
}
~~~

3. Feature gate:

~~~js
const isLoggedIn = true
const hasPaidPlan = false

console.log(isLoggedIn && hasPaidPlan) // false — one is false
console.log(isLoggedIn || hasPaidPlan) // true  — one is true
console.log(!isLoggedIn)               // false — reverses true
~~~

4. Strict vs loose lab:

~~~js
console.log(5 === '5') // false — same digits, different types
console.log(5 == '5')  // true  — string converted to number
console.log(0 === false) // false — number vs boolean
console.log(0 == false)  // true  — both convert to 0
~~~

5. Truthiness table:

~~~js
for (const value of [0, 1, '', ' ', null, undefined, NaN, [], {}]) {
  console.log(value, Boolean(value))
}
// 0 false, 1 true, '' false, ' ' true, null false,
// undefined false, NaN false, [] true, {} true
~~~

6. TypeScript narrowing:

~~~ts
let score: number | null = 87

if (score !== null) {
  console.log(score * 2) // 174 — TypeScript knows score is a number here
}
~~~

## Level 3

1. Free-shipping calculator:

~~~js
const price = 49.99
const qualifiesForFreeShipping = price > 50

console.log(qualifiesForFreeShipping ? 'Free shipping' : 'Paid shipping')
~~~

2. Safe access:

~~~js
const user = null
// user.name // TypeError: Cannot read properties of null

const name = user && user.name // short-circuits at null → null, no crash
console.log(name) // null
~~~

3. Short-circuit proof:

~~~js
let ranRightSide = false

false && (ranRightSide = true)  // right side skipped
console.log(ranRightSide) // false — proves it never ran

true || (ranRightSide = true)   // right side skipped
console.log(ranRightSide) // false — still never ran
~~~

4. TypeScript mixed math, two fixes:

~~~ts
const price: number = 12

// const mixedTotal = price + '12'
// Error: Operator '+' cannot be applied to types 'number' and 'string'.

const numericTotal = price + Number('12') // 24 — meant arithmetic
const textualTotal = String(price) + '12' // '1212' — meant joining
~~~

5. The `0` trap:

~~~js
function answerSurvey(answer) {
  // Wrong: truthiness rejects a legitimate 0
  if (answer) {
    return `answered ${answer}`
  }
  // Right: accept 0, reject the two kinds of "no answer"
  if (answer !== null && answer !== undefined) {
    return `answered ${answer}`
  }
  return 'no answer'
}

console.log(answerSurvey(0))          // answered 0
console.log(answerSurvey(null))       // no answer
console.log(answerSurvey(undefined))  // no answer
~~~
