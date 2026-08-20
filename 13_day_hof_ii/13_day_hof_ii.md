# Day 13: Higher-Order Functions II — Array Questions and Safe Sorting

[Day 12 <<](../12_day_hof_i/12_day_hof_i.md) | [Day 14 >>](../14_day_strings/14_day_strings.md)



## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Choose the question before choosing the method](#choose-the-question-before-choosing-the-method)
  - [includes: exact value present?](#includes-exact-value-present)
  - [some and every: yes-or-no questions](#some-and-every-yes-or-no-questions)
  - [find: get the first matching item](#find-get-the-first-matching-item)
  - [findIndex: get the position of the first match](#findindex-get-the-position-of-the-first-match)
  - [sort: arrange values carefully](#sort-arrange-values-carefully)
  - [Keep the original array unchanged](#keep-the-original-array-unchanged)
  - [Sorting objects with a comparator](#sorting-objects-with-a-comparator)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Missing results must be handled](#missing-results-must-be-handled)
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

Day 12 transformed, kept, and combined whole arrays. But many real questions ask about *individual* items: "Is this value present?", "Is any score failing?", "What is the first match?", "In which position is it?", "Put these in order." Reaching for the wrong method (or hand-rolling a loop) produces code that is either slower than needed, confusingly wrong, or — in the case of `sort` — mutates data you still need.

This lesson teaches the **question-first** approach: name the question, then pick the method that answers exactly it. It also teaches the one array method that mutates its source (`sort`) and the discipline — copy first — that keeps the rest of your program safe.

## Prerequisites

- Day 7: functions, arrow functions.
- Day 8: callbacks.
- Day 10: arrays, indexes, `length`.
- Day 12: `map`, `filter`, `reduce`, `forEach`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- check an exact value with `includes`;
- ask yes-or-no questions with `some` and `every`;
- get the first matching item with `find` and its position with `findIndex`;
- sort numbers and objects with a comparator;
- sort a **copy** so the original array stays unchanged;
- handle a possibly missing result in TypeScript before using it;
- run this course's Day 13 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the difference between a missing item and a false answer;
- how early stopping works in `some`, `every`, and `find`;
- why `[]` is `false` for `some` but `true` for `every`;
- why `find` returns `undefined` and `findIndex` returns `-1` when nothing matches;
- why `sort` without a comparator sorts numbers as text;
- what the three comparator return values mean.

## The problem this solves

Your app has data and needs answers:

```js
const roles = ['reader', 'editor', 'admin']
const scores = [42, 78, 91, 49]
```

Different questions need different answers:

- "Is `'admin'` in the roles?" — a **yes or no**.
- "Is any score at least 90?" — a **yes or no**, but decided by a condition.
- "What is the first passing score?" — the **item itself**.
- "At which index is Grace?" — a **position**.
- "Show scores from low to high" — a **rearranged array**.

Writing five different loops to answer five questions buries each answer in machinery. Each of these questions has a named method whose name *is* the question. This lesson maps question → method, and it flags the one method that behaves differently from the others: `sort` changes its source, so a safe program copies before it sorts.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **Choose the question before choosing the method** | The lesson explains choose the question before choosing the method through runnable examples and practice. |
| **includes: exact value present?** | The lesson explains includes: exact value present? through runnable examples and practice. |
| **some and every: yes-or-no questions** | The lesson explains some and every: yes-or-no questions through runnable examples and practice. |
| **find: get the first matching item** | The lesson explains find: get the first matching item through runnable examples and practice. |
| **findIndex: get the position of the first match** | The lesson explains findindex: get the position of the first match through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Choose the question before choosing the method](#choose-the-question-before-choosing-the-method)
- [includes: exact value present?](#includes-exact-value-present)
- [some and every: yes-or-no questions](#some-and-every-yes-or-no-questions)
- [find: get the first matching item](#find-get-the-first-matching-item)
- [findIndex: get the position of the first match](#findindex-get-the-position-of-the-first-match)

## JS runtime deep dive

### Choose the question before choosing the method

| Your question | Method | Result |
|---|---|---|
| Is this exact value present? | `includes` | boolean |
| Is there at least one matching item? | `some` | boolean |
| Do all items match? | `every` | boolean |
| What is the first matching item? | `find` | item or `undefined` |
| Where is the first matching item? | `findIndex` | index or `-1` |

Name the question first. The method follows.

### includes: exact value present?

`includes` does not use a callback. It checks whether an exact value is present:

```js
const roles = ['reader', 'editor', 'admin']

console.log(roles.includes('admin')) // true
console.log(roles.includes('owner')) // false
```

Use `includes` when you already know the exact value. For a condition such as "a score above 90", use `some` or `find` instead. The [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) page spells out the exact-match rule.

### some and every: yes-or-no questions

`some` asks whether **at least one** item passes your test:

```js
const scores = [42, 78, 91, 49]

const hasExcellentScore = scores.some(score => score >= 90)
console.log(hasExcellentScore) // true
```

`some` **stops** as soon as it finds a `true` result — it does not inspect later items.

`every` asks whether **all** items pass:

```js
const ages = [18, 21, 34]
const everyoneIsAnAdult = ages.every(age => age >= 18)

console.log(everyoneIsAnAdult) // true
```

`every` stops as soon as it finds a `false` result.

Trace both:

| Method | Item | Callback result | Can the method stop? |
|---|---:|---|---|
| `some(score >= 90)` | 42 | false | no |
| `some(score >= 90)` | 78 | false | no |
| `some(score >= 90)` | 91 | true | yes; answer is true |
| `every(age >= 18)` | 18 | true | no |
| `every(age >= 18)` | 21 | true | no |
| `every(age >= 18)` | 34 | true | yes; answer is true |

An empty array has a surprising but logical result: `[].some(...)` is `false` because there is no matching item; `[].every(...)` is `true` because there is no item that breaks the rule. Handle empty lists explicitly when that distinction matters to your user.

### find: get the first matching item

`find` returns the **item itself**, not `true`:

```js
const students = [
  { name: 'Ada', score: 92 },
  { name: 'Grace', score: 47 },
  { name: 'Linus', score: 78 }
]

const firstFailingStudent = students.find(student => student.score < 50)
console.log(firstFailingStudent) // { name: 'Grace', score: 47 }
```

If no item matches, `find` returns `undefined`:

```js
const missing = students.find(student => student.name === 'Mina')
console.log(missing) // undefined
```

That is different from an empty object or an empty string. It means: **no matching array item exists.** The [find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) page documents the `undefined` result and the early stop.

### findIndex: get the position of the first match

`findIndex` returns the array position:

```js
const firstFailingIndex = students.findIndex(student => student.score < 50)
console.log(firstFailingIndex) // 1

const missingIndex = students.findIndex(student => student.name === 'Mina')
console.log(missingIndex) // -1
```

Use `findIndex` when you need a position to replace or remove an item. Use `find` when you need the item itself.

### sort: arrange values carefully

`sort` **changes the original array**. That is different from `map` and `filter`, which return new arrays and leave the source alone.

```js
const numbers = [10, 2, 30]
numbers.sort()

console.log(numbers) // [10, 2, 30] — not numeric order!
```

Without a comparator, `sort` converts values to **text** and compares that text, so `10` sorts before `2`. For numbers, provide a comparator:

```js
const numbers = [10, 2, 30]
numbers.sort((left, right) => left - right)

console.log(numbers) // [2, 10, 30]
```

The comparator receives two values and returns one of three signals:

- a **negative** number: `left` should come first;
- a **positive** number: `right` should come first;
- **zero**: their relative order can stay the same.

For ascending numbers, `left - right` works:

| left | right | left - right | Order |
|---:|---:|---:|---|
| 2 | 10 | -8 | 2 before 10 |
| 30 | 10 | 20 | 10 before 30 |

For descending numbers, reverse it: `right - left`. The [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) reference details the comparator and the default text comparison.

### Keep the original array unchanged

Copy before you sort:

```js
const originalNumbers = [10, 2, 30]
const ascendingNumbers = [...originalNumbers].sort((left, right) => left - right)

console.log(originalNumbers)  // [10, 2, 30]
console.log(ascendingNumbers) // [2, 10, 30]
```

### Sorting objects with a comparator

```js
const products = [
  { name: 'Notebook', price: 8 },
  { name: 'Headphones', price: 45 },
  { name: 'Pen', price: 2 }
]

const cheapestFirst = [...products].sort((left, right) => left.price - right.price)
// cheapestFirst: Pen (2), Notebook (8), Headphones (45)
```

The source `products` array remains in its original order. Only the copy is sorted.

### Common mistakes table

| Mistake | Why it fails | Better choice |
|---|---|---|
| Using `find` when you only need true or false | `find` returns the item, not a boolean | `some` |
| Treating `find`'s `undefined` result as an object | A missing match means "no such item" | Check for `undefined` first |
| Treating `-1` from `findIndex` as an array item | `-1` is the sentinel for "not found" | Check `index >= 0` first |
| Calling `sort` directly on state you still need | `sort` mutates its source | Copy with `[...items]` first |
| Sorting numbers without a comparator | Values are compared as text | Return `left - right` or `right - left` |

## The TypeScript layer

### Missing results must be handled

JavaScript:

```js
const numbers = [2, 4, 6]
const firstOdd = numbers.find(number => number % 2 !== 0)

console.log(firstOdd) // undefined
```

TypeScript makes the missing case visible before the program runs:

```ts
const numbers: number[] = [2, 4, 6]
const firstOdd: number | undefined = numbers.find(number => number % 2 !== 0)

if (firstOdd === undefined) {
  console.log('No odd number was found.')
} else {
  console.log(firstOdd * 2)
}
```

The type `number | undefined` forces you to decide what happens when no match exists. TypeScript does not choose that behavior for you — but it will not let you ignore the possibility.

### What TypeScript cannot decide

Types tell you a result *may* be missing; they cannot tell you whether the missing case is a problem for *your* user. "No admin" may be fine in one app and a security error in another — that is product logic, not type logic. Similarly, TypeScript knows `sort` accepts a comparator, but it cannot warn you that a missing comparator sorts numbers as text; only the tests can.

### One compiler error, walked through

Open `13_day_hof_ii/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
console.log(firstPassingScore.toFixed(2))
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'firstPassingScore' is possibly 'undefined'.
```

Read it as: *"You called a method on a value that may not exist — `find` returns `undefined` when nothing matches."* The fix is to narrow first:

```ts
if (firstPassingScore !== undefined) {
  console.log(firstPassingScore.toFixed(2))
}
```

Inside the `if`, TypeScript knows the value is a number. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Each array question has one method — `includes` for an exact value, `some`/`every` for yes-or-no tests, `find`/`findIndex` for the first match, `sort` with a comparator on a copy — and TypeScript forces you to handle the missing result before you use it.

## Learn more on MDN

Bookmark these pages and return as you grow:

- [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) — exact-value membership as a boolean.
- [some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) — does at least one item pass the test?
- [every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) — do all items pass the test?
- [find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) — the first matching item, or `undefined`.
- [findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) — the position of the first match, or `-1`.
- [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — the mutating sort, and what a comparator returns.
- [toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) — the modern non-mutating sort that returns a copy.
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — the full reference for every question method.

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — typing arrays whose items can be found or missing.
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how the `undefined` check turns `number | undefined` into `number`.

## Read the first example line by line

The first runnable example introduces **Higher-Order Functions II — Array Questions and Safe Sorting**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const roles = ['reader', 'editor', 'admin']` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `const scores = [42, 78, 91, 49]` | Declaration or assignment: the runtime creates or updates a named value. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Higher-Order Functions II — Array Questions and Safe Sorting**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Higher-Order Functions II — Array Questions and Safe Sorting**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `['red', 'green', 'blue'].includes('green')` — what is the result?
2. `[3, 7, 11, 12].some(value => value % 2 === 0)` — what is the result?
3. `[60, 72, 88].every(score => score >= 50)` — what is the result?
4. `['sun', 'planet', 'moon'].find(word => word.length > 5)` — what is the result?
5. `[42, 78, 91, 49].find(score => score >= 90)` — what is the result? What about `.some(score => score >= 90)`?
6. `[10, 2, 30].sort()` — why is this not `[2, 10, 30]`?
7. `[15, 3, 40, 8].sort((a, b) => a - b)` — what is the result?
8. `[15, 3, 40, 8].sort((a, b) => b - a)` — what is the result?
9. `[].some(x => x > 0)` versus `[].every(x => x > 0)` — why do they differ?
10. Run `npm.cmd run day13:js` and `npm.cmd run day13`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 56 Merge Intervals — https://leetcode.com/problems/merge-intervals/ (hint: https://neetcode.io/problems/merge-intervals/question) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Check whether `['red', 'green', 'blue']` contains `'green'` with `includes`.
2. Check whether `[3, 7, 11, 12]` contains an even number with `some`.
3. Check whether `[60, 72, 88]` are all passing scores (≥ 50) with `every`.
4. Locate the first word longer than five letters with `find`.
5. TypeScript: define a `Product` interface with `name` and `price`. Use `find` to locate a product and handle `Product | undefined` before reading its `name`.
6. Sort `[15, 3, 40, 8]` from smallest to largest **without changing the original**; confirm the original stays `[15, 3, 40, 8]`.
7. **MDN lookup:** on the [toSorted()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) page, read how it returns a sorted copy, then write `sortedCopy(items)` that uses `toSorted` with a numeric comparator — and in a comment note how it differs from the `[...items].sort(...)` approach in this lesson.

### Level 3 — Creative synthesis

1. The duplicate finder: find the first duplicate in a number array. Hint: for each value, compare its first and current index.
2. The search: write `searchProducts(products, text)` that returns products whose names contain the supplied text. Return an empty array when nothing matches.
3. The question card: for each goal, name the one method — "is X present", "any failing score", "all adults", "first admin object", "index of Mina", "prices low to high" — then write one line for each.
4. The empty-array story: write a short paragraph explaining why `[].some(...)` is `false` and `[].every(...)` is `true`, and name one UI situation where that distinction would matter.
5. The safe sort: write a `sortCopy(items, comparator)` helper that returns a sorted copy and never mutates `items`. Show the original unchanged after calling it.

## Finish line

Day 13 is complete when you can do all of these **without notes**:

1. Name the method for each array question: exact value, any match, every match, first item, first position, sorted copy.
2. Explain the difference between a missing item and a false answer.
3. Trace how `some`, `every`, and `find` can stop early.
4. Sort numbers and objects with a comparator, and copy before sorting.
5. Handle `undefined` from `find` and `-1` from `findIndex` before using them.
6. Say why `[]` answers `false` to `some` and `true` to `every`.

If any answer is a guess, revisit the matching section before Day 14.

## Prove it

Write, in your own words, a short answer to each:

1. Which method answers "is any score below 50"? Which answers "is every score passing"?
2. What is the difference between `some` and `find`?
3. What does `find` return when no item matches, and what does `findIndex` return?
4. Why do you copy an array before sorting it?
5. Why does `sort()` without a comparator put `10` before `2`?
6. Why does the type `number | undefined` force you to handle a missing result?

Your answers are today's evidence. If you can write them, move to [Day 14: Strings — Text as a Value](../14_day_strings/14_day_strings.md).

**Day 13 complete.** The question now picks the method: `includes` for exact values, `some`/`every` for yes-or-no, `find`/`findIndex` for the first match, and a sorted copy — never a mutated original.