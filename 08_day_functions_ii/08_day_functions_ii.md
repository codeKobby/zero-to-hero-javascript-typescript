# Day 8: Functions II — Function Values, Callbacks, and Closures

[Day 7 <<](../07_day_functions_i/07_day_functions_i.md) | [Day 9 >>](../09_day_objects/09_day_objects.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [A function can be a value](#a-function-can-be-a-value)
  - [What is a callback?](#what-is-a-callback)
  - [The common callback mistake](#the-common-callback-mistake)
  - [Callbacks can receive data](#callbacks-can-receive-data)
  - [Returning a function](#returning-a-function)
  - [Closures: a function remembers its surrounding variables](#closures-a-function-remembers-its-surrounding-variables)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Callback contracts](#callback-contracts)
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

Day 7 taught you that a function is a recipe you call. But there is a deeper fact that unlocks a huge part of JavaScript: **a function is also a value.** You can store it in a variable, pass it into another function, and return it from a function. Once that is true, functions stop being just commands you run and become *data you hand around* — and that one idea is the engine behind array methods (`map`, `filter`, `reduce`), event handlers (`onClick`), and most of the architecture you will see in real codebases.

This lesson teaches the two big ideas built on that fact: **callbacks** (a function you give to another function so it can call it later) and **closures** (a function that keeps access to the variables of the place where it was created). Both have a signature silent bug: passing `doThing()` when you meant `doThing`. By the end you will trace exactly when each function runs and what each function remembers.

## Prerequisites

- Day 7: function declarations, arrow functions, parameters, `return`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- pass a function as a callback and trace when it is called;
- write an arrow-function callback inline;
- return a function from a function;
- use a closure to keep private state across calls;
- type a callback in TypeScript;
- run this course's Day 8 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the difference between a function value and calling it;
- who decides what arguments a callback receives;
- why `runTask(washDishes)` is right and `runTask(washDishes())` is wrong;
- what a closure remembers, and why two counters do not share one count;
- which callback mistakes TypeScript can catch.

## The problem this solves

Here is code that runs and, at the exact moment it should call your work, calls nothing — silently:

```js
function runTask(task) {
  console.log('Starting task')
  const result = task()      // intended: call the function
  console.log('Task result: ' + result)
}

runTask(washDishes())        // bug: called already, string passed in
```

`runTask(washDishes())` does not pass the recipe — it *runs* `washDishes` first and passes its returned string. Inside `runTask`, `task()` then tries to call a string, and the program crashes with `task is not a function`. The bug is invisible at the call site because the line *looks* right.

The same invisible mistake hides behind the other big idea: a closure that does not close over what you think it does. This lesson makes both mistakes visible by giving you a precise runtime model of function values.

## JS runtime deep dive

### A function can be a value

From Day 7:

```js
function sayHello() {
  return 'Hello!'
}

console.log(sayHello()) // Call it now. Prints Hello!
```

The parentheses call the function. Without parentheses, you have the function value itself:

```js
const greetingFunction = sayHello

console.log(greetingFunction()) // greetingFunction now calls the same function
```

Not magic — both names refer to the same recipe:

| Code | Meaning |
| --- | --- |
| `sayHello` | the function value |
| `sayHello()` | call the function and get its return value |
| `const copy = sayHello` | store the function in `copy` |
| `copy()` | call that stored function |

### What is a callback?

A **callback** is a function you give to another function so that the other function can call it later:

```js
function runTask(task) {
  console.log('Starting task')
  const result = task()
  console.log('Task result: ' + result)
}

function washDishes() {
  return 'Dishes are clean'
}

runTask(washDishes)
```

Read the final line carefully:

- `runTask` is called now.
- `washDishes` is passed in as a *value*; it is **not** called on that line.
- Inside `runTask`, `task()` calls `washDishes`.

Trace it:

| Step | What happens |
| --- | --- |
| 1 | `runTask` receives the `washDishes` function in its `task` parameter. |
| 2 | `runTask` prints `Starting task`. |
| 3 | `task()` calls `washDishes`. |
| 4 | `washDishes` returns `Dishes are clean`. |
| 5 | `result` receives that returned text. |
| 6 | `runTask` prints the result. |

Output:

```text
Starting task
Task result: Dishes are clean
```

### The common callback mistake

This calls `washDishes` immediately and passes its *returned string*, not a function:

```js
// runTask(washDishes())
// Wrong: runTask expects a function, but washDishes() produces a string.
```

The rule: **no parentheses when passing a callback; parentheses at the point where the callback should run.**

### Callbacks can receive data

The function doing the calling decides what arguments the callback receives:

```js
function applyToNumber(number, operation) {
  return operation(number)
}

function double(number) {
  return number * 2
}

const answer = applyToNumber(5, double)
console.log(answer) // 10
```

```text
applyToNumber(5, double)
       |         |
       v         v
    number    operation
      5       double function
                  |
                  v
            operation(number)
            double(5) -> 10
```

An arrow function is often convenient for a small callback:

```js
const answer = applyToNumber(5, number => number * 2)
console.log(answer) // 10
```

The arrow still has a parameter, does work, and returns a value. It is not a special kind of magic.

### Returning a function

A function can also create and return another function:

```js
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier
  }
}

const double = makeMultiplier(2)
console.log(double(6)) // 12
```

`makeMultiplier(2)` returns a function. `double` stores that returned function. Later, `double(6)` calls it.

### Closures: a function remembers its surrounding variables

The returned function above still has access to `multiplier` even after `makeMultiplier` has finished running. That is a **closure** — a function plus the variables from the scope where it was created.

```js
function createCounter() {
  let count = 0

  return function() {
    count = count + 1
    return count
  }
}

const nextCount = createCounter()

console.log(nextCount()) // 1
console.log(nextCount()) // 2
console.log(nextCount()) // 3
```

Each call to `createCounter` creates its own separate `count`:

```js
const firstCounter = createCounter()
const secondCounter = createCounter()

console.log(firstCounter())  // 1
console.log(firstCounter())  // 2
console.log(secondCounter()) // 1
```

Closure does **not** mean the variable is global. It means the returned function keeps access to the variables from the *specific call* that created it. This is how a function carries private state: the count is unreachable from outside, yet preserved between calls.

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| Passing `doThing()` when a callback is expected | The function runs too early; a result is passed | Pass `doThing`; let the receiver call it |
| Forgetting to call the callback inside the receiver | Nothing happens; no result | Use `callback()` or `callback(value)` at the intended moment |
| Forgetting `return` in a callback | The result is `undefined` | Return the result explicitly when using braces |
| Assuming two counters share one count | Two closures over two separate variables | Each `createCounter()` call creates its own closed-over count |
| An arrow callback with braces but no `return` | Same `undefined` result | Add `return` once you add braces |

## The TypeScript layer

### Callback contracts

```js
function applyToNumber(number, operation) {
  return operation(number)
}
```

JavaScript will try to call `operation` at runtime. If somebody passes a string instead of a function, the error happens *while the program runs*.

```ts
type NumberOperation = (number: number) => number

function applyToNumber(number: number, operation: NumberOperation): number {
  return operation(number)
}

const doubled = applyToNumber(5, number => number * 2)
```

`NumberOperation` says:

> This callback receives one number and must return one number.

TypeScript then checks every argument:

```ts
// applyToNumber(5, 'double')
// Error: a string is not a NumberOperation.

// applyToNumber(5, text => text.toUpperCase())
// Error: text is a number, so string methods are unavailable.
```

| Question | JavaScript | TypeScript |
| --- | --- | --- |
| Can a function be passed as a value? | Yes | Yes |
| Can it check the callback receives and returns numbers? | Only at runtime | Before running |
| Can it guarantee a callback's algorithm is correct? | No | No |

### What TypeScript cannot decide

TypeScript checks the *shape* of the callback — what it receives and returns. It cannot tell whether doubling was the correct business decision, whether a closure creates too many counters, or whether the callback is called at the right moment:

```ts
function applyToNumber(number: number, operation: NumberOperation): number {
  return operation(number) // is this the right operation? TypeScript cannot say
}
```

The timing and the meaning are yours. TypeScript prevents *invalid shapes*; you decide *correct behavior*.

### One compiler error, walked through

Open `08_day_functions_ii/starter/ts/main.ts`. The starter defines `applyToNumber` with a `NumberOperation` callback type. The last line is commented out and deliberately broken:

```ts
applyToNumber(5, 'double')
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Argument of type 'string' is not assignable to parameter of type 'NumberOperation'.
```

Read it as: *"`applyToNumber` promised to receive a function that takes a number and returns a number — `'double'` is a string."* The fix is not to loosen the type so strings fit; the fix is that the *argument* was wrong. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A function is a value you can store, pass, and return: pass it *without* parentheses as a callback, call it *with* parentheses at the right time, and a closure keeps the variables of its creation scope alive for as long as the function itself lives.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `function sayHi() { return 'Hi' }` — what does `const f = sayHi; f()` produce? What would `sayHi` alone produce?
2. `runTask(washDishes)` vs `runTask(washDishes())` — which passes a function, and which calls it early?
3. `applyToNumber(5, n => n * 3)` — what does it produce?
4. `applyToNumber(5, n => n * n)` — what does it produce?
5. `applyToNumber(5, n => 'n: ' + n)` — what does it produce, and what shape does the callback have?
6. `const double = makeMultiplier(2)` then `double(6)` — what is stored in `double`, and what does the call produce?
7. Two counters from `createCounter()`: what are the outputs of `firstCounter()`, `firstCounter()`, `secondCounter()`?
8. What would `const b = makeMultiplier(3); b(4)` produce?
9. For `runTask(task)` where `task` is a no-return function: what does `task()` put in `result`?
10. Run `npm.cmd run day8:js` and `npm.cmd run day8`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write `runTwice(action)` that calls `action` two times. Test with a function that prints `'ping'`.
2. Write `applyToNumber(number, operation)` and call it with a square callback. Confirm `applyToNumber(4, n => n * n) === 16`.
3. Write `makeAdder(amount)` that returns a function adding `amount` to its argument. Test `const addFive = makeAdder(5); addFive(10)` → 15.
4. Write `createGreeting(greeting)` that returns a function receiving a `name`. Test `createGreeting('Welcome')('Ada')` → `'Welcome, Ada!'`.
5. Predict then verify the output of two independent counters from one `createCounter`.
6. Write `calculateTotal(price, applyDiscount)` where `applyDiscount` is a callback that receives `price` and returns the new price.

### Level 3 — Creative synthesis

1. A score keeper: build `createScoreKeeper()` that returns an object with `add(points)` and `getScore()` methods, both closed over a private `score`. (Objects arrive in Day 9 — return `{ add, getScore }`.)
2. An operation pipeline: write `chain(value, op1, op2)` that runs `op1(value)` then `op2` on the result. Test `chain(5, n => n * 2, n => n + 1)` → 11.
3. The private-state argument: write `createBankAccount(balance)` returning `deposit(amount)` and `withdraw(amount)` that each return the new balance, and in a comment explain why the balance cannot be read directly from outside — using the closure model.
4. The counter factory: write `createCounter(start)` that lets you choose the starting value, and explain in a comment why each call gets its own independent count.
5. The timing story: write `runTask` and call it with a callback *without* parentheses, then in a comment rewrite the line the wrong way and explain exactly what breaks and why.

## Finish line

Day 8 is complete when you can do all of these **without notes**:

1. Distinguish a function from the result of calling it.
2. Pass a function as a callback and trace when it is called.
3. Write a callback that receives an argument and returns a result.
4. Explain a closure as a function that keeps access to its surrounding variables.
5. Explain why two counters do not share one count.
6. Describe which callback mistakes TypeScript can catch.

If any answer is a guess, revisit the matching section before Day 9.

## Prove it

Write, in your own words, a short answer to each:

1. What is the difference between `save` and `save()`?
2. In `runTask(washDishes)`, which function runs first and which runs later?
3. Which function decides what argument a callback receives?
4. What variable does `nextCount` remember, and why does a second counter not share it?
5. What does `applyToNumber(5, 'double')` do in JavaScript, and why does TypeScript reject it?
6. What can TypeScript check about a callback, and what can it never decide?

Your answers are today's evidence. If you can write them, move to [Day 9: Objects — Related Data and Methods](../09_day_objects/09_day_objects.md).

**Day 8 complete.** Functions as values are now exact: you can pass them, call them at the right moment, build closures with private state, and let TypeScript check the shape of every callback contract.