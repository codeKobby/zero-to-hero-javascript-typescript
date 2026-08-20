# Day 33: Async and Await — Promise Syntax That Reads Sequentially

[Day 32 <<](../32_day_promises_ii/32_day_promises_ii.md) | [Day 34 >>](../34_day_fetch_api/34_day_fetch_api.md)



## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [An async function always returns a Promise](#an-async-function-always-returns-a-promise)
  - [await unwraps one Promise at a time](#await-unwraps-one-promise-at-a-time)
  - [Handle failures around the operation that can fail](#handle-failures-around-the-operation-that-can-fail)
  - [Sequential and parallel are different decisions](#sequential-and-parallel-are-different-decisions)
  - [Async loops need an intentional policy](#async-loops-need-an-intentional-policy)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Annotate the resolved return type](#annotate-the-resolved-return-type)
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

Chained `then`s express one future result; real code reads top to bottom. `async`/`await` is the same Promise machinery written sequentially, so a function that fetches, transforms, and renders reads like the steps it takes. Day 34 uses `await` for every fetch.

## Prerequisites

- Day 31: Promises and `then`/`catch`/`finally`.
- Day 32: `Promise.all` and tuple typing.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write an `async` function that returns a plain value and know its real return type;
- unwrap a Promise with `await` inside an async function;
- handle failure with `try`/`catch` around the awaited operation;
- convert a Promise chain to `async`/`await`;
- start independent operations in parallel inside an async function;
- choose an intentional policy for async loops;
- run this course's Day 33 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what an async function returns even when it returns a plain value;
- whether `await` blocks unrelated code;
- when two awaits should be sequential;
- why `Promise.all` still matters inside async functions.

## The problem this solves

```js
async function loadUser() {
  const user = await getUser()
  return user.name
}
```

The chain's structure disappears; the steps read in the order they run.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **An async function always returns a Promise** | The lesson explains an async function always returns a promise through runnable examples and practice. |
| **await unwraps one Promise at a time** | The lesson explains await unwraps one promise at a time through runnable examples and practice. |
| **Handle failures around the operation that can fail** | The lesson explains handle failures around the operation that can fail through runnable examples and practice. |
| **Sequential and parallel are different decisions** | The lesson explains sequential and parallel are different decisions through runnable examples and practice. |
| **Async loops need an intentional policy** | The lesson explains async loops need an intentional policy through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [An async function always returns a Promise](#an-async-function-always-returns-a-promise)
- [await unwraps one Promise at a time](#await-unwraps-one-promise-at-a-time)
- [Handle failures around the operation that can fail](#handle-failures-around-the-operation-that-can-fail)
- [Sequential and parallel are different decisions](#sequential-and-parallel-are-different-decisions)
- [Async loops need an intentional policy](#async-loops-need-an-intentional-policy)

## JS runtime deep dive

### An async function always returns a Promise

An async function always returns a Promise. A return value becomes fulfillment; a thrown error becomes rejection:

```js
async function greet() {
  return 'Hello'
}

greet().then(console.log)
```

`await` unwraps a Promise inside an async function. It pauses that function's continuation, not the browser or the whole program.

The function still returns a `Promise<string>`, not a string.

[MDN's async function reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) documents the wrapping rule — how a returned value becomes fulfillment and a thrown error becomes rejection.

### await unwraps one Promise at a time

```js
async function loadUser() {
  const user = await getUser()
  return user.name
}
```

Each `await` pauses this function's continuation until the awaited promise settles, then resumes with its fulfilled value. Other functions and events keep running.

[MDN's `await` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) explains the unwrapping and what happens when you `await` a value that is not a Promise.

### Handle failures around the operation that can fail

```js
async function readProfile() {
  try {
    const profile = await getProfile()
    return profile
  } catch (error) {
    console.error('Profile unavailable')
    return null
  }
}
```

The catch turns a rejection into a normal return, so the caller no longer needs its own try/catch for this path. In TypeScript, catch values are `unknown`; narrow before reading `message`.

The `try`/`catch` mechanics are covered in [MDN's error handling guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) — including what a rejected `await` does inside the `try` block.

### Sequential and parallel are different decisions

Use sequential awaits when the second operation needs the first result:

```js
const user = await getUser()
const posts = await getPosts(user.id)
```

Start independent operations before awaiting them together:

```js
const userPromise = getUser()
const settingsPromise = getSettings()
const [user, settings] = await Promise.all([userPromise, settingsPromise])
```

Do not write independent awaits one after another and call it parallel.

### Async loops need an intentional policy

`for...of` with `await` is sequential and preserves order. `map` plus `Promise.all` is concurrent and waits for every mapped operation. Choose based on rate limits, ordering, and dependencies.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Forgetting `await` | Reading like sync code | Await, or read the actual type |
| Awaiting unrelated operations in sequence | Calling it parallel | `Promise.all` for independent work |
| Returning a Promise from `async` by accident | Double wrapping | Return the value; async wraps it |
| Putting try/catch around the wrong scope | Copy-paste | Wrap the awaited operation that can fail |
| Using sequential awaits in a loop | Performance habit | Choose `for...of` or `Promise.all` by policy |

## The TypeScript layer

### Annotate the resolved return type

Annotate the resolved return type:

```ts
async function getUser(id: number): Promise<{ id: number; name: string }> {
  return { id, name: 'User ' + id }
}
```

Do not assert response JSON is a type without runtime validation. Day 34 adds that boundary around `fetch`.

### What TypeScript cannot decide

TypeScript cannot decide when an awaited promise settles, whether the rejection happens before or after another call, or whether a caught value is really an `Error`. It types the resolved value and the async function's `Promise<T>` wrapper; the timing and the rejection's shape need tests.

### One compiler error, walked through

Open `33_day_async_await/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
async function loadName() {
  const user = loadUser(1)
  return user.name
}
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'name' does not exist on type 'Promise<User>'.
```

Read it as: *"`loadUser` returns a Promise, and a Promise has no `name` — reading `.name` without `await` looks at the future result before it has been unwrapped."* The fix is to await the call:

```ts
async function loadName() {
  const user = await loadUser(1)
  return user.name
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

`async`/`await` is Promise syntax that reads sequentially — an async function always returns a `Promise<T>`, each `await` unwraps one promise, and independent operations still need `Promise.all` to run in parallel.

## Learn more on MDN

Async/await wraps the Promise machinery you met yesterday. Bookmark these pages and return as you grow:

- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) — the declaration and its Promise-wrapping rule
- [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) — unwrapping one promise at a time
- [async function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function) — `const load = async () => ...`
- [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) — the statement that turns a rejection into a handled path
- [Control flow and error handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling) — the guide to try/catch around awaited work
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — the machinery async/await sits on top of
- [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) — the combinator for parallel work inside async functions
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) — the loop that preserves order with `await`
- [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) — awaiting each item of an async iterable

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — annotating the resolved return type of an async function
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — treating caught values as `unknown` before reading properties

## Read the first example line by line

The first runnable example introduces **Async and Await — Promise Syntax That Reads Sequentially**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `async function loadUser() {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 2 | `  const user = await getUser()` | Declaration or assignment: the runtime creates or updates a named value. |
| 3 | `  return user.name` | Return statement: the function sends a result back to its caller. |
| 4 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Async and Await — Promise Syntax That Reads Sequentially**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Async and Await — Promise Syntax That Reads Sequentially**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What does an async function return even when it returns a plain value?
2. Does `await` block unrelated code?
3. When should two awaits be sequential?
4. Why does `Promise.all` still matter inside async functions?
5. Run `npm.cmd run day33:js` and `npm.cmd run day33`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2637 Promise Time Limit — https://leetcode.com/problems/promise-time-limit/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Convert a Promise chain to `async`/`await`.
2. Write `safeLoad` that returns a value or `null` on failure.
3. Compare sequential and parallel local operations.
4. Type the functions and narrow caught errors.
5. **MDN lookup:** Open the [await reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await), find the note about awaiting non-Promise values, and write an async function that `await`s a plain string before returning it. Comment on what `await` returns when the value is already a string.

### Level 3 — Creative synthesis

1. The safe-load generic: write `safeLoad<T>(operation: Promise<T>): Promise<T | null>` and comment on what the return type promises the caller.
2. The sequential-because: log two dependent operations and comment on why they cannot run in parallel.
3. The parallel-map: map an array of ids to `loadUser` calls, run them with `Promise.all`, and comment on the order the results arrive in.
4. The double-wrap: write an async function that `return await`s a Promise and one that `return`s it directly, and comment on whether the outcomes differ.

## Finish line

Day 33 is complete when you can do all of these **without notes**:

1. Write an `async` function and know its real return type.
2. Unwrap a Promise with `await`.
3. Handle failure with `try`/`catch` around the awaited operation.
4. Convert a Promise chain to `async`/`await`.
5. Start independent operations in parallel with `Promise.all`.
6. Choose an intentional policy for async loops.

If any answer is a guess, revisit the matching section before Day 34.

## Prove it

Write, in your own words, a short answer to each:

1. What does an async function return even when it returns a plain value?
2. Does `await` block unrelated code?
3. When should two awaits be sequential?
4. Why does `Promise.all` still matter inside async functions?
5. Why does `user.name` fail against `Promise<User>`, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 34: Fetch — Talking to a Server](../34_day_fetch_api/34_day_fetch_api.md).

**Day 33 complete.** Async and await is now Promise syntax that reads sequentially — an async function always returns a `Promise<T>`, each `await` unwraps one promise, and independent operations still need `Promise.all` to run in parallel.