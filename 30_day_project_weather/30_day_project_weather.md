# Day 30: The Weather Project — Fetching and Rendering

[Day 29 <<](../29_day_project_todo/29_day_project_todo.md) | [Day 31 >>](../31_day_promises_i/31_day_promises_i.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The state and boundary](#the-state-and-boundary)
  - [A Promise that settles deterministically](#a-promise-that-settles-deterministically)
  - [Loading, success, and error as one state machine](#loading-success-and-error-as-one-state-machine)
  - [Favorites with validated hydration](#favorites-with-validated-hydration)
  - [Pitfalls to test](#pitfalls-to-test)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Explicit status and fields, erased at runtime](#explicit-status-and-fields-erased-at-runtime)
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

Most real apps eventually talk to a server. This project models that boundary without an API key: an offline mock returns a Promise, so every clone can observe loading, success, and error states deterministically. The same structure — a boundary, a state machine, and guarded rendering — transfers directly to a real `fetch`.

## Prerequisites

- Day 29: the todo project's state-and-render loop.
- Day 28: side effects at boundaries.
- Day 22: parsing and validating external data.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- keep API/data logic separate from DOM rendering;
- render loading before a Promise settles;
- show an error for an unknown city and recover on the next search;
- add and remove favorites with validated `localStorage` hydration;
- replace the mock with `fetch` later without rewriting the render;
- run this course's Day 30 starter pages in both languages and the type check.

And you will be able to **explain**:

- why a loading state must not leave stale success text looking current;
- why a later search must own which result wins the UI;
- why API keys do not belong in browser source or committed `.env` files;
- why mock data is not permission to skip failure and empty states.

## The problem this solves

A search renders three different things over time — a placeholder, a loading message, and either a result or an error. If those states are scattered, a stale result can look current. One state machine and one render function keep the boundary honest.

```ts
type Weather = { city: string; temperature: number; humidity: number; condition: string }
type DashboardState = {
  current: Weather | null
  favorites: string[]
  status: 'idle' | 'loading' | 'success' | 'error'
}
```

## JS runtime deep dive

### The state and boundary

`getWeather(city)` returns a Promise and does not touch the DOM. The UI trims input, renders loading, awaits the boundary, then renders success or error. Keeping API/data logic separate from DOM rendering means a real `fetch` implementation can replace the mock later.

### A Promise that settles deterministically

```js
function getWeather(city) {
  const match = records.find((record) => record.city.toLowerCase() === city.toLowerCase())
  return match === undefined
    ? Promise.reject(new Error('City not found in the offline demo.'))
    : Promise.resolve(match)
}
```

The mock rejects for an unknown city, so the error path is observable without a network.

The mock is built from `Promise.resolve` and `Promise.reject` — [MDN's `Promise` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) explains how both constructors settle a promise without touching the network.

### Loading, success, and error as one state machine

```js
async function search(city) {
  const query = city.trim()
  if (query === '') return
  state.status = 'loading'
  render()
  try {
    state.current = await getWeather(query)
    state.status = 'success'
  } catch {
    state.current = null
    state.status = 'error'
  }
  render()
}
```

The status drives the status line; the result region renders only when `state.current` is not `null`. A Promise can reject after the user has started another search, so decide which result owns the UI — here the latest `search` call reassigns `state` before rendering.

`async`/`await` keeps the flow readable — [MDN's async function reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) describes how `await` turns the promise into either a value or a thrown error caught here by `try`/`catch`.

### Favorites with validated hydration

```js
const saved = JSON.parse(localStorage.getItem('day30-favorites') ?? '[]')
if (Array.isArray(saved) && saved.every((city) => typeof city === 'string')) {
  state.favorites = saved
}
```

A parsed favorites value is validated as an array of strings before it is assigned. Writing it back goes through `saveFavorites`, which degrades gracefully when storage is blocked.

The guard uses `Array.isArray` plus `every` — [MDN's `localStorage` reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) documents the storage API and why its values arrive as strings that need parsing and validation.

### Pitfalls to test

- A Promise can reject after the user has started another search; decide which result owns the UI.
- A loading state must not leave stale success text that looks current.
- API keys do not belong in browser source or committed `.env` files.
- Local mock data is not permission to skip failure and empty states.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Rendering before the Promise settles | Forgetting async | Set loading and render first |
| Leaving stale success text during loading | Shortcut | Let status drive the status line |
| Parsing favorites without validation | Trusting storage | Check array-of-strings first |
| Mixing API calls into render | Convenience | Keep the boundary separate |
| Committing keys or `.env` files | Copy-paste | Keep credentials out of browser code |

## The TypeScript layer

### Explicit status and fields, erased at runtime

JavaScript carries the same state machine through runtime checks. TypeScript makes the status strings and weather fields explicit:

```ts
type Status = 'idle' | 'loading' | 'success' | 'error'
```

TypeScript cannot guarantee that a real server returned those fields. If you replace the mock with `fetch`, parse as `unknown` and use a guard before assigning `Weather`.

### What TypeScript cannot decide

TypeScript cannot decide what a real server returns, whether a search still owns the UI, or whether `localStorage` held a valid favorites array. The status machine and the `Array.isArray` + `every` checks are runtime behavior; the types describe the shapes the guards enforce.

### One compiler error, walked through

Open `30_day_project_weather/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const current = state.current
console.log(current.temperature)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'current' is possibly 'null'.
```

Read it as: *"`state.current` is `Weather | null` — before any search, and after an error, there is no weather to read. The render must check it first."* The fix is the guarded render from the lesson:

```ts
const current = state.current
if (current !== null) {
  // render the result
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A weather dashboard is a boundary (the API Promise) feeding a state machine (`idle`/`loading`/`success`/`error`), and a render that never reads `current` until it is checked — with favorites validated after every parse.

## Learn more on MDN

The weather project leans on Promises, storage, and state. Bookmark these pages and return as you grow:

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — the object behind every async boundary
- [Promise.resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) — the deterministic success path of the mock
- [Promise.reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) — the deterministic error path of the mock
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) — `await` and how rejection becomes a caught error
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — the storage API behind favorites
- [Storage.getItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) — reading a stored value as a string
- [Storage.setItem](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem) — writing back a string value
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — turning storage strings into values that must be validated
- [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) — the check that every stored city is a string

### TypeScript docs

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the `current !== null` checks the render relies on
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind the status strings and weather fields

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).\n- When the project meets the Definition of done checklist, log it in [PORTFOLIO_TRACK.md](../PORTFOLIO_TRACK.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why must the loading state clear or override stale success text?
2. Why does the latest search own which result wins the UI?
3. Why are favorites validated after parsing?
4. Why do API keys not belong in browser source or committed `.env` files?
5. Why is mock data not permission to skip failure states?
6. Open the JavaScript starter (`starter/index.html`) directly in your browser and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`); confirm loading, a known city, an unknown city, favorites, and refresh all behave on both; then run `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Add a Retry button that re-runs the last failed query and re-renders loading before settling.
2. Sort favorites alphabetically in the render without mutating the stored array.
3. TypeScript: replace the mock `getWeather` signature with one that returns `Promise<Weather>` from a small async helper, and add a comment on what changes if a real `fetch` replaces it.
4. Persist the last successful search in a second storage key and restore it on load.
5. **MDN lookup:** Open the [Promise reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), find the `finally()` method, and add it to the `search` flow so a status message is always restored after either outcome. Comment on why `finally` runs for both success and error.

### Level 3 — Creative synthesis

1. The stale-result guard: add a `searchId` that increments per search and let the result apply only when it still matches, with a comment on why timing wins are a runtime concern TypeScript cannot solve.
2. The validated fetch: write `isWeather(value: unknown): value is Weather` and a comment block describing where it runs if the mock is swapped for `fetch`.
3. The empty state: when `state.current` is `null` and status is `idle`, render a hint instead of a blank region, and comment on why the empty state is driven by state, not by the DOM.
4. The failure log: keep the last error message in state and render it distinctly from a generic "could not load", with a comment on what a server would need to include for the message to be user-safe.

## Finish line

Day 30 is complete when you can do all of these **without notes**:

1. Keep API/data logic separate from DOM rendering.
2. Render loading before a Promise settles.
3. Show an error for an unknown city and recover on the next search.
4. Add and remove favorites with validated `localStorage` hydration.
5. Replace the mock with `fetch` later without rewriting the render.

If any answer is a guess, revisit the matching section before Day 31.

## Prove it

Write, in your own words, a short answer to each:

1. Why does the render never read `state.current` until it is checked?
2. Why does the latest search own which result wins the UI?
3. Why are favorites validated after parsing?
4. Why is mock data not permission to skip failure and empty states?
5. Why does `state.current` read as `Weather | null` in TypeScript, and what does the render require?

Your answers are today's evidence. If you can write them, move to [Day 31: Promises — One Future Result](../31_day_promises_i/31_day_promises_i.md).

**Day 30 complete.** The weather dashboard now runs a boundary, a state machine, and guarded rendering end to end — loading, success, and error are observable offline, favorites survive refresh with validation, and a real `fetch` can replace the mock without touching the render.