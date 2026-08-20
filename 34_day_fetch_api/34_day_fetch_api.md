# Day 34: Fetch — Talking to a Server

[← Previous lesson](../33_day_async_await/33_day_async_await.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../35_day_api_integration/35_day_api_integration.md)



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
  - [fetch resolves with a Response, not data](#fetch-resolves-with-a-response-not-data)
  - [Check response.ok before trusting the body](#check-responseok-before-trusting-the-body)
  - [Request methods and bodies](#request-methods-and-bodies)
  - [response.json is also asynchronous](#responsejson-is-also-asynchronous)
  - [AbortController cancels an in-flight fetch](#abortcontroller-cancels-an-in-flight-fetch)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [A runtime boundary replaces the assertion](#a-runtime-boundary-replaces-the-assertion)
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

Your app finally talks to a real service. `fetch` is the browser's and Node's HTTP client, but its contract surprises beginners: it resolves for 404s, its body arrives asynchronously, and its JSON must never be trusted just because TypeScript believes an assertion. Day 34 builds the boundary Day 35's data layer lives behind.

## Prerequisites

- Day 33: `async`/`await`.
- Day 22: the runtime guard pattern for parsed data.
- Day 31-32: Promises, `Promise.all`, and coordination.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- send a GET with `fetch` and inspect the `Response`;
- check `response.ok` and throw on HTTP failures;
- read the body with the async `response.json()`;
- send a JSON request body with `method`, `Content-Type`, and `JSON.stringify`;
- cancel an in-flight fetch with `AbortController`;
- validate a response shape with a type guard instead of an assertion;
- run this course's Day 34 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- which HTTP statuses cause `fetch` to reject automatically;
- why `response.ok` must be checked;
- why `response.json` is awaited;
- why a TypeScript assertion does not validate network data.

## The problem this solves

```js
const response = await fetch('/api/users')
if (!response.ok) {
  throw new Error('HTTP ' + response.status)
}
const body = await response.json()
```

The server's answer has two separate concerns: did the request succeed at the HTTP level, and what did the body actually contain?

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **fetch resolves with a Response, not data** | The lesson explains fetch resolves with a response, not data through runnable examples and practice. |
| **Check response.ok before trusting the body** | The lesson explains check response.ok before trusting the body through runnable examples and practice. |
| **Request methods and bodies** | The lesson explains request methods and bodies through runnable examples and practice. |
| **response.json is also asynchronous** | The lesson explains response.json is also asynchronous through runnable examples and practice. |
| **AbortController cancels an in-flight fetch** | The lesson explains abortcontroller cancels an in-flight fetch through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [fetch resolves with a Response, not data](#fetch-resolves-with-a-response-not-data)
- [Check response.ok before trusting the body](#check-responseok-before-trusting-the-body)
- [Request methods and bodies](#request-methods-and-bodies)
- [response.json is also asynchronous](#responsejson-is-also-asynchronous)
- [AbortController cancels an in-flight fetch](#abortcontroller-cancels-an-in-flight-fetch)

## JS runtime deep dive

### fetch resolves with a Response, not data

`fetch` starts an HTTP request and resolves with a `Response`. It rejects for a network-level failure, but a 404 or 500 still resolves. Always check `response.ok` before trusting a successful body.

### Check response.ok before trusting the body

```js
const response = await fetch('/api/users')
if (!response.ok) {
  throw new Error('HTTP ' + response.status)
}
const body = await response.json()
```

A 404 still gives you a `Response`; only the network error rejects. `ok` is true for statuses 200-299.

[MDN's `Response.ok` reference](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) documents the 200-299 rule and how `ok` relates to `status`.

### Request methods and bodies

GET reads. POST creates. PUT or PATCH updates. DELETE removes. A JSON request body needs a content type and `JSON.stringify`:

```js
await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Practice' })
})
```

The body must be a string; `JSON.stringify` produces one.

The full option set — `method`, `headers`, and `body` — is documented in [MDN's Using the Fetch API guide](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

### response.json is also asynchronous

`response.json` is also asynchronous. The body is not available until it is awaited:

```js
const body = await response.json()
```

Do not put secrets in browser source. Authentication, CORS, rate limits, retries, and server validation are application concerns, not details to hand-wave away.

### AbortController cancels an in-flight fetch

```js
const controller = new AbortController()
const timer = setTimeout(() => controller.abort(), 5000)
try {
  const response = await fetch('/api/users', { signal: controller.signal })
  // ...
} finally {
  clearTimeout(timer)
}
```

The abort is cooperative: the fetch receives the signal and stops listening for the response. The abort surfaces as an `AbortError` the caller can catch.

Signals and their states are documented on [MDN's `AbortController` reference](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — including how to reuse or compose them.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Reading `response.json()` before checking `ok` | Assuming success | Throw on `!response.ok` first |
| Forgetting to await `response.json()` | Reading it as sync | Await the body read |
| Passing an object as `body` | Habit | `JSON.stringify` the body |
| Sending JSON without `Content-Type` | Copy-paste | Set `application/json` |
| Believing `as User[]` validates | Trusting the compiler | Guard at the runtime boundary |

## The TypeScript layer

### A runtime boundary replaces the assertion

This is not validation:

```ts
const users = await response.json() as User[]
```

The assertion changes only the compiler's belief. Parse as `unknown` and use a guard before using fields. Day 22's guard pattern applies here:

```ts
function isUser(value: unknown): value is User {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string'
}
```

### What TypeScript cannot decide

TypeScript cannot decide what the server actually sends — a 404 body, extra fields, missing fields, or a totally different shape all look fine to the compiler. It also cannot decide when a network error happens. The runtime guard is the only boundary; `as` only edits the compiler's belief.

### One compiler error, walked through

Open `34_day_fetch_api/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
await fetch(localDataUrl, {
  method: 'POST',
  body: { title: 'Practice' }
})
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Argument of type '{ title: string; }' is not assignable to parameter of type 'BodyInit | null | undefined'.
```

Read it as: *"`fetch` ships bytes over HTTP, so `body` must be a string or a stream — handing it a plain object asks the transport to send something it cannot serialize."* The fix is to stringify the body:

```ts
await fetch(localDataUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Practice' })
})
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

`fetch` is one Promise for an HTTP round trip — it resolves with a `Response` even for 404s, requires `response.ok` to be checked and the body to be awaited, sends string bodies, and its parsed JSON must be guarded at the runtime boundary, never trusted through an assertion.

## Learn more on MDN

`fetch` is the browser's HTTP client with a precise contract. Bookmark these pages and return as you grow:

- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) — the guide to requests and responses
- [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch) — the global function that starts a request
- [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) — what `fetch` resolves with
- [Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok) — true for statuses 200-299
- [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) — reading the body as JSON, asynchronously
- [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) — the options behind a fetch call
- [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) — request and response headers
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) — cancelling an in-flight fetch
- [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) — the signal and its `aborted` state
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) — the codes behind `response.status`

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — `unknown`, objects, and reading response shapes
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — `value is User` type guards at the runtime boundary

## Read the first example line by line

The first runnable example introduces **Fetch — Talking to a Server**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const response = await fetch('/api/users')` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `if (!response.ok) {` | Control-flow statement: the runtime decides whether or how this block runs. |
| 3 | `  throw new Error('HTTP ' + response.status)` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 4 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |
| 5 | `const body = await response.json()` | Declaration or assignment: the runtime creates or updates a named value. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Fetch — Talking to a Server**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Fetch — Talking to a Server**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Which HTTP statuses cause `fetch` to reject automatically?
2. Why must `response.ok` be checked?
3. Why is `response.json` awaited?
4. Why does a TypeScript assertion not validate network data?
5. Run `npm.cmd run day34:js` and `npm.cmd run day34`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2715 Timeout Cancellation — https://leetcode.com/problems/timeout-cancellation/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Write `getJson(url)` that checks `response.ok` and returns parsed `unknown` data.
2. Add a timeout with `AbortController`.
3. POST a JSON body to a server you control and inspect the response status.
4. Type a guard for the response shape instead of asserting it.
5. **MDN lookup:** Open the [Response.json() reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/json), find what happens when the body is empty or invalid JSON, and write a `getJson` variant that catches that failure. Comment on why `response.json` is awaited and can itself reject.

### Level 3 — Creative synthesis

1. The one-boundary getter: write `getUsers(): Promise<User[]>` that uses `getJson` plus the `isUser` guard and throws a readable error when the shape is wrong.
2. The abort-comments: wrap a slow fetch in a timeout, and comment on exactly when the fetch stops and what the caller sees.
3. The methods gallery: send GET, POST, PUT, and DELETE to endpoints you control, and comment on when each is correct.
4. The assertion trap: write the `as User[]` version and the guarded version side by side, and comment on what a malformed server response does to each.

## Finish line

Day 34 is complete when you can do all of these **without notes**:

1. Send a GET with `fetch` and inspect the `Response`.
2. Check `response.ok` and throw on HTTP failures.
3. Read the body with the async `response.json()`.
4. Send a JSON request body with `method`, `Content-Type`, and `JSON.stringify`.
5. Cancel an in-flight fetch with `AbortController`.
6. Validate a response shape with a type guard instead of an assertion.

If any answer is a guess, revisit the matching section before Day 35.

## Prove it

Write, in your own words, a short answer to each:

1. Which HTTP statuses cause `fetch` to reject automatically?
2. Why must `response.ok` be checked?
3. Why is `response.json` awaited?
4. Why does a TypeScript assertion not validate network data?
5. Why does `body: { title: 'Practice' }` fail against `BodyInit | null | undefined`, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 35: API Integration — One Boundary Owns HTTP Details](../35_day_api_integration/35_day_api_integration.md).

**Day 34 complete.** Fetch is now a single Promise for an HTTP round trip — `response.ok` checked, body awaited, string bodies, and parsed JSON guarded at the runtime boundary rather than trusted through an assertion.