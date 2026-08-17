<div align="center">
  <h1>Day 7: Functions I — Declarations, Arrows, `this`</h1>
</div>

[<< Day 6](../06_day_loops/06_day_loops.md) | [Day 8 >>](../08_day_functions_ii/08_day_functions_ii.md)

---

## What You'll Learn

- Three ways to write functions
- How `this` works differently in each
- Default parameters
- TypeScript function types

---

## Three Ways to Write Functions

```js
// 1. Function declaration (hoisted — can use before defined)
function greet(name) {
  return 'Hello, ' + name + '!'
}

// 2. Function expression (NOT hoisted)
const greetExpr = function(name) {
  return 'Hello, ' + name + '!'
}

// 3. Arrow function (concise, but `this` works differently)
const greetArrow = name => 'Hello, ' + name + '!'
```

## The `this` Rule

```js
const person = {
  name: 'Alice',
  regular: function() { return this.name },  // ✅ this = person
  arrow: () => this.name                      // ❌ this ≠ person
}
```

> **Rule of thumb:** Use arrow functions for callbacks. Use regular functions for object methods.

## Default Parameters

```js
function greet(name, greeting = 'Hello') {
  return greeting + ', ' + name + '!'
}
greet('Alice')           // 'Hello, Alice!'
greet('Alice', 'Hey')    // 'Hey, Alice!'
```

## TypeScript: Adding Function Types

```ts
function greet(name: string): string {
  return `Hello, ${name}!`
}

// Arrow with types:
const multiply = (a: number, b: number): number => a * b

// Optional parameter:
function greetUser(name: string, age?: number): string {
  return age ? `Hello ${name}, age ${age}` : `Hello ${name}`
}
```

---

## Exercises

### Level 1

1. Convert this to an arrow function: `const sum = function(a, b) { return a + b }`
2. Add default parameters: `function createUser(name, role, active)` — defaults: `'user'`, `true`.
3. What is `this` inside an arrow function inside an object method?

### Level 2

1. Write a TypeScript function with typed parameters and return type.
2. Create a function that accepts a callback.

### Level 3

1. Implement a `memoize` function that caches results.

<details>
<summary>🔍 View Solutions</summary>

```js
// Level 3: memoize
function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}
```
</details>

---

[<< Day 6](../06_day_loops/06_day_loops.md) | [Day 8 >>](../08_day_functions_ii/08_day_functions_ii.md)

🌕 **Day 7 Complete!**
