<div align="center">
  <h1>Day 12: Higher-Order Functions I</h1>
</div>

[<< Day 11](../11_day_destructuring/11_day_destructuring.md) | [Day 13 >>](../13_day_hof_ii/13_day_hof_ii.md)

---

## What You'll Learn

- `map`, `filter`, `reduce` — the big three
- `forEach` for side effects
- Chaining array methods

---

## The Big Three

```js
const numbers = [1, 2, 3, 4, 5]

// map — transform every item
const doubled = numbers.map(n => n * 2)          // [2, 4, 6, 8, 10]

// filter — keep items that pass a test
const evens = numbers.filter(n => n % 2 === 0)    // [2, 4]

// reduce — combine into one value
const sum = numbers.reduce((acc, n) => acc + n, 0) // 15
```

## Chaining

```js
const result = numbers
  .filter(n => n > 2)
  .map(n => n * 10)
  .reduce((acc, n) => acc + n, 0)
// (3+4+5) * 10 = 120
```

---

## Exercises

### Level 1

1. From `[10, 20, 30, 40, 50]`, use `filter` to get numbers > 25, then `map` to divide by 10.
2. Use `reduce` to find the maximum number in an array.
3. Use `forEach` to print each item with its index.

### Level 2

1. Given `[{name: 'Alice', age: 25}, {name: 'Bob', age: 17}]`, use `filter` to get adults, then `map` to get names.
2. In TypeScript, type the callbacks for `map` and `filter`.

### Level 3

1. Implement your own `filter` function.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 3:
function myFilter(arr, fn) {
  const result = []
  for (const item of arr) {
    if (fn(item)) result.push(item)
  }
  return result
}
```
</details>

---

[<< Day 11](../11_day_destructuring/11_day_destructuring.md) | [Day 13 >>](../13_day_hof_ii/13_day_hof_ii.md)

🌕 **Day 12 Complete!**
