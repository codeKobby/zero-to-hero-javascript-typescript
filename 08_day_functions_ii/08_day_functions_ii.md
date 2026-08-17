<div align="center">
  <h1>Day 8: Functions II — Rest, Spread, Closures</h1>
</div>

[<< Day 7](../07_day_functions_i/07_day_functions_i.md) | [Day 9 >>](../09_day_objects/09_day_objects.md)

---

## What You'll Learn

- Rest parameters (`...args`)
- Spread syntax (`...array`)
- Closures — functions that remember their environment
- Typed callbacks

---

## Rest Parameters

Collects multiple arguments into an array:

```js
function sum(...args) {
  return args.reduce((total, n) => total + n, 0)
}
sum(1, 2, 3, 4, 5)  // 15
```

## Spread Syntax

Spreads an array into individual elements:

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]  // [1, 2, 3, 4, 5, 6]

Math.max(...[10, 20, 30])  // 30
```

## Closures

A closure is when a function **remembers** the variables from where it was created:

```js
function createCounter(start) {
  let count = start
  return {
    increment: () => ++count,
    getValue: () => count
  }
}

const counter = createCounter(5)
counter.increment()  // 6
counter.increment()  // 7
// count is private — can't access it directly
```

---

## Exercises

### Level 1

1. Write a function `collectArgs(...args)` that returns all arguments as an array.
2. Use spread to combine `[1, 2]` and `[3, 4]`.
3. Use spread to call `Math.max` with `[10, 20, 30]`.

### Level 2

1. Create a closure `createMultiplier(factor)` that returns a function multiplying by `factor`.
2. In TypeScript, type a callback parameter properly.

### Level 3

1. Implement a `debounce(fn, wait)` function using closures.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 3: debounce
function debounce(fn, wait) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}
```
</details>

---

[<< Day 7](../07_day_functions_i/07_day_functions_i.md) | [Day 9 >>](../09_day_objects/09_day_objects.md)

🌕 **Day 8 Complete!**
