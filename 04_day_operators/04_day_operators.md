<div align="center">
  <h1>Day 4: Operators & Type Coercion</h1>
</div>

[<< Day 3](../03_day_data_types/03_day_data_types.md) | [Day 5 >>](../05_day_control_flow/05_day_control_flow.md)

---

## What You'll Learn

- Why `===` is better than `==`
- How `??` and `||` differ
- How `?.` saves you from crashes

---

## Always Use `===`

`===` checks value AND type. `==` only checks value (and converts types to match — this causes bugs).

```js
// These are what you'd expect:
5 === 5           // true
'hello' === 'hello'  // true

// These are WHY you should avoid ==:
// eslint-disable-next-line eqeqeq
5 == '5'          // true — JS converts the string to a number!
// eslint-disable-next-line eqeqeq
0 == false        // true — JS converts false to 0!
```

> **Rule:** Always use `===` and `!==`. Never use `==` or `!=` unless you have a very specific reason.

## `??` vs `||`

```js
const count = 0
console.log(count || 10)   // 10 — OR thinks 0 is "nothing"
console.log(count ?? 10)   // 0  — ?? knows 0 is a real value

const name = ''
console.log(name || 'Guest')  // 'Guest' — OR thinks '' is empty
console.log(name ?? 'Guest')  // '' — ?? knows '' is a real value
```

## Optional Chaining Recap

```js
const user = { name: 'Alice' }
console.log(user?.address?.city)  // undefined — no crash!
```

---

## Exercises

### Level 1

1. Which should you use: `===` or `==`? Why?
2. Show the difference between `||` and `??` when the value is `0`.
3. Show the difference when the value is `''`.

### Level 2

1. Use optional chaining to safely access `config?.api?.timeout`.
2. In TypeScript, create an `interface User` and safely access nested optional fields.

### Level 3

1. Write a function `safeGet(obj, path)` that uses optional chaining to navigate any depth.

<details>
<summary>🔍 View Solutions</summary>

```ts
// Level 3:
function safeGet(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce(
    (current, key) => (current as Record<string, unknown>)?.[key],
    obj
  )
}
```
</details>

---

[<< Day 3](../03_day_data_types/03_day_data_types.md) | [Day 5 >>](../05_day_control_flow/05_day_control_flow.md)

🌕 **Day 4 Complete!**
