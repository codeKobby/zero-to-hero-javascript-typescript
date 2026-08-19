# Day 38: TypeScript Utility Types — Transforming Shapes Without Rewriting Them

[Day 37 <<](../37_day_ts_generics/37_day_ts_generics.md) | [Day 39 >>](../39_day_ts_advanced_types/39_day_ts_advanced_types.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Utility types transform, they do not execute](#utility-types-transform-they-do-not-execute)
  - [Read the transformation](#read-the-transformation)
  - [JS and TS side by side](#js-and-ts-side-by-side)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The signature catches the key, the runtime still runs JavaScript](#the-signature-catches-the-key-the-runtime-still-runs-javascript)
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

Day 37 taught you to write generics. Day 38 teaches the built-in transformations: `Partial`, `Required`, `Pick`, `Omit`, `Record`, and `Readonly` turn one declared shape into a family of related contracts without repeating it. The catch: these types change what the compiler permits, they do not clone or freeze anything at runtime.

## Prerequisites

- Day 36: interfaces and type aliases.
- Day 37: generics and `keyof`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- derive an update type with `Partial`;
- project a smaller public view with `Pick` and remove fields with `Omit`;
- build a typed dictionary with `Record`;
- block assignment with `Readonly`;
- reimplement the same operations in JavaScript with `pick`, `omit`, and `Object.freeze`;
- run this course's Day 38 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what utility types change and what they never do at runtime;
- why `Partial<User>` does not validate a patch from a form or API;
- why `Readonly` and `Object.freeze` are shallow;
- which guarantees exist only in the editor.

## The problem this solves

```ts
interface User { id: number; name: string; email: string; role: 'admin' | 'user' }
type UserUpdate = Partial<User>       // every field optional for a PATCH
type PublicUser = Pick<User, 'id' | 'name'>
type UserWithoutId = Omit<User, 'id'>
type Permissions = Record<'admin' | 'user', string[]>
```

These types change what the compiler permits; they do not clone or freeze an object. In JavaScript, write explicit helpers such as `pick`, `omit`, and `Object.freeze` when runtime behavior is required.

## JS runtime deep dive

### Utility types transform, they do not execute

JavaScript performs the actual object copying, picking, omitting, and freezing. TypeScript utility types describe those shapes at compile time, which helps the editor but does not perform the runtime work for you.

### Read the transformation

- `Partial<T>` makes properties optional.
- `Required<T>` makes optional properties required.
- `Pick<T, K>` keeps only keys in `K`.
- `Omit<T, K>` removes keys in `K`.
- `Record<K, V>` creates a dictionary whose keys and values are known.
- `Readonly<T>` prevents assignment through that TypeScript view; it does not deep-freeze nested objects.

### JS and TS side by side

```js
function pick(object, keys) {
  return Object.fromEntries(keys.filter(key => key in object).map(key => [key, object[key]]))
}
```

```ts
function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map(key => [key, object[key]])) as Pick<T, K>
}
```

The TS signature catches an invalid key, while the implementation still runs JavaScript and needs sensible runtime behavior.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Expecting `Partial` to validate a patch object | Confusing types with guards | Validate at the boundary; `Partial` only widens |
| Trusting `Readonly` to deep-freeze | Misreading shallow | Use a recursive `Readonly` or `Object.freeze` per level |
| Assuming utility types run code | Editor magic | They are erased at runtime; write `pick`/`omit`/`freeze` |
| Using a type assertion to silence an unsafe implementation | Convenience | Prefer a guard or a tested helper |

## The TypeScript layer

### The signature catches the key, the runtime still runs JavaScript

`Pick<T, K>` with `K extends keyof T` means the compiler rejects `Pick<User, 'nickname'>` before execution. Inside the implementation, the assertion `as Pick<T, K>` only tells the compiler to trust the object; the runtime still needs the JavaScript behavior to be correct.

### What TypeScript cannot decide

Utility types cannot decide what a server sent, whether a nested object was frozen, or whether a PATCH payload actually matches `Partial<User>`. `JSON.parse` returns `unknown`; the compiler cannot know the bytes. Every runtime consequence stays JavaScript's job.

### One compiler error, walked through

Open `38_day_ts_utility_types/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const frozen: FrozenUser = { id: 2, name: 'Bob', email: 'b@test.com', age: 30, role: 'user' }
frozen.email = 'b2@test.com'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Cannot assign to 'email' because it is a read-only property.
```

Read it as: *"`Readonly<User>` makes every property assignable only at creation; this assignment is a second write, so the compiler blocks it before execution."* The fix is to build the new value as a fresh object instead of mutating:

```ts
const updated: FrozenUser = { ...frozen, email: 'b2@test.com' }
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Utility types derive related contracts — optional, picked, omitted, recorded, readonly — from one declared shape, changing only what the compiler permits, never what the runtime does.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What does `Partial<User>` make optional, and why is that right for a PATCH?
2. Why does `Partial<User>` not validate a patch object from a form or API?
3. Why is `Readonly<T>` shallow, and what would a deep version need?
4. Which guarantees exist only in the editor, and which only at runtime?
5. Run `npm.cmd run day38:js` and `npm.cmd run day38`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Create a typed update function that accepts `Partial<User>`.
2. Create a public projection with `Pick<User, 'id' | 'name'>`.
3. Create a permissions dictionary with `Record<'admin' | 'user', string[]>`.
4. Reimplement the same operations in JavaScript with `pick`, `omit`, and `Object.freeze`, and write down which guarantees exist only in the editor.

### Level 3 — Creative synthesis

1. The update contract: write `applyUpdate(user, patch)` and comment on what fields `patch` may legally carry.
2. The projection audit: expose only `id` and `name` publicly and comment on what leaving `email` in would risk.
3. The readonly boundary: block assignment on a config object and comment on where `Object.freeze` is still needed.
4. The shallow trap: nest an object under a readonly view and comment on what still mutates.

## Finish line

Day 38 is complete when you can do all of these **without notes**:

1. Derive an update type with `Partial`.
2. Project a smaller view with `Pick` and remove fields with `Omit`.
3. Build a typed dictionary with `Record`.
4. Block assignment with `Readonly`.
5. Reimplement the operations in JavaScript with explicit helpers.

If any answer is a guess, revisit the matching section before Day 39.

## Prove it

Write, in your own words, a short answer to each:

1. What does `Partial<User>` make optional, and why is that right for a PATCH?
2. Why does `Partial<User>` not validate a patch object from a form or API?
3. Why is `Readonly<T>` shallow, and what would a deep version need?
4. Which guarantees exist only in the editor, and which only at runtime?
5. Why does `frozen.email = ...` fail, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 39: TypeScript Advanced Types — Conditional and Mapped Types](../39_day_ts_advanced_types/39_day_ts_advanced_types.md).

**Day 38 complete.** Utility types derive related contracts — optional, picked, omitted, recorded, readonly — from one declared shape, changing only what the compiler permits, never what the runtime does.