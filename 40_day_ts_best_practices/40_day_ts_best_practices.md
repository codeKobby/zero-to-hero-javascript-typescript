# Day 40: TypeScript in a Maintainable Project — Safety in the Real World

[Day 39 <<](../39_day_ts_advanced_types/39_day_ts_advanced_types.md) | [Day 41 >>](../41_day_project_recipe/41_day_project_recipe.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The browser only ever sees JavaScript](#the-browser-only-ever-sees-javascript)
  - [Runtime practices that work in both languages](#runtime-practices-that-work-in-both-languages)
  - [A discriminated state switch](#a-discriminated-state-switch)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Rules that scale](#rules-that-scale)
  - [The unknown boundary](#the-unknown-boundary)
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

Days 31-39 gave you the tools. Day 40 is about judgment: where the compiler helps, where it cannot, and how strict discipline, runtime validation, and tests work together in a real project.

## Prerequisites

- Day 36: interfaces and unions.
- Day 38: utility types.
- Day 39: conditional and mapped types.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- keep `strict: true` and fix a design instead of silencing an error;
- use `unknown` for external data and narrow it with a guard;
- build a discriminated state type and a safe parser;
- separate domain logic from DOM, storage, and network effects;
- refactor one earlier starter with a domain type, a discriminated state, and a pure-function test;
- run this course's Day 40 starters and the type check.

And you will be able to **explain**:

- why the browser only ever sees JavaScript;
- why compiler feedback is not proof that runtime data is safe;
- when an explicit return type at a boundary earns its place;
- why a non-null assertion is a design smell;
- what makes a project maintainable versus merely typed.

## The problem this solves

A strict TypeScript project still ships plain JavaScript. If the discipline stops at the editor, malformed server data and real-world states still break the app at runtime. Day 40 combines compiler checks, runtime validation, tests, and clear boundaries so the shipped code behaves as well as the types suggest.

## JS runtime deep dive

### The browser only ever sees JavaScript

TypeScript erases before the browser runs. Every type, interface, and check disappears, so the code that executes is JavaScript — and it executes under runtime rules. That is why the disciplined project keeps runtime behavior sound, not just the types.

### Runtime practices that work in both languages

```js
var city = user?.address?.city ?? 'Unknown'
```

Optional chaining stops a lookup when an intermediate value is `null`/`undefined`; nullish coalescing provides a fallback when the result is `null`/`undefined` (not when it is `0` or `''`). These are good runtime practices in either language.

```js
function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}
```

`JSON.parse` throws on malformed input. Wrapping it in `try/catch` keeps a bad string from crashing the caller, and the `null` result is an explicit signal the caller must handle.

MDN documents the two operators side by side — [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing).

### A discriminated state switch

```js
function handleState(state) {
  switch (state.status) {
    case 'idle': return 'Waiting...'
    case 'loading': return 'Loading...'
    case 'success': return 'Got: ' + state.data
    case 'error': return 'Error: ' + state.message
  }
}
```

The `status` string discriminates the shape. JavaScript relies on tests and runtime checks to keep malformed states out; the same switch in TypeScript gets compiler help, as you saw in Day 35.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Trusting the editor over runtime data | Compiler feedback feels complete | Validate external data at the boundary |
| Using `any` to silence errors | Speed | Use `unknown` and narrow it |
| Non-null assertions to satisfy the compiler | Avoidance | Fix the design or document the boundary |
| Silencing a strict-mode error | Impatience | Find the real shape problem |
| Treating types as tests | Confusion | Keep real tests for runtime behavior |

## The TypeScript layer

### Rules that scale

1. Keep `strict: true`; fix the design instead of silencing errors.
2. Use `unknown` for external data and narrow it with a guard.
3. Prefer `const`, readonly inputs, small pure functions, and explicit return types at boundaries.
4. Separate domain logic from DOM, storage, and network effects.
5. Avoid `any`, non-null assertions, and broad assertions unless the boundary is documented and tested.
6. Let inference handle obvious local variables; annotate public functions and data models.
7. Use compiler errors as feedback, not as proof that runtime data is safe.

TypeScript's own [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) page is the same discipline applied to public APIs — avoid `any`, keep explicit signatures where they matter.

### The unknown boundary

```ts
function safeProcess(value: unknown): string {
  if (typeof value === 'string') return value.toUpperCase()
  return String(value)
}
```

`unknown` forces a narrowing step before use. `any` skips it and leaks unsafety; `unknown` makes the boundary visible so the guard is intentional and reviewable.

The handbook's [Narrowing page](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) covers the guard steps `unknown` forces — the [typeof type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards) section is exactly the `typeof value === 'string'` check above.

### What TypeScript cannot decide

The compiler cannot decide what a server sent, what a user typed, or whether a state object came in well-formed. TypeScript narrows what the compiler accepts; runtime validation of external data and tests of behavior remain separate, required steps.

### One compiler error, walked through

Open `40_day_ts_best_practices/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
function describeState(state) {
  return state.status
}
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Parameter 'state' implicitly has an 'any' type.
```

Read it as: *"`strict` mode refuses an unannotated parameter, so the function has no contract — annotate the parameter or the design is untyped."* The fix gives the parameter a type:

```ts
function describeState(state: LoadingState): string {
  switch (state.status) {
    case 'idle': return 'Waiting...'
    case 'loading': return 'Loading...'
    case 'success': return `Got: ${state.data}`
    case 'error': return `Error: ${state.message}`
  }
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A maintainable project keeps the compiler strict, treats external data as `unknown` until a guard proves it, and uses tests and runtime validation for what the compiler cannot see — because the browser only ever runs JavaScript.

## Learn more on MDN

### TypeScript docs

The official handbook is the authority on every construct in this lesson — bookmark the pages that match what you just wrote:

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the erasure note behind "the browser only ever sees JavaScript"
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the guard checks `unknown` forces before use
- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — `value is State` predicates for validated external data
- [Type Inference](https://www.typescriptlang.org/docs/handbook/2/type-inference.html) — when to let the compiler infer and when to annotate
- [Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) — the handbook's own rules against `any` and loose signatures

### MDN

- [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) — the runtime lookup guard in both languages
- [Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) — the fallback that treats `0` and `''` as real values
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the boundary function `safeParse` wraps
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) — what malformed data can throw when a guard is missing

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does the browser only ever see JavaScript, and what does that imply for runtime validation?
2. What is the difference between `any` and `unknown` at a boundary?
3. When does an explicit return type at a boundary earn its place?
4. Why is a non-null assertion a design smell?
5. Run `npm.cmd run day40:js` and `npm.cmd run day40`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Refactor one earlier starter: introduce a domain type.
2. Add a discriminated state to the same feature.
3. Add an `unknown` parser that validates external data with a guard.
4. Keep JS and TS acceptance criteria identical.
5. **TypeScript docs lookup:** Open the handbook's [Narrowing page](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) and find the [using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) section. Write an `isState(value: unknown): value is LoadingState` guard for your discriminated state, use it in the `safeParse` boundary, and comment on what your domain code may assume once the guard passes.

### Level 3 — Creative synthesis

1. The strict audit: review an earlier starter for `any`, non-null assertions, or implicit any; fix each by design.
2. The boundary case: write a `toMessage` function that turns `unknown` runtime evidence into a string.
3. The effect split: separate domain logic from DOM, storage, and network effects in one small feature.
4. The test case: add a pure-function test for the domain logic and comment on what it proves that the compiler cannot.

## Finish line

Day 40 is complete when you can do all of these **without notes**:

1. Keep `strict: true` and fix a design instead of silencing an error.
2. Use `unknown` for external data and narrow it with a guard.
3. Build a discriminated state type and a safe parser.
4. Separate domain logic from DOM, storage, and network effects.
5. Explain why compiler feedback is not proof that runtime data is safe.

If any answer is a guess, revisit the matching section before Day 41.

## Prove it

Write, in your own words, a short answer to each:

1. Why does the browser only ever see JavaScript, and what does that imply for runtime validation?
2. What is the difference between `any` and `unknown` at a boundary?
3. Why does `function describeState(state)` fail under `strict`, and what does the fix require?
4. Why is a non-null assertion a design smell?
5. What makes a project maintainable versus merely typed?

Your answers are today's evidence. If you can write them, move to [Day 41: Project — Recipe Book](../41_day_project_recipe/41_day_project_recipe.md).

**Day 40 complete.** A maintainable project keeps the compiler strict, treats external data as `unknown` until a guard proves it, and uses tests and runtime validation for what the compiler cannot see — because the browser only ever runs JavaScript.