# Day 28: Functional Programming — Composing Small Pure Functions

[← Previous lesson](../27_day_events_ii/27_day_events_ii.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../29_day_project_todo/29_day_project_todo.md)



## Start here

Read the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting [exercises](practice/exercises.md), then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.

## Table of Contents

- [Start here](#start-here)

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Functional programming is a set of useful habits](#functional-programming-is-a-set-of-useful-habits)
  - [Pure versus stateful](#pure-versus-stateful)
  - [Do not mutate inputs by accident](#do-not-mutate-inputs-by-accident)
  - [Composition explains a pipeline](#composition-explains-a-pipeline)
  - [Callbacks and closures are still ordinary functions](#callbacks-and-closures-are-still-ordinary-functions)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Preserve function contracts](#preserve-function-contracts)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
  - [TypeScript docs](#typescript-docs)
- [Read the first example line by line](#read-the-first-example-line-by-line)
- [Prediction experiment](#prediction-experiment)
- [Broken example and repair](#broken-example-and-repair)
- [Guided practice before independent work](#guided-practice-before-independent-work)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1-mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2-applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3-creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

The same data often flows through several transformations: trim, lowercase, slugify; filter, map, reduce. When each step is a small pure function and returns a new value, the pipeline is testable one step at a time.

This lesson teaches the three habits that make transformations predictable: pure functions, immutable updates, and composition.

## Prerequisites

- Day 12-13: `map`, `filter`, `reduce`, callbacks.
- Day 19: objects and references.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write a pure function that returns a new list;
- write an immutable object update with spread;
- compose a pipeline with a `pipe` helper;
- keep side effects at clear boundaries;
- type a pipe and immutable helpers without `any`;
- run this course's Day 28 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what makes a function pure;
- why immutability is useful when several parts of an app share data;
- what the value is after each step of a pipe;
- why side effects should have clear boundaries.

## The problem this solves

A username arrives noisy and must be normalized for storage:

```js
function pipe(...functions) {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}

const normalize = pipe(
  (text) => text.trim(),
  (text) => text.toLowerCase(),
  (text) => text.replaceAll(' ', '-')
)

console.log(normalize(' JavaScript Basics ')) // javascript-basics
```

Each step is pure, so the pipeline can be read, named, and tested one transformation at a time.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **Functional programming is a set of useful habits** | The lesson explains functional programming is a set of useful habits through runnable examples and practice. |
| **Pure versus stateful** | The lesson explains pure versus stateful through runnable examples and practice. |
| **Do not mutate inputs by accident** | The lesson explains do not mutate inputs by accident through runnable examples and practice. |
| **Composition explains a pipeline** | The lesson explains composition explains a pipeline through runnable examples and practice. |
| **Callbacks and closures are still ordinary functions** | The lesson explains callbacks and closures are still ordinary functions through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Functional programming is a set of useful habits](#functional-programming-is-a-set-of-useful-habits)
- [Pure versus stateful](#pure-versus-stateful)
- [Do not mutate inputs by accident](#do-not-mutate-inputs-by-accident)
- [Composition explains a pipeline](#composition-explains-a-pipeline)
- [Callbacks and closures are still ordinary functions](#callbacks-and-closures-are-still-ordinary-functions)

## JS runtime deep dive

### Functional programming is a set of useful habits

Functional programming is not a separate language. It is a way to make transformations easy to test and reason about:

- a **pure** function gives the same output for the same input and does not change outside state;
- an **immutable** update returns a new array or object instead of changing the input;
- **composition** connects small transformations into a pipeline.

Real applications still need side effects — DOM updates, storage, logging, and network calls. Put those at clear boundaries and keep the data transformations predictable.

### Pure versus stateful

```js
function addTax(price, rate) {
  return price + price * rate
}

let runningTotal = 0
function addToRunningTotal(amount) {
  runningTotal += amount
  return runningTotal
}
```

`addTax` depends only on its arguments. `addToRunningTotal` depends on call history and changes external state. Stateful code is not forbidden; it simply needs a visible owner and tests that account for the state.

### Do not mutate inputs by accident

```js
function addTag(tags, tag) {
  return [...tags, tag]
}

function updateProfile(profile, changes) {
  return { ...profile, ...changes }
}
```

The original values remain available for comparison, undo, or another consumer. Spread is a shallow copy; nested objects still need a deliberate update strategy.

[The spread syntax page on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) documents what spread copies and what it does not — the distinction behind every immutable update in this lesson.

### Composition explains a pipeline

```js
function pipe(...functions) {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}

const normalize = pipe(
  (text) => text.trim(),
  (text) => text.toLowerCase(),
  (text) => text.replaceAll(' ', '-')
)

console.log(normalize(' JavaScript Basics ')) // javascript-basics
```

Trace the value after each function. If one step is confusing, name it and test it separately before composing it.

[MDN's `Array.prototype.reduce` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is the method behind the `pipe` helper — its accumulator contract is exactly what the composition loop uses.

### Callbacks and closures are still ordinary functions

`map`, `filter`, and `reduce` work well with pure callbacks. A callback that changes outside state makes a pipeline harder to predict:

```js
const scores = [80, 90, 70]
const passing = scores.filter((score) => score >= 80)
```

Use `forEach` when the purpose is a side effect, such as rendering. Use `map` when the purpose is a new array.

[MDN's `Array.prototype.map` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is the entry point for the transformation methods — `filter`, `reduce`, and `forEach` each have their own page with the exact callback contract.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Mutating a shared array in place | Speed or habit | Return a new array |
| Updating a shared object directly | Convenience | Spread into a new object |
| Side effects inside callbacks | Copy-paste | Keep callbacks pure; move effects to a boundary |
| Assuming spread copies nested objects | Over-generalizing | Copy nested objects only when updated |
| Composing an unreadable pipeline | All-in-one | Name and test each step first |

## The TypeScript layer

### Preserve function contracts

TypeScript can type the contract of each helper so a mismatch fails before it runs:

```ts
function pipe<T>(...functions: Array<(value: T) => T>): (input: T) => T {
  return (input) => functions.reduce((value, fn) => fn(value), input)
}
```

This simple `pipe` requires every step to accept and return the same type. More advanced pipelines can change types, but adding that complexity before understanding the data flow makes errors harder to read.

### What TypeScript cannot decide

TypeScript cannot decide whether a function mutates its input, because mutation happens at runtime. It cannot enforce purity or immutability. It types the shapes so mismatches surface, but the discipline — returning new values, keeping callbacks pure — is a runtime habit your tests must prove.

### One compiler error, walked through

Open `28_day_functional_programming/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const broken = pipe(
  (value: string) => value.trim(),
  (value: string) => value.length
)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Type '(value: string) => number' is not assignable to type '(value: string) => string'.
  Type 'number' is not assignable to type 'string'.
```

Read it as: *"The simple `pipe` requires every step to accept and return the same type `T`. The second step returns a number, so the pipeline cannot hold together."* The fix is to keep the pipeline on one type:

```ts
const label = pipe(
  (value: string) => value.trim(),
  (value: string) => value.toLowerCase(),
  (value: string) => 'tag:' + value
)
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Functional programming is a set of useful habits — pure functions with the same output for the same input, immutable updates that return new values, and composition that traces one value through small named steps with side effects pushed to clear boundaries.

## Learn more on MDN

The transformation methods and spread carry most of the weight here. Bookmark these pages and return as you grow:

- [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) — one new array, one value per item
- [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — keeping the items that pass a predicate
- [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — the accumulator contract behind `pipe`
- [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) — the side-effect iteration
- [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — copying arrays and objects, and what stays shallow
- [Array.prototype.toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) — a built-in immutable sort that returns a new array
- [Array.prototype.with](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with) — a built-in immutable element replacement
- [Immutability](https://developer.mozilla.org/en-US/docs/Glossary/Immutable) — the glossary definition behind immutable updates
- [Pure function](https://developer.mozilla.org/en-US/docs/Glossary/Pure_function) — the glossary definition behind pure functions

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind function contracts
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — the `T` in `pipe<T>` and how it flows through the pipeline

## Read the first example line by line

The first runnable example introduces **Functional Programming — Composing Small Pure Functions**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `function pipe(...functions) {` | Function syntax: this line defines reusable behavior or an arrow function. |
| 2 | `  return (input) => functions.reduce((value, fn) => fn(value), input)` | Function syntax: this line defines reusable behavior or an arrow function. |
| 3 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |
| 4 | `` | Blank line: it separates ideas for the reader. |
| 5 | `const normalize = pipe(` | Declaration or assignment: the runtime creates or updates a named value. |
| 6 | `  (text) => text.trim(),` | Function syntax: this line defines reusable behavior or an arrow function. |
| 7 | `  (text) => text.toLowerCase(),` | Function syntax: this line defines reusable behavior or an arrow function. |
| 8 | `  (text) => text.replaceAll(' ', '-')` | Function syntax: this line defines reusable behavior or an arrow function. |
| 9 | `)` | Expression or data declaration: identify the values, operators, and names before running it. |
| 10 | `` | Blank line: it separates ideas for the reader. |
| 11 | `console.log(normalize(' JavaScript Basics ')) // javascript-basics` | Output call: the program displays the evaluated value in the console. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Functional Programming — Composing Small Pure Functions**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Functional Programming — Composing Small Pure Functions**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What makes a function pure?
2. Why is immutability useful when several parts of an app use the same data?
3. What is the value after each step of `pipe((t) => t.trim(), (t) => t.toLowerCase())` given `'  Hello  '`?
4. Why should side effects have clear boundaries?
5. Why is a callback that mutates state harder to predict?
6. Run `npm.cmd run day28:js` and `npm.cmd run day28`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2635 Apply Transform Over Each Element in Array — https://leetcode.com/problems/apply-transform-over-each-element-in-array/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Write a pure function that returns a new list with one item removed.
2. Write `updateUser` that returns a new object and leaves its input unchanged.
3. Build a pipe that trims, lowercases, and adds a prefix.
4. TypeScript: type the functions without using `any`.
5. **MDN lookup:** Open the [Array.prototype.reduce reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), find the `initialValue` parameter, and rewrite the `pipe` helper to pass an explicit initial value. Comment on what changes if the first pipeline step receives `undefined` instead of the input.

### Level 3 — Creative synthesis

1. The identity pipe: write `pipe` that runs with zero functions and returns the input unchanged; then comment on why that base case keeps `reduce` correct.
2. The selective merge: write `updateProfile` that copies a nested `preferences` object only when `changes.preferences` exists, and comment on why shallow copy alone is not enough.
3. The audited state: write a pure `toReadingList` that sorts a copy of an array instead of mutating it, with a comment on what breaks if the sort happens in place.
4. The boundary memo: write a comment block listing three side effects (DOM, storage, network) and where each boundary belongs in a typical page.

## Finish line

Day 28 is complete when you can do all of these **without notes**:

1. Write a pure function that returns a new list.
2. Write an immutable object update with spread.
3. Compose a pipeline with a `pipe` helper.
4. Keep side effects at clear boundaries.
5. Type a pipe and immutable helpers without `any`.

If any answer is a guess, revisit the matching section before Day 29.

## Prove it

Write, in your own words, a short answer to each:

1. What makes a function pure?
2. Why is immutability useful when several parts of an app use the same data?
3. What is the value after each step of a pipe?
4. Why should side effects have clear boundaries?
5. Why does the simple `pipe` require every step to share one type?

Your answers are today's evidence. If you can write them, move to [Day 29: The Todo Project — Bringing It Together](../29_day_project_todo/29_day_project_todo.md).

**Day 28 complete.** Transformations are now predictable — pure functions, immutable updates that return new values, and a `pipe` that traces one value through small named steps with side effects pushed to clear boundaries.