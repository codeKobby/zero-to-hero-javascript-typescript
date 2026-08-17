<div align="center">
  <h1>Day 6: Loops & Iteration</h1>
</div>

[<< Day 5](../05_day_control_flow/05_day_control_flow.md) | [Day 7 >>](../07_day_functions_i/07_day_functions_i.md)

---

## What You'll Learn

- `for`, `while`, `for...of`, `for...in` loops
- `break` and `continue`
- The essential array methods: `map`, `filter`, `reduce`, `forEach`

---

## Loop Types

### for loop
```js
for (let i = 0; i < 5; i++) {
  console.log(i)  // 0, 1, 2, 3, 4
}
```

### for...of — best for arrays
```js
const fruits = ['apple', 'banana', 'cherry']
for (const fruit of fruits) {
  console.log(fruit)
}
```

### for...in — for object properties
```js
const person = { name: 'Alice', age: 25 }
for (const key in person) {
  console.log(key + ': ' + person[key])
}
```

### while
```js
let i = 0
while (i < 5) {
  console.log(i)
  i++
}
```

### break and continue
```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break     // stop the loop
  if (i % 2 === 0) continue  // skip this iteration
  console.log(i)
}
```

---

## Essential Array Methods

These are the most important functions you'll use daily:

```js
const numbers = [1, 2, 3, 4, 5]

// forEach — do something for each item
numbers.forEach(n => console.log(n))

// map — transform every item into something new
const doubled = numbers.map(n => n * 2)          // [2, 4, 6, 8, 10]

// filter — keep only items that pass a test
const evens = numbers.filter(n => n % 2 === 0)    // [2, 4]

// reduce — combine all items into one value
const sum = numbers.reduce((acc, n) => acc + n, 0) // 15
```

---

## Exercises

### Level 1

1. Use `for...of` to print each name: `['Alice', 'Bob', 'Charlie']`.
2. Use `map` to double `[1, 2, 3, 4, 5]`.
3. Use `filter` to keep only numbers greater than 3.
4. Use `reduce` to sum `[10, 20, 30, 40, 50]`.

### Level 2

1. Chain `filter` and `map`: from `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`, get the squares of even numbers.
2. In TypeScript, define an array of objects `{ name: string, age: number }` and use `filter` to find adults.

### Level 3

1. Implement your own `map` function that works like the built-in one.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 3:
function myMap(arr, fn) {
  const result = []
  for (const item of arr) {
    result.push(fn(item))
  }
  return result
}
```
</details>

---

[<< Day 5](../05_day_control_flow/05_day_control_flow.md) | [Day 7 >>](../07_day_functions_i/07_day_functions_i.md)

🌕 **Day 6 Complete!**
