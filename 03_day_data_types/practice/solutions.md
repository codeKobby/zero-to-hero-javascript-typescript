# Day 3 worked solutions

## Level 1 — Mechanical

1. `typeof 'Ada'` → `'string'`
2. `typeof 42` → `'number'`
3. `typeof true` → `'boolean'`
4. `typeof undefined` → `'undefined'`
5. `typeof null` → `'object'` (the historical bug)
6. `typeof []` → `'object'`, `typeof {}` → `'object'`
7. `'1' + 1` → `'11'`; `1 + '1'` → `'11'`
8. `Number('5') + 5` → `10`
9. `Array.isArray([])` → `true`; `Array.isArray({})` → `false`

## Level 2

1-2. Seven primitives, each with a type check:

~~~js
const text = 'hello'   // string
const score = 42       // number
const answer = true    // boolean
let notAssigned        // undefined
const empty = null     // null
const huge = 10n       // bigint
const id = Symbol('id') // symbol

console.log(typeof text, typeof score, typeof answer)
console.log(typeof notAssigned)
console.log(typeof empty)   // 'object' — the trap
console.log(typeof huge, typeof id)
~~~

3. Shared reference:

~~~js
const colors = ['red']
const copiedColors = colors
copiedColors.push('blue')

console.log(colors) // ['red', 'blue'] — same array, two names
~~~

4. undefined vs null:

~~~js
let notAssigned
const intentionallyEmpty = null

console.log(notAssigned)           // undefined
console.log(intentionallyEmpty)    // null
console.log(undefined === null)    // false
~~~

5. NaN:

~~~js
console.log(NaN === NaN)       // false
console.log(Number.isNaN(NaN)) // true
~~~

6. TypeScript union:

~~~ts
let selectedUserName: string | null = null

selectedUserName = 'Ada'
if (selectedUserName !== null) {
  console.log(selectedUserName.toUpperCase()) // ADA
}
~~~

## Level 3

1. Type report card:

~~~js
function describe(value) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

console.log(describe('Ada'))      // string
console.log(describe(42))         // number
console.log(describe(null))       // null
console.log(describe([]))         // array
console.log(describe({}))         // object
~~~

2. Form-arithmetic bug:

~~~js
const formInput = '5'          // arrives as text

console.log(formInput + 5)     // '55' — wrong: string join
console.log(Number(formInput) + 5) // 10 — right: explicit conversion
~~~

3. Login box story:

~~~js
let typedSoFar          // undefined: user has not typed yet
let submittedEmpty = null // null: user submitted nothing

console.log(typedSoFar)        // undefined
console.log(submittedEmpty)    // null
~~~

4. TypeScript branch check:

~~~ts
let score: number | null = 87

if (score !== null) {
  console.log(score.toFixed(2)) // 87.00 — only safe here
}
~~~

5. Decision tree:

~~~js
// string    -> typeof value === 'string'
// number    -> typeof value === 'number'
// boolean   -> typeof value === 'boolean'
// undefined -> typeof value === 'undefined'
// null      -> value === null            (typeof lies here)
// array     -> Array.isArray(value)
// object    -> typeof value === 'object' && value !== null && !Array.isArray(value)
~~~
