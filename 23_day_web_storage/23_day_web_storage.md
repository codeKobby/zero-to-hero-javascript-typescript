# Day 23: Web Storage — Keeping Data Between Visits

[Day 22 <<](../22_day_json/22_day_json.md) | [Day 24 >>](../24_day_dom_selection/24_day_dom_selection.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Browser storage is small, synchronous, and untrusted](#browser-storage-is-small-synchronous-and-untrusted)
  - [Storage only stores strings](#storage-only-stores-strings)
  - [A narrow storage wrapper](#a-narrow-storage-wrapper)
  - [Storage may fail](#storage-may-fail)
  - [Expiry is application metadata](#expiry-is-application-metadata)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Describe shapes, then guard at the boundary](#describe-shapes-then-guard-at-the-boundary)
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

A web app should remember your theme or draft across visits. `localStorage` and `sessionStorage` make that possible — but they are small, synchronous, string-only, and **not** a place for secrets.

This lesson teaches the safe storage pattern: treat stored text as untrusted, wrap missing and malformed reads in a fallback, catch failures at the app boundary, and never put access tokens or private data where page JavaScript can read them.

## Prerequisites

- Day 22: `JSON.parse`, shape guards, `unknown`, allowlists.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- save and load a small preference with a fallback;
- store structured values as JSON text;
- add an expiry timestamp and delete stale entries;
- guard persisted preferences before trusting them;
- use a type guard after parsing instead of a bare assertion;
- run this course's Day 23 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what values `getItem` can return;
- why `localStorage` should not hold access tokens;
- why `JSON.parse` alone cannot trust persisted data;
- why an expiry timestamp is not a security control.

## The problem this solves

A preference must survive a refresh:

```js
localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme') // string or null
```

And a structured preference must survive the round trip safely — saved as JSON, loaded with a fallback:

```js
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }))
const raw = localStorage.getItem('preferences')
```

The rest of this lesson hardens that exchange: missing keys, malformed text, blocked storage, and stale data.

## JS runtime deep dive

### Browser storage is small, synchronous, and untrusted

`localStorage` persists strings for an origin. `sessionStorage` persists strings for one browser tab session. Both survive a page refresh; `localStorage` generally survives browser restarts while `sessionStorage` ends when its tab session ends.

Use storage for small non-sensitive preferences, drafts, or cached UI state. Do **not** put passwords, access tokens, payment data, or private user data in `localStorage`. JavaScript running on the page can read it, including malicious code introduced through an XSS vulnerability.

### Storage only stores strings

```js
localStorage.setItem('theme', 'dark')
const theme = localStorage.getItem('theme') // string or null
```

For structured values, make the JSON boundary explicit:

```js
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }))
const raw = localStorage.getItem('preferences')
```

Read results may be `null` and saved text may be malformed or from an older application version. Treat both as expected cases.

### A narrow storage wrapper

```js
function saveJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value))
}

function loadJson(storage, key, fallback) {
  const raw = storage.getItem(key)
  if (raw === null) {
    return fallback
  }

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}
```

This wrapper handles missing and malformed JSON. It does **not** validate the parsed shape; apply a guard from Day 22 before trusting external or persisted data.

### Storage may fail

Calls can fail when storage is blocked, disabled, or full. Catch errors at the app boundary and keep the interface usable:

```js
try {
  localStorage.setItem('preferences', text)
} catch {
  showMessage('Preferences could not be saved on this device.')
}
```

Do **not** clear all storage as a recovery shortcut. `localStorage.clear()` removes every key belonging to your origin, including data owned by unrelated parts of the same application.

### Expiry is application metadata

`localStorage` has no built-in expiration. If a value needs a time-to-live, store its expiry alongside the value, check that expiry when reading, and remove the stale entry. Expiry is a cache rule, not a security mechanism.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Storing tokens or private data | Convenience | Keep only small non-sensitive values |
| Trusting `getItem` output as a number/object | It is always a string or null | Make the JSON boundary explicit |
| Letting `JSON.parse` throw on bad text | Old or hand-edited data | Wrap reads with a fallback |
| `clear()` as a recovery shortcut | Impulse | Remove only the failing key |
| Expiry as security | Wishful thinking | Treat expiry as a cache rule |

## The TypeScript layer

### Describe shapes, then guard at the boundary

TypeScript can describe a preference shape, but a generic storage helper cannot prove old browser data matches that shape. A type assertion after `JSON.parse` only tells TypeScript to trust you. Pair it with a runtime guard when correctness matters:

```ts
type Preferences = {
  theme: 'light' | 'dark'
}

function isPreferences(value: unknown): value is Preferences {
  return typeof value === 'object' &&
    value !== null &&
    'theme' in value &&
    (value.theme === 'light' || value.theme === 'dark')
}
```

Then loading becomes: parse, guard, use — with a fallback for every failure path.

### What TypeScript cannot decide

TypeScript cannot know what an old browser session saved, whether storage is blocked, or which values are sensitive enough to keep out of `localStorage`. It cannot turn `as Preferences` into real validation. The guard and the storage-failure handling are runtime code your tests must prove.

### One compiler error, walked through

Open `23_day_web_storage/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const restored = getWithExpiry<{ data: string }>('temp')
console.log(restored.data)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'restored' is possibly 'null'.
```

Read it as: *"A storage read can always return nothing — expired, missing, or malformed — so the result is `T | null` and must be narrowed before `.data` is read."* The fix is to check before use:

```ts
if (restored !== null) {
  console.log(restored.data)
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Web storage is a small, synchronous, string-only, untrusted shelf — read with a fallback, write as JSON, guard the parsed shape, catch failures at the boundary, and never store secrets there.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. `localStorage.getItem('missing')` — what does it return?
2. Why should `localStorage` not hold access tokens?
3. `localStorage.setItem('n', 5)` — what does `getItem('n')` actually return?
4. Why is `JSON.parse` not enough to trust persisted data?
5. Why is an expiry timestamp not a security control?
6. What does `localStorage.clear()` do to unrelated keys?
7. Run `npm.cmd run day23:js` and `npm.cmd run day23`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Save and load a theme preference with a fallback.
2. Add an expiry timestamp to a cached value and delete it once expired.
3. Write `isPreferences(value)` to validate persisted preferences before use.
4. TypeScript: use a type guard after parsing instead of asserting parsed text is `Preferences`.

### Level 3 — Creative synthesis

1. The versioned draft: store a draft under a key that includes a schema version (e.g. `'draft:v1'`), and on load, guard the shape before returning it. State why the version belongs in the key.
2. The TTL cache: write `setWithTtl(storage, key, value, ttlMs)` and `getWithTtl(storage, key)` that return `null` for missing or expired entries and remove stale ones. Combine with a shape guard at read time.
3. The safe boundary: write `loadPreferences(storage)` returning `{ ok: true, preferences }` or `{ ok: false }`, catching storage failures and shape failures separately.
4. The threat memo: write a comment block listing three kinds of data that must never go into `localStorage` and the safer place for each.

## Finish line

Day 23 is complete when you can do all of these **without notes**:

1. Save and load a small preference with a fallback.
2. Store structured values as JSON text.
3. Add an expiry timestamp and delete stale entries.
4. Guard persisted preferences before trusting them.
5. Use a type guard after parsing instead of a bare assertion.

If any answer is a guess, revisit the matching section before Day 24.

## Prove it

Write, in your own words, a short answer to each:

1. What values can `getItem` return?
2. Why should `localStorage` not hold access tokens?
3. Why is `JSON.parse` not enough to trust persisted data?
4. Why is an expiry timestamp not a security control?
5. Why does a storage read need a null check in TypeScript?
6. What does the type checker know that your tests must still verify about storage?

Your answers are today's evidence. If you can write them, move to [Day 24: Selecting DOM Elements — Querying the Page](../24_day_dom_selection/24_day_dom_selection.md).

**Day 23 complete.** Browser storage is now a handled boundary — small non-sensitive values only, string-safe JSON round trips, fallbacks for every failure, guards before trust, and expiry treated as a cache rule, never a security control.