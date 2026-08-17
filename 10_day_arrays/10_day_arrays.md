<div align="center">
  <h1>Day 10: Arrays & Generics</h1>
</div>

[<< Day 9](../09_day_objects/09_day_objects.md) | [Day 11 >>](../11_day_destructuring/11_day_destructuring.md)

---

## What You'll Learn

- Array methods: `push`, `pop`, `map`, `filter`, `reduce`
- Non-mutating vs mutating methods
- TypeScript array types and tuples
- Generic functions

---

## Array Methods

```js
const numbers = [1, 2, 3, 4, 5]

// Non-mutating (returns new array):
const doubled = numbers.map(n => n * 2)
const evens = numbers.filter(n => n % 2 === 0)
const sum = numbers.reduce((acc, n) => acc + n, 0)

// Mutating (changes original):
numbers.push(6)
numbers.pop()
numbers.sort((a, b) => b - a)

// Modern access:
numbers.at(-1)   // last element
```

## TypeScript Array Types

```ts
const prices: number[] = [10, 20, 30]
const names: Array<string> = ['Alice', 'Bob']  // same thing

// Tuple — fixed-length typed array:
type Point = [number, number]
const coord: Point = [10, 20]
```

## Generic Functions

```ts
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

getFirst([1, 2, 3])      // returns number | undefined
getFirst(['a', 'b'])     // returns string | undefined
```

---

## Exercises

### Level 1

1. Use `map` to convert `[1, 2, 3]` to `['1', '2', '3']`.
2. Use `filter` to keep words longer than 4 characters from `['hello', 'hi', 'world']`.
3. Use `reduce` to sum `[10, 20, 30]`.
4. Use `at(-1)` to get the last element.

### Level 2

1. In TypeScript, create a typed `Product[]` and use `filter` + `map`.
2. Define a `Point` tuple type and create a function `distance(a: Point, b: Point): number`.

### Level 3

1. Write a generic `groupBy<T, K>` function that groups array items by a key.

<details>
<summary>🔍 View Solutions</summary>

```ts
function groupBy<T>(arr: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {} as Record<string, T[]>)
}
```
</details>

---

[<< Day 9](../09_day_objects/09_day_objects.md) | [Day 11 >>](../11_day_destructuring/11_day_destructuring.md)

🌕 **Day 10 Complete!** Certificate: JavaScript Foundations unlocked!
