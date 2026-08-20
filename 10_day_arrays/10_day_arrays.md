# Day 10: Arrays — Ordered Collections and Array Methods

[← Previous lesson](../09_day_objects/09_day_objects.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../11_day_destructuring/11_day_destructuring.md)

zero](#indexes-start-at-zero)
  - [length and out-of-range access](#length-and-out-of-range-access)
  - [Add and remove items: mutating methods](#add-and-remove-items-mutating-methods)
  - [Copy before changing shared data](#copy-before-changing-shared-data)
  - [Assignment does not copy](#assignment-does-not-copy)
  - [Read the first or last item safely](#read-the-first-or-last-item-safely)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [An array of numbers is not an array of anything](#an-array-of-numbers-is-not-an-array-of-anything)
  - [Why TypeScript cannot prove an index exists](#why-typescript-cannot-prove-an-index-exists)
  - [Tuples: a short array with a fixed meaning per position](#tuples-a-short-array-with-a-fixed-meaning-per-position)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

zero](#indexes-start-at-zero)
  - [length and out-of-range access](#length-and-out-of-range-access)
  - [Add and remove items: mutating methods](#add-and-remove-items-mutating-methods)
  - [Copy before changing shared data](#copy-before-changing-shared-data)
  - [Assignment does not copy](#assignment-does-not-copy)
  - [Read the first or last item safely](#read-the-first-or-last-item-safely)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [An array of numbers is not an array of anything](#an-array-of-numbers-is-not-an-array-of-anything)
  - [Why TypeScript cannot prove an index exists](#why-typescript-cannot-prove-an-index-exists)
  - [Tuples: a short array with a fixed meaning per position](#tuples-a-short-array-with-a-fixed-meaning-per-position)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
  - [TypeScript docs](#typescript-docs)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1-mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2-applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3-creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

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
  - [An array is an ordered list](#an-array-is-an-ordered-list)
  - [Indexes start at zero](#indexes-start-at-zero)
  - [length and out-of-range access](#length-and-out-of-range-access)
  - [Add and remove items: mutating methods](#add-and-remove-items-mutating-methods)
  - [Copy before changing shared data](#copy-before-changing-shared-data)
  - [Assignment does not copy](#assignment-does-not-copy)
  - [Read the first or last item safely](#read-the-first-or-last-item-safely)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [An array of numbers is not an array of anything](#an-array-of-numbers-is-not-an-array-of-anything)
  - [Why TypeScript cannot prove an index exists](#why-typescript-cannot-prove-an-index-exists)
  - [Tuples: a short array with a fixed meaning per position](#tuples-a-short-array-with-a-fixed-meaning-per-position)
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

Objects group facts by name, but many real collections are **ordered**: a shopping list, messages in a chat, scores recorded over time. Order matters — first item, last item, the item after the next. An **array** is the tool for ordered data, and almost every real program touches one: the DOM returns arrays, APIs return arrays, and your own data is often a list.

Arrays have two silent traps. First, `push`, `pop`, `shift`, and `unshift` **mutate** the array you call them on — so a function that "adds an item" can quietly change the caller's data. Second, reading `array[10]` when the array has three items is **not an error**; it returns `undefined`, and downstream code may assume that `undefined` is a real item. This lesson makes both precise.

## Prerequisites

- Day 6: loops, `for...of`.
- Day 8: callbacks.
- Day 9: objects and copying.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create arrays and access items by zero-based index;
- explain `length` and out-of-range access;
- add and remove items while knowing which methods mutate;
- copy an array before changing it;
- use TypeScript array and tuple types;
- run this course's Day 10 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why the first index is 0 and the last valid index is `length - 1`;
- why `=` copies a reference, not the array;
- what `at(-1)` gives you and when it returns `undefined`;
- why TypeScript cannot prove an arbitrary index exists;
- when a tuple is a better fit than an object.

## The problem this solves

A single score is easy:

```js
const score = 88
```

Now record three scores. Three variables work, but they are unconnected: there is no way to say "the second score," no way to count them, and no way to loop over them. Add a hundred scores and the approach collapses.

```js
const scores = [88, 91, 76]
```

One value that holds many ordered values. Now you can loop over them (Day 6), pass the whole list to a function (Day 7), and count them with `.length`. The array is how programs represent collections, and almost every API you will meet either takes one or returns one.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **An array is an ordered list** | The lesson explains an array is an ordered list through runnable examples and practice. |
| **Indexes start at zero** | The lesson explains indexes start at zero through runnable examples and practice. |
| **length and out-of-range access** | The lesson explains length and out-of-range access through runnable examples and practice. |
| **Add and remove items: mutating methods** | The lesson explains add and remove items: mutating methods through runnable examples and practice. |
| **Copy before changing shared data** | The lesson explains copy before changing shared data through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [An array is an ordered list](#an-array-is-an-ordered-list)
- [Indexes start at zero](#indexes-start-at-zero)
- [length and out-of-range access](#length-and-out-of-range-access)
- [Add and remove items: mutating methods](#add-and-remove-items-mutating-methods)
- [Copy before changing shared data](#copy-before-changing-shared-data)

## JS runtime deep dive

### An array is an ordered list

```js
const colors = ['red', 'yellow', 'green']
```

An array literal is square brackets around comma-separated values. The order is part of the meaning — `['red', 'yellow']` is not `['yellow', 'red']`.

### Indexes start at zero

Each item has a position called an **index**. Indexes begin at 0:

```text
index:     0        1        2
value:  'red'   'yellow'  'green'
```

```js
console.log(colors[0])     // red
console.log(colors[2])     // green
console.log(colors.length) // 3
```

### length and out-of-range access

`length` counts the items. Because indexes start at 0, the **last valid index is `length - 1`**:

```js
const colors = ['red', 'yellow', 'green']
console.log(colors.length) // 3
console.log(colors[2])     // green  (the last valid index)
```

Reading beyond the end is **not an error** — it produces `undefined`:

```js
console.log(colors[3]) // undefined
```

The danger is downstream: later code may assume `undefined` is a real item and try to read `colors[3].length` or `colors[3].toUpperCase()`. The reading is harmless; the assuming is the bug.

### Add and remove items: mutating methods

Some array methods **change the array you call them on**. They are called **mutating** methods:

```js
const tasks = ['Read']

tasks.push('Practise')       // add to the end
console.log(tasks)           // ['Read', 'Practise']

const finishedTask = tasks.pop() // remove from the end
console.log(finishedTask)    // Practise
console.log(tasks)           // ['Read']
```

| Method | Changes original? | Result |
| --- | --- | --- |
| `push(item)` | yes | new length |
| `pop()` | yes | removed final item, or `undefined` |
| `shift()` | yes | removed first item, or `undefined` |
| `unshift(item)` | yes | new length |
| `slice(start, end)` | no | a new portion of the array |

Note the asymmetry: `push` and `unshift` return the new **length**; `pop` and `shift` return the **removed item**. Mixing these up is a classic silent bug. The [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) reference lists every method and exactly what it returns.

### Copy before changing shared data

When the previous value still matters, make a copy first:

```js
const originalTasks = ['Read', 'Practise']
const copiedTasks = [...originalTasks]   // spread into a NEW array

copiedTasks.push('Build')

console.log(originalTasks) // ['Read', 'Practise']
console.log(copiedTasks)   // ['Read', 'Practise', 'Build']
```

The spread operator copies the items into a brand-new array, so pushing to the copy does not touch the original — see [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) for the full behavior.

### Assignment does not copy

Assignment alone does **not** copy an array — both names refer to the same array:

```js
const sharedTasks = originalTasks   // same array, second name
sharedTasks.push('Surprise')

console.log(originalTasks) // ['Read', 'Practise', 'Surprise'] — changed too
```

This is the same aliasing story as objects in Day 9. Two names, one array. Copy with `[...items]` when you need an independent array.

Spread is a **shallow** copy: objects nested inside the array are still shared references. You will handle deep copies in a later day.

### Read the first or last item safely

```js
const colors = ['red', 'yellow', 'green']

console.log(colors.at(0))  // red
console.log(colors.at(-1)) // green
```

`at(-1)` is a readable modern way to ask for the final item. It still returns `undefined` for an empty array — so the boundary rule still applies. Read the [at() page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) for the full index rules.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Treating the first item as index 1 | Counting feels natural | Arrays begin at index 0 |
| Assuming `pop()` always returns an item | It removes "something" | Handle `undefined` for an empty array |
| Using `=` and expecting a copy | Assignment copies the reference | Use `[...items]` for a new array |
| Assuming `push` returns the new item | It returns the new length | Read the docs, not the intention |
| Calling an array item a number without checking | `undefined` is not an error | Check for `undefined` at the boundary |
| Using a tuple for a confusing collection | Two numbers are easy to misread | Use an object with named properties |

## The TypeScript layer

### An array of numbers is not an array of anything

```js
const scores = [88, 91, 76]
scores.push('absent') // JavaScript allows this.
```

```ts
const scores: number[] = [88, 91, 76]

// scores.push('absent')
// Error: this array is for numbers.
```

`number[]` means "an array whose items are numbers." The annotation applies to the whole array: every `push`, every assignment, every read is checked.

### Why TypeScript cannot prove an index exists

```ts
const scores: number[] = [88, 91, 76]
const firstScore: number | undefined = scores[0]
```

The type of `scores[0]` is `number | undefined`. The compiler cannot know whether the index you use — especially one supplied by a user or computed at runtime — is within bounds. It represents the uncertainty honestly:

```ts
if (firstScore !== undefined) {
  console.log(firstScore.toFixed(1))
}
```

Your code still needs the boundary check. TypeScript tells you the boundary *may* be crossed; it cannot know for a given value.

### Tuples: a short array with a fixed meaning per position

A **tuple** is an array type where each position has a fixed type and a stable meaning:

```ts
type Point = [number, number]

const origin: Point = [0, 0]
const location: Point = [12, 8]
```

Use a tuple only when the position *is* the meaning — two coordinates, a row/column, a pair. For anything richer, an object with named properties is clearer:

```ts
type Location = { x: number; y: number }
```

### One compiler error, walked through

Open `10_day_arrays/starter/ts/main.ts`. The starter declares `originalTasks` as `string[]`. The last line is commented out and deliberately broken:

```ts
originalTasks.push(4)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Argument of type 'number' is not assignable to parameter of type 'string'.
```

Read it as: *"`originalTasks` promised to hold strings — `4` is a number."* The fix is not to change the array's type so numbers fit; the fix is that the *value* was wrong for the declared shape. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

An array is an ordered collection read from index 0 to `length - 1`; know which methods mutate and copy with `[...items]` before changing shared data — while TypeScript checks that every item matches the declared type, and represents an arbitrary index as possibly `undefined`.

## Learn more on MDN

Bookmark these pages and return as you grow:

- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — the reference for every array method and what it returns.
- [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections) — the guide that frames arrays inside the language's collection story.
- [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) — adds to the end and returns the new length.
- [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) — removes from the end and returns the removed item.
- [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) — copies a portion of the array without mutating it.
- [at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) — reads an item by index, including negative indexes from the end.
- [length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) — the count, and how `length - 1` is the last valid index.
- [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — how `[...items]` builds a new array.

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — arrays as `number[]` and `string[]`.
- [Objects](https://www.typescriptlang.org/docs/handbook/2/objects.html) — array and tuple types in context.

## Read the first example line by line

The first runnable example introduces **Arrays — Ordered Collections and Array Methods**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const score = 88` | Declaration or assignment: the runtime creates or updates a named value. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Arrays — Ordered Collections and Array Methods**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Arrays — Ordered Collections and Array Methods**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `const colors = ['red', 'yellow', 'green']` — what do `colors[0]`, `colors[2]`, and `colors.length` produce?
2. What does `colors[3]` produce, and is it an error?
3. What is the last valid index of an array with `length` 4?
4. After `tasks.push('Practise')`, what does `push` return?
5. After `tasks.pop()` on an array with one item, what do `pop` and the array produce?
6. What does `pop()` return on an **empty** array?
7. What do `originalTasks` and `copiedTasks` contain after `copiedTasks.push('Build')` when `copiedTasks` was spread from `originalTasks`?
8. What do `originalTasks` contain after `sharedTasks.push('Surprise')` when `sharedTasks = originalTasks`?
9. What do `colors.at(0)` and `colors.at(-1)` produce?
10. Run `npm.cmd run day10:js` and `npm.cmd run day10`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 217 Contains Duplicate — https://leetcode.com/problems/contains-duplicate/ (hint: https://neetcode.io/problems/duplicate-integer/question) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Create an array of three books and log the first title and the last title.
2. Push one new book, then pop one book. Predict the result of each line, then verify.
3. Make a copied array, modify only the copy, and confirm the original is unchanged.
4. In TypeScript, make a `string[]` and intentionally `push` a number — read the error, then comment the line back out.
5. Define a `Point` tuple type `[number, number]` and create one coordinate.
6. Write a function `firstItem(items)` that returns the first item using `at(0)`.
7. **MDN lookup:** on the [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) reference, read the `slice` page, then write `copyOf(items)` that returns a copy of `items` using `slice` instead of spread — and in a comment note the one difference from `[...items]`.

### Level 3 — Creative synthesis

1. A runner-up list: write `pushIfUnique(items, value)` that pushes `value` only if it is not already in `items`, and returns the new length. (Hint: use `items.includes(value)`.)
2. The queue: write `enqueue(items, value)` that pushes and returns the new length, and `dequeue(items)` that shifts and returns the removed item — both mutating on purpose.
3. The unchanged copy: write `addItem(items, value)` that returns a **new** array with `value` appended, leaving `items` untouched, and in a comment explain why a caller's array stays safe.
4. The safe average: write `average(numbers)` that returns the mean, but first checks the array is not empty and explains (in a comment) why an empty array would otherwise produce `NaN`.
5. The tuple story: define a `Coordinate` tuple and a `Location` object for the same data, then in a comment explain when you would pick the tuple and when the object.

## Finish line

Day 10 is complete when you can do all of these **without notes**:

1. Create an array and read items by zero-based index.
2. State the last valid index from `length`.
3. Say which methods mutate and what each returns.
4. Copy an array with spread before changing it.
5. Type an array and a tuple in TypeScript.
6. Explain why TypeScript cannot prove an index exists.

If any answer is a guess, revisit the matching section before Day 11.

## Prove it

Write, in your own words, a short answer to each:

1. Why is the first array index 0, and what is the last valid index of an array with `length` 4?
2. What does `push` return, and what does `pop` return?
3. Why is `copiedTasks` independent while `sharedTasks` is not?
4. What does `at(-1)` give you, and when does it return `undefined`?
5. What does `scores.push('absent')` do in JavaScript, and why does TypeScript reject it?
6. When is a tuple a better fit than a regular array — and when is an object better than a tuple?

Your answers are today's evidence. If you can write them, move to [Day 11: Destructuring — Extracting Values Cleanly](../11_day_destructuring/11_day_destructuring.md).

**Day 10 complete.** Arrays are now exact: ordered data read from index 0 to `length - 1`, mutating methods used deliberately, copies made before shared data changes — with TypeScript checking the item types and flagging the boundary you still must handle.