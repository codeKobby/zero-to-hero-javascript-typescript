<div align="center">
  <h1>Day 2: Variables & Constants</h1>
</div>

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 3 >>](../03_day_data_types/03_day_data_types.md)

---

## What You'll Learn

- When to use `const`, `let`, or `var`
- How to name variables properly
- How TypeScript adds type annotations to variables

---

## The Decision Rule

**Use `const` first.** Only use `let` if the value needs to change later. Never use `var`.

```js
// ✅ const — value won't change (use this most of the time)
const name = 'Alice'
const PI = 3.14159

// ✅ let — value will change
let score = 0
score += 10  // This is fine

// ❌ var — avoid (old, confusing behavior)
var oldWay = 'dont use this'
```

### Why avoid `var`?

`var` is **function-scoped**, not **block-scoped**. This causes bugs:

```js
if (true) {
  var x = 10
  let y = 20
}
console.log(x)  // 10 — leaks out!
console.log(y)  // ❌ ReferenceError
```

---

## TypeScript: Adding Types

```ts
const userName: string = 'Alice'   // This will always be text
const age: number = 25             // This will always be a number
const isActive: boolean = true     // This will always be true or false

let score: number = 0
score = 10     // ✅ OK — same type
score = 'hi'   // ❌ Error — can't put text in a number
```

### Type Inference (Let TypeScript Guess)

```ts
const userName = 'Alice'   // TypeScript infers: string
let age = 25              // TypeScript infers: number

// You don't NEED to add types — TypeScript is smart!
// But types help document your code for other developers.
```

---

## Naming Rules

| Good | Bad | Why |
|------|-----|-----|
| `userName` | `n` | Descriptive |
| `isActive` | `flag` | Clear purpose |
| `calculateTotal` | `calc` | Functions are verbs |

---

## Exercises

### Level 1

1. Create variables with `const` for: your name, your age, whether you're a student.
2. Create variables with `let` for: a counter starting at 0, a temperature starting at 22.
3. Try reassigning a `const` variable. What happens?

### Level 2

1. Rewrite the variables above with TypeScript type annotations.
2. What happens if you write `let age: number = 'twenty-five'`?

### Level 3

1. Create a TypeScript file with 5 variables using `const` and 5 using `let`. All should have type annotations.

<details>
<summary>🔍 View Solutions</summary>

**Level 1:**
```js
const myName = 'Alice'
const myAge = 25
const isStudent = true

let counter = 0
let temperature = 22
```

**Level 2:**
```ts
const myName: string = 'Alice'
const myAge: number = 25
const isStudent: boolean = true

let counter: number = 0
let temperature: number = 22
```
</details>

---

[<< Day 1](../01_day_setup/01_day_setup.md) | [Day 3 >>](../03_day_data_types/03_day_data_types.md)

🌕 **Day 2 Complete!** You know when and why to use `const`, `let`, and never `var`.
