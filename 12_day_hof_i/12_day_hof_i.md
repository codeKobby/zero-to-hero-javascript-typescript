# Day 12: Higher-Order Functions I — map, filter, reduce, and forEach

[Day 11 <<](../11_day_destructuring/11_day_destructuring.md) | [Day 13 >>](../13_day_hof_ii/13_day_hof_ii.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The foundation: a callback is an input function](#the-foundation-a-callback-is-an-input-function)
  - [One array, four different goals](#one-array-four-different-goals)
  - [map: transform every item into a new array](#map-transform-every-item-into-a-new-array)
  - [filter: keep the items that pass a test](#filter-keep-the-items-that-pass-a-test)
  - [reduce: combine items into one result](#reduce-combine-items-into-one-result)
  - [forEach: do an action, do not build a result](#foreach-do-an-action-do-not-build-a-result)
  - [Chaining: pass one result to the next method](#chaining-pass-one-result-to-the-next-method)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Let TypeScript infer the callback](#let-typescript-infer-the-callback)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Writing your own loop to transform, filter, or total an array works — but it buries what you mean. `for (let i = 0; i < scores.length; i++)` says nothing about whether you are converting, keeping, or summing. Real codebases use array methods (`map`, `filter`, `reduce`, `forEach`) that say the goal in the name, and interviews expect you to reach for them naturally.

This lesson teaches the four core array methods and, more importantly, the **selector question**: how to pick the method whose result matches your goal. Day 8 gave you function values and callbacks; today those become the engine of whole data pipelines.

## Prerequisites

- Day 7: functions, `return`, arrow functions.
- Day 8: function values, callbacks.
- Day 10: arrays, `push`, `length`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- transform every item with `map`;
- keep only matching items with `filter`;
- combine all items into one result with `reduce` (always with an explicit initial value);
- perform an action per item with `forEach` without expecting an array back;
- chain `filter` then `map` and read the pipeline step by step;
- write the checked TypeScript version of each operation;
- run this course's Day 12 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what makes a function higher-order;
- what values each callback receives and what it must return;
- why `map` always returns an array the same length as its source;
- why `reduce` needs an initial value;
- why `forEach` returns `undefined` and why that is intentional;
- what TypeScript checks about a callback and what it cannot check.

## The problem this solves

You have an array of scores and three separate needs:

```js
const scores = [42, 78, 91, 49, 65]
```

- You need every score doubled: `[84, 156, 182, 98, 130]`.
- You need only the passing scores: `[78, 91, 65]`.
- You need the total.

With loops you write the mechanics three times — an index, a check, an accumulator — and a reader must mentally replay each loop to learn what it does. The *intent* ("keep passing") is buried inside the machinery ("if score >= 50, push").

Array methods flip this. You name the goal (`filter`), and the callback expresses the one decision per item. Code stops saying *how* to walk the array and starts saying *what* each item becomes. That is the difference between writing loops and writing data pipelines.

## JS runtime deep dive

### The foundation: a callback is an input function

From Day 8:

```js
function applyToNumber(number, operation) {
  return operation(number)
}

applyToNumber(5, number => number * 2) // 10
```

`applyToNumber` is a **higher-order function** because it receives another function as an argument.

Array methods such as `map`, `filter`, `reduce`, and `forEach` are also higher-order functions. Each one:

1. visits an array item;
2. calls your callback with that item;
3. uses the callback's return value in its own specific way.

The four methods differ **only** in step 3.

### One array, four different goals

Ask this question before selecting a method:

| If you want to... | Use | Callback must return |
|---|---|---|
| perform an action for each item | `forEach` | nothing important |
| make one new value for every item | `map` | the transformed item |
| keep only matching items | `filter` | `true` to keep, `false` to remove |
| combine all items into one result | `reduce` | the next accumulator value |

None of `map`, `filter`, or `reduce` changes the original array. `forEach` also does not change it by itself, although its callback can cause side effects.

### map: transform every item into a new array

Prices are in dollars; the display needs cents:

```js
const prices = [3, 5, 8]

const cents = prices.map(function(price) {
  return price * 100
})

console.log(cents)  // [300, 500, 800]
console.log(prices) // [3, 5, 8]
```

Here is exactly what `map` does:

| Call | price passed to callback | callback returns | value added to cents |
|---|---:|---:|---:|
| 1 | 3 | 300 | 300 |
| 2 | 5 | 500 | 500 |
| 3 | 8 | 800 | 800 |

`map` always produces **one output item per input item, in the same order**. That is why `cents` has three values.

Once the long form makes sense, the arrow form is the same code:

```js
const cents = prices.map(price => price * 100)
```

Read it as: *for each price, return price times 100.*

The callback can also receive its index as the second argument:

```js
const names = ['Ada', 'Grace', 'Linus']

const labels = names.map((name, index) => {
  return (index + 1) + '. ' + name
})

console.log(labels) // ['1. Ada', '2. Grace', '3. Linus']
```

Use the index only when it adds meaning. The item is usually enough.

### filter: keep the items that pass a test

`filter` calls the callback for every item. The callback must return a boolean — true keeps the item, false drops it:

```js
const scores = [42, 78, 91, 49, 65]

const passingScores = scores.filter(function(score) {
  return score >= 50
})

console.log(passingScores) // [78, 91, 65]
```

Trace it:

| Call | score | score >= 50 | Keep it? | result so far |
|---|---:|---|---|---|
| 1 | 42 | false | no | [] |
| 2 | 78 | true | yes | [78] |
| 3 | 91 | true | yes | [78, 91] |
| 4 | 49 | false | no | [78, 91] |
| 5 | 65 | true | yes | [78, 91, 65] |

The short form:

```js
const passingScores = scores.filter(score => score >= 50)
```

The callback should return a **comparison** — a clearly true-or-false expression — not rely on truthiness. Returning the item itself by accident is a common bug.

### reduce: combine items into one result

`reduce` is the most flexible method, so it deserves the slowest explanation. To add numbers, start with a total of `0`. For every number, calculate and return the next total:

```js
const numbers = [4, 7, 2]

const total = numbers.reduce(function(runningTotal, number) {
  return runningTotal + number
}, 0)

console.log(total) // 13
```

Two important callback parameters:

- `runningTotal` is the **accumulator**: the result built so far.
- `number` is the current array item.

The `0` after the callback is the **initial value** — the accumulator *before* the first callback call.

Trace it:

| Call | runningTotal before | number | callback returns | runningTotal next |
|---|---:|---:|---:|---:|
| start | 0 | — | — | 0 |
| 1 | 0 | 4 | 4 | 4 |
| 2 | 4 | 7 | 11 | 11 |
| 3 | 11 | 2 | 13 | 13 |

The final accumulator, 13, becomes the return value of `reduce`.

**Always provide an initial value.** You can omit it, but then `reduce` uses the first array item as the accumulator and starts at the second item — harder to trace and it throws for an empty array. Pick an initial value that matches the result you are building:

| Goal | Initial value |
|---|---|
| total | `0` |
| product | `1` |
| text sentence | `''` |
| list you are building | `[]` |
| object you are building | `{}` |

### forEach: do an action, do not build a result

`forEach` calls the callback once per item, like a `for...of` loop, and returns `undefined`:

```js
const names = ['Ada', 'Grace', 'Linus']

names.forEach(function(name) {
  console.log('Hello, ' + name)
})
```

The `undefined` return is intentional: its purpose is an **action** such as logging, updating a page, or sending a request — not creating a new array.

```js
const result = names.forEach(name => name.toUpperCase())
console.log(result) // undefined
```

If you need the uppercase names as an array, use `map`:

```js
const uppercaseNames = names.map(name => name.toUpperCase())
```

### Chaining: pass one result to the next method

`map` and `filter` return arrays, so you can chain them:

```js
const scores = [42, 78, 91, 49, 65]

const doubledPassingScores = scores
  .filter(score => score >= 50)
  .map(score => score * 2)

console.log(doubledPassingScores) // [156, 182, 130]
```

Read this as two separate steps first:

```js
const passingScores = scores.filter(score => score >= 50)
const doubledPassingScores = passingScores.map(score => score * 2)
```

Chaining is only clearer when each step stays easy to name. If it becomes hard to explain, use separate variables.

### Common mistakes table

| Mistake | Why it fails | Use instead |
|---|---|---|
| Using `forEach` and expecting an array | `forEach` returns `undefined` | `map` |
| Forgetting `return` inside braces in `map`/`reduce` | The callback returns `undefined` | Add `return` |
| Returning a number from `filter` by accident | Truthiness makes intent unclear | Return a boolean comparison |
| Omitting `reduce`'s initial value | Empty arrays throw; traces get harder | Supply an initial value |
| Mutating the original array in a `map` callback | The output becomes surprising | Return a new transformed value |

## The TypeScript layer

### Let TypeScript infer the callback

JavaScript:

```js
const scores = [42, 78, 91]
const labels = scores.map(score => 'Score: ' + score)
```

TypeScript checks the callback contract — what it receives and what it returns:

```ts
const scores: number[] = [42, 78, 91]
const labels: string[] = scores.map((score: number): string => {
  return 'Score: ' + score
})
```

Usually TypeScript infers the callback and result types, so the shorter form is just as safe:

```ts
const labels = scores.map(score => 'Score: ' + score)
// score is inferred as number
// labels is inferred as string[]
```

TypeScript knows `score` is a number from the array, and the returned string makes `labels` a `string[]`.

### What TypeScript cannot decide

Types check *shapes*, not *goals*. If you need to remove failing scores but accidentally use `map`, the code is perfectly valid to TypeScript — it just does not do what you wanted. Method choice is a runtime decision only you can make:

| Need | Runtime behavior | TypeScript help |
|---|---|---|
| Convert each number to text | `map` creates a new array | Checks callback input and output types |
| Keep scores 50 and above | `filter` creates a shorter or equal array | Checks `score` is used as a number |
| Add every score | `reduce` returns one number | Checks accumulator and item types |
| Print every name | `forEach` returns `undefined` | Checks callback argument type |

TypeScript also cannot tell you whether you *meant* to double passing scores or score all doubles — both are typed the same. The type checker validates your code; the tests validate your intent.

### One compiler error, walked through

Open `12_day_hof_i/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
scores.map(score => score.toUpperCase())
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'toUpperCase' does not exist on type 'number'.
```

Read it as: *"You called a string method on a value TypeScript knows is a number."* The fix is not to force the type — a number genuinely has no `toUpperCase`. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Array methods are higher-order functions that each answer one selector question — `map` makes one new value per item, `filter` keeps the true items, `reduce` folds everything into one accumulated result, and `forEach` performs an action and returns nothing — while TypeScript checks the callback's contract and your tests check the goal.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `const tens = [1, 2, 3].map(number => number * 10)` — what is `tens`?
2. `const longWords = ['cat', 'tiger', 'owl', 'eagle'].filter(word => word.length > 4)` — what is `longWords`?
3. `const total = [10, 20, 30].reduce((runningTotal, number) => runningTotal + number, 0)` — what is `total`?
4. `const result = ['Ada', 'Grace'].forEach(name => name.toUpperCase())` — what is `result`?
5. `[5, 10].map((value, index) => index + ': ' + value)` — what is the output array?
6. `[3, 7, 9, 4].filter(n => n % 2 === 0)` — what is the output array?
7. `[1, 2, 3].reduce((product, n) => product * n, 1)` — what is the result, and why start at `1`?
8. `const doubled = [2, 4].map(n => n * 2)` — is the source array changed? What is `doubled`?
9. What does `scores.filter(score => score >= 50)` return for `[42, 78, 91, 49, 65]`, and why does `49` not appear?
10. Run `npm.cmd run day12:js` and `npm.cmd run day12`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2626 Array Reduce Transformation — https://leetcode.com/problems/array-reduce-transformation/ (hint: NeetCode roadmap)

### Level 2 — Applied mini-projects

1. Convert `[1, 2, 3]` into `[10, 20, 30]` with `map`.
2. Keep words longer than four characters from `['cat', 'tiger', 'owl', 'eagle']` with `filter`.
3. Total `[10, 20, 30]` with `reduce` using initial value `0`.
4. Print each color in `['red', 'green', 'blue']` with `forEach`.
5. TypeScript: type the source as `number[]` and the `map` result as `string[]` — convert `[42, 78, 91]` to `['Score: 42', 'Score: 78', 'Score: 91']`.
6. Build `'Ada, Grace, Linus'` from the names array with `reduce` and initial value `''`. Explain why the string does not start with a comma.

### Level 3 — Creative synthesis

1. The pipeline: from products with `name` and `price`, filter prices below 20, map to names, then explain the value at each stage.
2. The counter: use `reduce` to count passing scores. Start at `0`; add one only when a score is at least 50.
3. Implement `myMap` with a `for...of` loop. Call the callback once per item and push each result into a new array.
4. The selector story: for each of these goals, name the one method — "double every number", "keep even numbers", "sum everything", "log each name" — then write one line for each.
5. The trace proof: write a three-column trace (callback input, callback return, method result) for `[2, 5, 8].filter(n => n > 3).map(n => n * 10)` and compute the final array.

## Finish line

Day 12 is complete when you can do all of these **without notes**:

1. Say what makes `map`, `filter`, `reduce`, and `forEach` higher-order functions.
2. Pick the correct method for a stated goal and write it in one line.
3. Explain why `map` returns an array the same length as its source.
4. Explain the accumulator and initial value, and why the initial value matters.
5. Explain why `forEach` returns `undefined`.
6. Chain `filter` then `map` and read the pipeline step by step.
7. Say whether TypeScript can choose the method for you — and why not.

If any answer is a guess, revisit the matching section before Day 13.

## Prove it

Write, in your own words, a short answer to each:

1. What makes `map`, `filter`, `reduce`, and `forEach` higher-order functions?
2. Why does `map` always return an array the same length as its source?
3. What exact boolean decides whether `filter` keeps an item?
4. What are the accumulator and initial value in `reduce`, and why is the initial value required?
5. Why is `map` a better choice than `forEach` when you need transformed data later?
6. What does TypeScript check about a callback, and what must your tests check instead?

Your answers are today's evidence. If you can write them, move to [Day 13: Higher-Order Functions II — Array Search and Sort](../13_day_hof_ii/13_day_hof_ii.md).

**Day 12 complete.** The selector question is now automatic: `map` transforms, `filter` keeps, `reduce` folds, `forEach` acts — and TypeScript checks the contract between each callback and its array.