# Day 31: Promises — One Future Result

[Day 30 <<](../30_day_project_weather/30_day_project_weather.md) | [Day 32 >>](../32_day_promises_ii/32_day_promises_ii.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [A Promise represents one future outcome](#a-promise-represents-one-future-outcome)
  - [The executor runs immediately](#the-executor-runs-immediately)
  - [Consuming a Promise](#consuming-a-promise)
  - [Chaining passes returned values](#chaining-passes-returned-values)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Promise<T> describes the fulfilled value](#promiset-describes-the-fulfilled-value)
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

A timer, file, or network request cannot finish during the same instant as the line that starts it. Day 30 used a Promise at the weather boundary; this lesson explains what a Promise actually is — one future outcome — and how to consume and chain it.

## Prerequisites

- Day 30: consuming a `getWeather` Promise in the weather project.
- Day 18: errors and `catch` as runtime recovery.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create a Promise with an executor and settle it with `resolve` or `reject`;
- consume a Promise with `then`, `catch`, and `finally`;
- chain steps by returning the next operation from a `then`;
- write `delay(ms)` that resolves after `ms` milliseconds;
- type fulfilled values with `Promise<T>` and narrow caught values as `unknown`;
- run this course's Day 31 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what runs immediately when `new Promise` is constructed;
- what a `then` callback receives;
- what the next `then` receives when a callback forgets `return`;
- why an async operation does not freeze the whole program.

## The problem this solves

```js
const result = new Promise((resolve, reject) => {
  setTimeout(() => resolve('finished'), 100)
})

result
  .then((value) => console.log(value))
  .catch((error) => console.error(error))
  .finally(() => console.log('cleanup'))
```

The value arrives later, the error arrives later, and the program keeps running while it waits.

## JS runtime deep dive

### A Promise represents one future outcome

A Promise is an object representing one future outcome:

- **pending**: still undecided;
- **fulfilled**: completed with a value;
- **rejected**: failed with a reason.

Once fulfilled or rejected, a promise is settled and cannot change to the other outcome.

### The executor runs immediately

```js
const result = new Promise((resolve, reject) => {
  setTimeout(() => resolve('finished'), 100)
})
```

The executor function runs immediately. `resolve` and `reject` settle the promise; they do not return the future value to the surrounding synchronous code.

### Consuming a Promise

`then` receives the fulfillment value. `catch` receives a rejection. `finally` runs on either outcome and does not receive the value:

```js
result
  .then((value) => console.log(value))
  .catch((error) => console.error(error))
  .finally(() => console.log('cleanup'))
```

The callback is scheduled after the current synchronous code:

```js
console.log('A')
Promise.resolve('B').then(console.log)
console.log('C')
// A, C, B
```

This is why a Promise does not block the whole program.

### Chaining passes returned values

Every `then` returns a new Promise. If its callback returns a plain value, the next `then` receives that value. If it returns a Promise, the chain waits for it. If it throws, the chain becomes rejected and the next `catch` can handle it:

```js
function getUser(id) {
  return Promise.resolve({ id, name: 'User ' + id })
}

getUser(1)
  .then((user) => getUser(user.id + 1))
  .then((nextUser) => console.log(nextUser.name))
  .catch((error) => console.error(error))
```

Return the next operation from a `then`. Omitting `return` starts an unrelated operation and passes `undefined` to the next step.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Forgetting `return` in a `then` | Copy-paste | Return the next operation |
| Treating a promise as the value | Confusing timing | Use `then`, `await`, or `catch` |
| Reading the result after the executor | Forgetting it is async | Consume the promise |
| Assuming a settled promise can change | Over-generalizing | A settled promise stays settled |
| Using `.finally` for the value | Habit | `finally` receives nothing |

## The TypeScript layer

### Promise<T> describes the fulfilled value

TypeScript describes the fulfilled value with `Promise<T>`:

```ts
type User = { id: number; name: string }

function getUser(id: number): Promise<User> {
  return Promise.resolve({ id, name: 'User ' + id })
}
```

The rejection type is not encoded by `Promise<T>`; JavaScript can reject with any value. Narrow caught values as `unknown` in TypeScript.

### What TypeScript cannot decide

TypeScript cannot decide when a promise settles, whether the executor calls `resolve` or `reject`, or what value JavaScript actually rejects with. The `Promise<T>` type describes fulfillment; the runtime timing and the rejection's real shape need tests.

### One compiler error, walked through

Open `31_day_promises_i/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const counter: Promise<number> = new Promise((resolve) => resolve('3'))
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

Read it as: *"`Promise<number>` promises the fulfilled value will be a number, so `resolve('3')` cannot hand it a string — a string stays a string, even when the number is written as text."* The fix is to resolve the promised type:

```ts
const counter: Promise<number> = new Promise((resolve) => resolve(3))
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A Promise is one future outcome — pending, then fulfilled with a value or rejected with a reason — consumed with `then`/`catch`/`finally`, chained by returning the next operation, and typed as `Promise<T>` for the value it will fulfill with.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What runs immediately when `new Promise` is constructed?
2. What does a `then` callback receive?
3. What does the next `then` receive when a callback forgets `return`?
4. Why does an async operation not freeze the whole program?
5. Why can a settled promise not change outcome?
6. Run `npm.cmd run day31:js` and `npm.cmd run day31`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write `delay(ms)` that resolves after `ms` milliseconds.
2. Chain `getUser` to get a user's next lesson.
3. Create a rejecting Promise and handle it with `catch`.
4. Type every resolved value and narrow caught errors.

### Level 3 — Creative synthesis

1. The always-finally: write a promise that resolves, one that rejects, and a shared `finally` cleanup that runs for both, with a comment on what `finally` receives.
2. The string-to-number: write `getCounter(): Promise<number>` whose executor still works after the type mismatch in the walkthrough is fixed, and comment on why the runtime value must match the promised type.
3. The forgotten return: write a chain where a `then` omits `return`, log what the next step receives, and comment on why the chain still compiles in TypeScript.
4. The settle-once: write an executor that calls `resolve` twice and log the outcome, with a comment on why only the first settlement wins.

## Finish line

Day 31 is complete when you can do all of these **without notes**:

1. Create a Promise with an executor and settle it with `resolve` or `reject`.
2. Consume a Promise with `then`, `catch`, and `finally`.
3. Chain steps by returning the next operation from a `then`.
4. Write `delay(ms)` that resolves after `ms` milliseconds.
5. Type fulfilled values with `Promise<T>` and narrow caught values as `unknown`.

If any answer is a guess, revisit the matching section before Day 32.

## Prove it

Write, in your own words, a short answer to each:

1. What runs immediately when `new Promise` is constructed?
2. What does a `then` callback receive?
3. What does the next `then` receive when a callback forgets `return`?
4. Why does an async operation not freeze the whole program?
5. Why does `resolve('3')` fail against `Promise<number>`, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 32: Coordinating Promises — Waiting for Many Results](../32_day_promises_ii/32_day_promises_ii.md).

**Day 31 complete.** One future result is now a settled promise — consumed with `then`/`catch`/`finally`, chained by returning the next operation, and typed as `Promise<T>` for the value it will fulfill with.