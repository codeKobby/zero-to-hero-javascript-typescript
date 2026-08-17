<div align="center">
  <h1>Day 11: Destructuring, Spread & Rest</h1>
</div>

[<< Day 10](../10_day_arrays/10_day_arrays.md) | [Day 12 >>](../12_day_hof_i/12_day_hof_i.md)

---

## What You'll Learn

- Pull values out of arrays and objects in one line
- Spread arrays and objects into new ones
- Collect remaining values with rest

---

## Array Destructuring

```js
const [a, b, ...rest] = [1, 2, 3, 4, 5]
// a = 1, b = 2, rest = [3, 4, 5]

let x = 1, y = 2
;[x, y] = [y, x]  // swap!
```

## Object Destructuring

```js
const user = { name: 'Alice', age: 25, role: 'admin' }
const { name, role = 'guest' } = user
// name = 'Alice', role = 'admin'

const { id, ...remaining } = user
// remaining = { name: 'Alice', age: 25, role: 'admin' }
```

---

## Exercises

### Level 1

1. Destructure `['red', 'green', 'blue']` to get `red` and `blue`.
2. Destructure `{ x: 10, y: 20, z: 30 }` to get `x` and `z`.
3. Swap two variables with destructuring.

### Level 2

1. In TypeScript, type a destructured function parameter.
2. Use rest to collect remaining object properties.

### Level 3

1. Write a `deepMerge` function using spread and recursion.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 1:
const [red, , blue] = ['red', 'green', 'blue']
const { x, z } = { x: 10, y: 20, z: 30 }

// Level 3:
function deepMerge(target, source) {
  return { ...target, ...Object.fromEntries(
    Object.entries(source).map(([k, v]) =>
      [k, v && typeof v === 'object' ? deepMerge(target[k] ?? {}, v) : v]
    )
  )}
}
```
</details>

---

[<< Day 10](../10_day_arrays/10_day_arrays.md) | [Day 12 >>](../12_day_hof_i/12_day_hof_i.md)

🌕 **Day 11 Complete!**
