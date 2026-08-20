# Day 32: Coordinating Promises — Waiting for Many Results

[← Previous lesson](../31_day_promises_i/31_day_promises_i.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../33_day_async_await/33_day_async_await.md)



## Start here

Read the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting the numbered exercises in this lesson, then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.

## Table of Contents

- [Start here](#start-here)

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Choose a combinator by the question you need answered](#choose-a-combinator-by-the-question-you-need-answered)
  - [Promise.all preserves input order](#promiseall-preserves-input-order)
  - [allSettled gives partial success](#allsettled-gives-partial-success)
  - [Race and any are different](#race-and-any-are-different)
  - [AbortController cancels cooperative work](#abortcontroller-cancels-cooperative-work)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Promise.all infers a tuple](#promiseall-infers-a-tuple)
  - [PromiseSettledResult is a discriminated union](#promisesettledresult-is-a-discriminated-union)
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

Day 31 gave you one future result. Real work starts several independent operations at once — a profile, a settings read, two API calls — and needs one rule for what happens when any of them fails. This lesson teaches the four coordination combinators and when each is correct.

## Prerequisites

- Day 31: Promises, `then`/`catch`/`finally`, and `Promise<T>`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- run independent operations together with `Promise.all`;
- wait for every outcome — including failures — with `Promise.allSettled`;
- build a timeout wrapper with `Promise.race` and explain why it does not cancel the loser;
- keep the first fulfillment with `Promise.any`;
- narrow `allSettled` results as a discriminated union in TypeScript;
- run this course's Day 32 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- which combinator waits for all outcomes even when one fails;
- why `Promise.all` results can be in input order even if completion order differs;
- why `Promise.race` does not cancel losing operations;
- what happens when `Promise.any` has no fulfillment.

## The problem this solves

```js
const [profile, settings] = await Promise.all([
  loadProfile(),
  loadSettings()
])
```

Starting both operations before `await` runs them in parallel; the result array keeps input order even when the slower operation finishes first.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **Choose a combinator by the question you need answered** | The lesson explains choose a combinator by the question you need answered through runnable examples and practice. |
| **Promise.all preserves input order** | The lesson explains promise.all preserves input order through runnable examples and practice. |
| **allSettled gives partial success** | The lesson explains allsettled gives partial success through runnable examples and practice. |
| **Race and any are different** | The lesson explains race and any are different through runnable examples and practice. |
| **AbortController cancels cooperative work** | The lesson explains abortcontroller cancels cooperative work through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Choose a combinator by the question you need answered](#choose-a-combinator-by-the-question-you-need-answered)
- [Promise.all preserves input order](#promiseall-preserves-input-order)
- [allSettled gives partial success](#allsettled-gives-partial-success)
- [Race and any are different](#race-and-any-are-different)
- [AbortController cancels cooperative work](#abortcontroller-cancels-cooperative-work)

## JS runtime deep dive

### Choose a combinator by the question you need answered

When several asynchronous operations are independent, start them together and choose the correct coordination rule:

| Combinator | Meaning |
| --- | --- |
| `Promise.all` | every operation must fulfill; rejects when one rejects |
| `Promise.allSettled` | wait for every outcome, including failures |
| `Promise.race` | first settlement wins, success or failure |
| `Promise.any` | first fulfillment wins; rejects only if all reject |

### Promise.all preserves input order

`Promise.all` preserves input order in its result array even when operations finish in a different order:

```js
const [profile, settings] = await Promise.all([
  loadProfile(),
  loadSettings()
])
```

This is parallel coordination, not sequential waiting. Calling `loadProfile` and `loadSettings` before `await` starts both operations.

[MDN's `Promise.all` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) documents the input-order guarantee and the fail-fast behavior — the whole result rejects on the first rejection.

### allSettled gives partial success

```js
const results = await Promise.allSettled([loadProfile(), loadSettings()])
for (const result of results) {
  if (result.status === 'fulfilled') console.log(result.value)
  else console.log('One operation failed:', result.reason)
}
```

The status check is a discriminated union at runtime and in TypeScript.

[MDN's `Promise.allSettled` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) shows the `{ status, value }` and `{ status, reason }` result shapes this loop reads.

### Race and any are different

`race` is useful for a timeout because a rejection can win:

```js
function withTimeout(operation, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms)
  })
  return Promise.race([operation, timeout])
}
```

The timeout rejects, but it does not automatically cancel the original operation. Cancellation requires an API that accepts `AbortSignal`.

`any` ignores rejected attempts until one fulfills. If every attempt rejects, it rejects with `AggregateError`.

Both combinators have dedicated pages — [the `Promise.race` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) for first settlement and [the `Promise.any` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) for first fulfillment and the `AggregateError` it can throw.

### AbortController cancels cooperative work

```js
const controller = new AbortController()
fetch('/data', { signal: controller.signal })
controller.abort()
```

`AbortController` sends a signal; the operation must support that signal. Catch `AbortError` separately when cancellation is an expected user action.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Using `Promise.all` when partial results are useful | Habit | Use `Promise.allSettled` |
| Using `Promise.race` as if it cancels losers | Over-generalizing | Only `AbortController` cancels cooperative work |
| Awaiting inside a loop instead of starting first | Forgetting to kick off | Build the array, then `await Promise.all` |
| Reading `.value` without a status check | Assuming success | Check `result.status` first |
| Confusing `race` with `any` | Similar names | `race`: first settlement; `any`: first fulfillment |

## The TypeScript layer

### Promise.all infers a tuple

TypeScript infers tuple positions from `Promise.all`:

```ts
const [user, posts] = await Promise.all([
  Promise.resolve({ id: 1, name: 'Mina' }),
  Promise.resolve(['first post'])
])
```

`user` is `{ id: number; name: string }` and `posts` is `string[]`, each from its own array position.

### PromiseSettledResult is a discriminated union

`Promise.allSettled` returns `PromiseSettledResult<T>[]`, where each element is either `{ status: 'fulfilled'; value: T }` or `{ status: 'rejected'; reason: any }`. The `status` check narrows the branch, so `result.value` is only reachable on the fulfilled arm.

### What TypeScript cannot decide

TypeScript cannot decide how long an operation takes, which promise settles first in a race, or whether a rejection is an `Error`. The combinators type the outcomes; the runtime order and the rejection's real shape need tests.

### One compiler error, walked through

Open `32_day_promises_ii/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const settled = await Promise.allSettled([delayed('ok', 5)])
console.log(settled[0].value)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'value' does not exist on type 'PromiseSettledResult<string>'.
```

Read it as: *"`allSettled` can report failure, so each result is a union of a fulfilled arm with `value` and a rejected arm without it — reading `value` before checking `status` assumes the arm that may not exist."* The fix is to narrow with a status check:

```ts
const settled = await Promise.allSettled([delayed('ok', 5)])
for (const result of settled) {
  if (result.status === 'fulfilled') console.log(result.value)
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Coordination combinators ask one question each — `all` (everything must succeed), `allSettled` (report every outcome), `race` (first settlement), `any` (first fulfillment) — with `all` preserving input order and typed as a tuple by TypeScript.

## Learn more on MDN

Each combinator has a reference page that makes its rule precise. Bookmark these and return as you grow:

- [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) — every operation must fulfill, in input order
- [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) — wait for every outcome, including failures
- [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) — first settlement wins, success or failure
- [Promise.any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any) — first fulfillment wins; rejects only if all reject
- [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) — the error `Promise.any` throws when nothing fulfills
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — the only way to cancel cooperative work
- [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) — the signal an operation listens for
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) — the timer behind the `withTimeout` wrapper

### TypeScript docs

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the `status === 'fulfilled'` check that reaches `value`
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — how `Promise.all` infers each tuple position

## Read the first example line by line

The first runnable example introduces **Coordinating Promises — Waiting for Many Results**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const [profile, settings] = await Promise.all([` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `  loadProfile(),` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 3 | `  loadSettings()` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 4 | `])` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Coordinating Promises — Waiting for Many Results**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Coordinating Promises — Waiting for Many Results**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Which combinator waits for all outcomes even when one fails?
2. Why can `Promise.all` results be in input order even if completion order differs?
3. Why does `Promise.race` not cancel losing operations?
4. What happens when `Promise.any` has no fulfillment?
5. Run `npm.cmd run day32:js` and `npm.cmd run day32`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2636 Promise Pool — https://leetcode.com/problems/promise-pool/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Run two delayed operations with `Promise.all` and inspect their ordered result.
2. Use `allSettled` to report one success and one failure.
3. Build a timeout wrapper and explain why it does not cancel the original Promise.
4. Type the result branches and narrow `AggregateError` or `Error` safely.
5. **MDN lookup:** Open the [Promise.any reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any), find what happens when every promise rejects, and catch that case to read the error's `errors` property. Comment on why `race` would reject with the first failure instead of an `AggregateError`.

### Level 3 — Creative synthesis

1. The partial dashboard: fetch two values where one always rejects, and report the successful one without the whole dashboard failing.
2. The timeout-comments: wrap an operation in `withTimeout`, and comment on exactly which promise wins and why the original still runs.
3. The race-vs-any compare: run the same two operations under `race` and under `any`, and comment on why the outcomes differ.
4. The input-order proof: start a slow and a fast promise, log the `all` result, and comment on why it is not the finish order.

## Finish line

Day 32 is complete when you can do all of these **without notes**:

1. Run independent operations together with `Promise.all`.
2. Wait for every outcome with `Promise.allSettled` and narrow the status union.
3. Build a timeout wrapper with `Promise.race` and explain why it does not cancel.
4. Keep the first fulfillment with `Promise.any`.
5. Explain the difference between `race` and `any`.

If any answer is a guess, revisit the matching section before Day 33.

## Prove it

Write, in your own words, a short answer to each:

1. Which combinator waits for all outcomes even when one fails?
2. Why can `Promise.all` results be in input order even if completion order differs?
3. Why does `Promise.race` not cancel losing operations?
4. What happens when `Promise.any` has no fulfillment?
5. Why does `settled[0].value` fail against `PromiseSettledResult<string>`, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 33: Async and Await — Promise Syntax That Reads Sequentially](../33_day_async_await/33_day_async_await.md).

**Day 32 complete.** Coordinating promises is now picking the one combinator that answers your question — `all`, `allSettled`, `race`, or `any` — and letting TypeScript narrow each outcome's shape.