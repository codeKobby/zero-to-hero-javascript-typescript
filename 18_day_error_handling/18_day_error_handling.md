# Day 18: Errors and Recovery — Failing on Purpose

[Day 17 <<](../17_day_regex/17_day_regex.md) | [Day 19 >>](../19_day_classes_i/19_day_classes_i.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Errors are values that interrupt normal flow](#errors-are-values-that-interrupt-normal-flow)
  - [The try, catch, finally flow](#the-try-catch-finally-flow)
  - [Return a failure value when the caller can continue](#return-a-failure-value-when-the-caller-can-continue)
  - [Throw when a function cannot honor its contract](#throw-when-a-function-cannot-honor-its-contract)
  - [Error messages need context, not secrets](#error-messages-need-context-not-secrets)
  - [Parsing JSON is not validation](#parsing-json-is-not-validation)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Caught errors are unknown](#caught-errors-are-unknown)
  - [Model a result with a discriminated union](#model-a-result-with-a-discriminated-union)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

An error means an operation could not continue normally. Bad JSON, a missing required value, or an unavailable resource can all produce one. If no code handles it, JavaScript stops the current path and looks upward for an error handler.

This lesson teaches the two recovery styles and when to use each: **return a failure value** when the caller can continue with a decision (optional user data), and **throw** when a function cannot honor its contract (a required, invalid argument). The skill is choosing the style that matches the situation — and writing error messages with context, not secrets.

## Prerequisites

- Day 7: functions and `return`.
- Day 15: `Number.isInteger`, `Number.isFinite`, validation.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- use `try`, `catch`, and `finally` with correct flow;
- return a failure value such as `{ ok: true/false }` when the caller can continue;
- throw a clear `Error` when a function cannot honor its contract;
- write error messages with context and without secrets;
- narrow a caught `unknown` error with `instanceof Error` in TypeScript;
- treat `JSON.parse` output as unknown and validate its shape;
- run this course's Day 18 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- when `finally` runs;
- why an error is not the right response to an empty optional search result;
- why a caught value is `unknown` in TypeScript;
- why `JSON.parse` checks syntax, not shape.

## The problem this solves

A settings screen lets a user paste JSON. The paste can be malformed. The app must not crash — it must read the failure and show a message:

```js
function tryParseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}

const result = tryParseJson(userText)
if (!result.ok) {
  showMessage('Please provide valid JSON.')
} else {
  saveSettings(result.value)
}
```

This avoids silently swallowing the error *and* avoids pretending malformed input is a normal successful value. The caller owns the decision.

## JS runtime deep dive

### Errors are values that interrupt normal flow

When a line throws, the rest of the current path does not run:

```js
JSON.parse('{not valid json}')
console.log('This line does not run')
```

Do not wrap `try/catch` around every line. Use it around a **known operation that can throw** and where this layer of the program has a meaningful recovery decision.

### The try, catch, finally flow

```js
try {
  const settings = JSON.parse('{"theme":"dark"}')
  console.log(settings.theme)
} catch (error) {
  console.error('Settings could not be read:', error)
} finally {
  console.log('This cleanup step always runs')
}
```

If the `try` block finishes, `catch` is skipped. If it throws, the rest of the `try` block is skipped and `catch` runs. `finally` runs **in either case** and is mainly for cleanup, not normal control flow.

JavaScript ships several error constructors for different failure kinds — [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError), [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError), and [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) among them — all documented on the [MDN Error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

### Return a failure value when the caller can continue

Parsing optional user data is a good case for a result value:

```js
function tryParseJson(text) {
  try {
    return { ok: true, value: JSON.parse(text) }
  } catch {
    return { ok: false, value: null }
  }
}
```

The caller decides what to do with the two possible outcomes. A result value keeps the failure inside the normal return type, so it cannot be forgotten.

### Throw when a function cannot honor its contract

If a function requires a valid value and cannot sensibly continue, throw a clear `Error`:

```js
function divide(total, people) {
  if (!Number.isInteger(people) || people <= 0) {
    throw new Error('people must be a positive whole number')
  }

  return total / people
}
```

The caller that owns the user interaction or request boundary decides how to present that failure. Do not use errors for ordinary branching, such as an empty optional search result.

The [MDN throw statement reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) covers what can be thrown — any value, not just `Error` instances — and why a real `Error` is still the better default because it carries a `.message` and a stack trace.

### Error messages need context, not secrets

Useful messages say **what failed** and **what rule was expected**. They must not expose passwords, tokens, personally sensitive data, or internal system details to users. Log useful technical context securely; show a short, safe message in the interface.

### Parsing JSON is not validation

`JSON.parse` checks only whether the text is valid JSON. It does not prove the result has the shape your program expects:

```js
const value = JSON.parse('{"port":"3000"}')
// This is valid JSON, but port is a string, not necessarily the number your app needs.
```

Treat parsed data as unknown first. Validate its shape before using it.

[MDN's JSON.parse reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) documents the throw path and the optional `reviver` parameter, which can transform values during parsing — a power feature worth knowing, though shape validation after parsing is still the reliable path.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Wrapping every line in try/catch | Fear of crashing | Wrap only operations that can throw with a real recovery decision |
| Swallowing the error with an empty catch | Quietly ignoring the failure | Log or surface context; return a result value |
| Using errors for ordinary branching | Overusing throw | Return a value for expected emptiness, like `null` |
| Putting secrets or user data in messages | Convenience | Log technical context securely; show safe text |
| Trusting `JSON.parse` output shape | It only checks syntax | Treat output as unknown and validate |
| Asserting `error as Error` without a check | Comfort | Use `instanceof Error` as runtime evidence |

## The TypeScript layer

### Caught errors are unknown

In TypeScript, a caught value is `unknown` because JavaScript can throw anything:

```ts
try {
  JSON.parse('{bad}')
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('An unknown value was thrown')
  }
}
```

Do not assert that an error is `Error` without checking. The `instanceof` branch is the runtime evidence and TypeScript's permission to read `message`.

### Model a result with a discriminated union

The plain `{ ok: boolean, value: ... }` object works, but TypeScript can do better with a union where the `ok` field narrows the `value` type:

```ts
type NumberResult =
  | { ok: true; value: number }
  | { ok: false; value: null }

function tryParseNumber(text: string): NumberResult {
  const trimmed = text.trim()
  const value = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(value)) {
    return { ok: false, value: null }
  }

  return { ok: true, value }
}
```

When `ok` is `true`, `value` is a `number`; otherwise it is `null`. TypeScript enforces that the caller checks `ok` before touching `value` — the discriminated union carries the recovery decision in the types.

### What TypeScript cannot decide

TypeScript cannot decide *which* failures are expected and which are bugs — that is a design choice. It cannot know that a caught value will actually be an `Error`, which is why `unknown` is the honest type. And it cannot validate JSON shapes for you; the shape checks are runtime code your tests must prove.

### One compiler error, walked through

Open `18_day_error_handling/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
try {
  JSON.parse('{bad}')
} catch (error) {
  console.log(error.message)
}
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'error' is of type 'unknown'.
```

Read it as: *"JavaScript can throw any value, so the caught value's type is unknown — narrow it before reading `message`."* The fix is the `instanceof Error` check that the starter already shows:

```ts
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Failures are either returned as values for the caller to decide on or thrown as errors when a contract is broken — caught errors are `unknown` until `instanceof Error` proves them, and JSON parsing validates syntax but never shape.

## Learn more on MDN

Errors have more constructors and flows than fit in one lesson — bookmark the pages that match the recovery styles you just practiced:

- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) — the base constructor and its `.message` and `stack` properties
- [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) — the full flow of try, catch, and finally
- [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) — what can be thrown and why a real `Error` is the default
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) — thrown when an operation receives the wrong kind of value
- [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) — thrown when a name cannot be found
- [SyntaxError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) — what `JSON.parse` throws on malformed text
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the throw path and the reviver parameter
- [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) — the runtime check that narrows a caught value

### TypeScript docs

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the `instanceof Error` check that turns `unknown` into a usable error
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — where `unknown` and union types fit in the type system

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What does `tryParseJson('{"theme":"dark"}')` return? And `tryParseJson('{bad}')`?
2. In the try/catch/finally example, when does `finally` run?
3. If `try` succeeds, does `catch` run?
4. `JSON.parse('{"port":"3000"}').port` — what type is the value, and why is that a trap?
5. In a TypeScript `catch (error)`, what is the type of `error`?
6. What does `divide(12, 0)` do?
7. Why is an empty optional search result not an error?
8. Run `npm.cmd run day18:js` and `npm.cmd run day18`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2704 To Be Or Not To Be — https://leetcode.com/problems/to-be-or-not-to-be/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Write `tryParseNumber(text)` that returns an object with `ok` and `value` fields. Reject empty and non-finite input.
2. Write `divide(total, people)` that throws when `people` is not a positive whole number.
3. Call `divide` inside `try/catch` and show a safe user-facing message (no user input repeated).
4. Write `readConfig(text)` that returns `{ ok: true, config }` for valid JSON, or `{ ok: false, reason }` otherwise — and state the `reason` in a user-safe way.
5. TypeScript: handle a caught `unknown` error with `instanceof Error` — no assertion.
6. **MDN lookup:** Open the [Error reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error), find the `name` and `stack` properties, and add a custom `ConfigError` class that you throw in `readConfig`. Catch it and log `error.name` and the stack separately from the user-facing message, then comment on why `stack` belongs in developer logs rather than visible text.

### Level 3 — Creative synthesis

1. The JSON shape guard: write `asPort(text)` that returns `{ ok: true, port: number }` only when `text` is valid JSON that parses to an object whose `port` is a finite number — otherwise `{ ok: false }`. Combine `try/catch` with shape validation.
2. The safe average: write `average(numbers)` that throws a clear error for an empty array, and a caller that shows a safe message.
3. The retry memo: write `parseWithSummary(text)` that returns a discriminated union `{ ok: true; value } | { ok: false; message: string }`, where the failure message is short and safe. Compare it with the plain `{ ok, value }` shape from the lesson.
4. The decision table: write a comment block listing, for your future self, three cases where you would return a failure value and three where you would throw.

## Finish line

Day 18 is complete when you can do all of these **without notes**:

1. Write a `try/catch/finally` and state exactly when `finally` runs.
2. Return a failure value (`{ ok: true/false }`) when the caller can continue.
3. Throw a clear `Error` when a function cannot honor its contract.
4. Write error messages with context and without secrets.
5. Narrow a caught `unknown` error with `instanceof Error` in TypeScript.
6. Treat `JSON.parse` output as unknown and validate its shape.
7. Model a result with a discriminated union.

If any answer is a guess, revisit the matching section before Day 19.

## Prove it

Write, in your own words, a short answer to each:

1. When does `finally` run?
2. Why is an error not the right response to an empty optional search result?
3. Why should `JSON.parse` output be treated as `unknown`?
4. Why must a TypeScript `catch` block narrow `error` before reading `message`?
5. What is the difference between returning `{ ok: false }` and throwing?
6. What does the type checker know that your tests must still verify about failures?

Your answers are today's evidence. If you can write them, move to [Day 19: Classes and Instances — Blueprints and Objects](../19_day_classes_i/19_day_classes_i.md).

**Day 18 complete.** Failure is now handled on purpose — returned as a value when the caller decides, thrown when a contract is broken, and never allowed to escape with secrets or unvalidated shapes.