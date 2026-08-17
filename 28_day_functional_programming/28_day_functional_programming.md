<div align="center">
  <h1>Day 28: Functional Programming</h1>
</div>

[<< Day 27](../27_day_events_ii/27_day_events_ii.md) | [Day 29 >>](../29_day_project_todo/29_day_project_todo.md)

---

## What You'll Learn

- Pure functions (no side effects)
- Immutability (never mutate)
- Function composition with `pipe`
- Currying

---

## Pure Functions

```js
// ✅ Pure — same input, same output, no side effects
function add(a, b) { return a + b }

// ❌ Impure — depends on external state
let total = 0
function addToTotal(n) { total += n; return total }
```

## Immutability

```js
// ❌ Mutating:
list.push(item)

// ✅ Immutable:
const newList = [...list, item]
```

## Pipe and Compose

```js
const pipe = (...fns) => (input) => fns.reduce((acc, fn) => fn(acc), input)

const transform = pipe(
  (x) => x + 1,
  (x) => x * 2
)
transform(5)  // 12
```

## Currying

```js
const add = a => b => a + b
add(3)(4)  // 7
```

---

## Exercises

### Level 1

1. Convert an impure function to pure.
2. Pipe `addOne` and `double`.
3. Create a curried `greet(greeting)(name)`.

### Level 2

1. Rewrite array operations using only `map`/`filter`/`reduce`.
2. In TypeScript, write `pipe<T>` with proper typing.

### Level 3

1. Implement a `Maybe` monad with `map` and `getOrElse`.

[<< Day 27](../27_day_events_ii/27_day_events_ii.md) | [Day 29 >>](../29_day_project_todo/29_day_project_todo.md)

🌕 **Day 28 Complete!**
