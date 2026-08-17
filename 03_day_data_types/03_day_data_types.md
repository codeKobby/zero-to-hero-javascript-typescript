<div align="center">
  <h1>Day 3: Data Types</h1>
</div>

[<< Day 2](../02_day_variables/02_day_variables.md) | [Day 4 >>](../04_day_operators/04_day_operators.md)

---

## What You'll Learn

- The two kinds of data: primitives and objects
- How to check the type of a value
- Null vs undefined
- Optional chaining (`?.`) and nullish coalescing (`??`)

---

## Primitive Types

These are the basic building blocks of data:

| Type | Example | What it is |
|------|---------|-----------|
| `string` | `'hello'` | Text |
| `number` | `42`, `3.14` | Any number |
| `boolean` | `true`, `false` | Yes/no |
| `undefined` | `let x;` | No value set |
| `null` | `null` | Empty on purpose |
| `bigint` | `100n` | Very large numbers |
| `symbol` | Symbol('id') | Unique identifier |

## Objects (Reference Types)

```js
const person = { name: 'Alice', age: 25 }   // Object
const numbers = [1, 2, 3]                    // Array (is an object)
const sayHi = function() { }                // Function (is an object)
```

## Checking Types with `typeof`

```js
console.log(typeof 'hello')     // 'string'
console.log(typeof 42)          // 'number'
console.log(typeof true)        // 'boolean'
console.log(typeof undefined)   // 'undefined'
console.log(typeof null)        // 'object' — this is a famous JavaScript bug!
console.log(typeof [1, 2])      // 'object' — arrays are objects
```

## TypeScript Types

```ts
const name: string = 'Alice'
const age: number = 25
const isActive: boolean = true
const nothing: null = null
const notDefined: undefined = undefined
const numbers: number[] = [1, 2, 3]         // Array of numbers
const names: string[] = ['Alice', 'Bob']
```

## Optional Chaining (`?.`)

Safe way to access nested properties — stops and returns `undefined` instead of crashing:

```js
const user = { name: 'Alice', address: { city: 'NYC' } }
console.log(user?.address?.city)    // 'NYC'
console.log(user?.address?.zip)     // undefined (safe — no crash!)
```

## Nullish Coalescing (`??`)

Provides a default value only when something is `null` or `undefined`:

```js
const count = 0
console.log(count || 10)   // 10 — OR treats 0 as falsy
console.log(count ?? 10)   // 0  — ?? only replaces null/undefined
```

---

## ▶ Run This Lesson

**TypeScript:**
```bash
npm run day3
```

**JavaScript:**
```bash
npm run day3:js
```

**Or click ▶ in VS Code** on `03_day_data_types/starter/ts/main.ts`

---

## Exercises

### Level 1

1. What is `typeof null`? Why is that surprising?
2. Use `typeof` on: `'hello'`, `42`, `true`, `undefined`, `[1, 2]`, `{ a: 1 }`.
3. Use optional chaining to safely access `user?.address?.city`.

### Level 2

1. Show the difference between `||` and `??` when the value is `0`, `''`, or `false`.
2. Create a TypeScript function that accepts `string | number` and handles both cases.

### Level 3

1. Write a TypeScript type guard function `isString(val: unknown): val is string`.

<details>
<summary>🔍 View Solutions</summary>

**Level 1:** `typeof null` returns `'object'` — this is a long-standing bug in JavaScript.

**Level 2:**
```js
const val = 0
console.log(val || 'default')  // 'default' — 0 is falsy
console.log(val ?? 'default')  // 0 — ?? keeps it
```

**Level 3:**
```ts
function isString(val: unknown): val is string {
  return typeof val === 'string'
}
```
</details>

---

[<< Day 2](../02_day_variables/02_day_variables.md) | [Day 4 >>](../04_day_operators/04_day_operators.md)

🌕 **Day 3 Complete!**
