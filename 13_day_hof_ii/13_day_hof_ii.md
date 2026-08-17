<div align="center">
  <h1>Day 13: Higher-Order Functions II</h1>
</div>

[<< Day 12](../12_day_hof_i/12_day_hof_i.md) | [Day 14 >>](../14_day_strings/14_day_strings.md)

---

## What You'll Learn

- `every`, `some`, `find`, `findIndex`, `sort`, `includes`, `findLast`

---

## Search Methods

```js
const numbers = [1, 2, 3, 4, 5]

numbers.every(n => n > 0)     // true — ALL pass?
numbers.some(n => n > 4)      // true — ANY pass?
numbers.find(n => n > 3)      // 4 — FIRST match
numbers.findIndex(n => n > 3) // 3 — INDEX of first match
numbers.includes(3)           // true — contains value?
```

## sort

```js
// ⚠️ Default sort converts to strings!
[10, 9, 80, 1].sort()  // [1, 10, 80, 9] — wrong!

// Correct for numbers:
[10, 9, 80, 1].sort((a, b) => a - b)  // [1, 9, 10, 80]

// sort mutates! Use spread to avoid:
const sorted = [...numbers].sort((a, b) => a - b)
```

---

## Exercises

### Level 1

1. Use `every` to check if `[2, 4, 6, 8]` are all even.
2. Use `some` to check if any number in `[1, 3, 5, 7]` is even.
3. Use `find` to get the first number > 3 in `[1, 2, 3, 4, 5]`.
4. Sort `[5, 3, 8, 1, 9]` ascending.

### Level 2

1. Sort objects by a property: `[{name:'B', age:30}, {name:'A', age:25}]` by `age`.
2. In TypeScript, use `find` with proper null checking.

### Level 3

1. Implement a `binarySearch` function for sorted arrays.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 3:
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}
```
</details>

---

[<< Day 12](../12_day_hof_i/12_day_hof_i.md) | [Day 14 >>](../14_day_strings/14_day_strings.md)

🌕 **Day 13 Complete!**
