# Day 39: TypeScript Advanced Types — Conditional and Mapped Types

[Day 38 <<](../38_day_ts_utility_types/38_day_ts_utility_types.md) | [Day 40 >>](../40_day_ts_best_practices/40_day_ts_best_practices.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Advanced types are useful when they make an API harder to misuse](#advanced-types-are-useful-when-they-make-an-api-harder-to-misuse)
  - [Conditional and inferred types](#conditional-and-inferred-types)
  - [Mapped and template literal types](#mapped-and-template-literal-types)
  - [Route parameters: a useful boundary](#route-parameters-a-useful-boundary)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The compiler computes; JavaScript executes](#the-compiler-computes-javascript-executes)
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

Day 38 covered the built-in utility types. Day 39 teaches you to build your own: conditional, mapped, inferred, and template literal types. They are worth it exactly when they make a real API harder to misuse — and they are worth skipping whenever a named interface or union communicates the design better.

## Prerequisites

- Day 36: interfaces and unions.
- Day 37: generics and `keyof`.
- Day 38: the built-in utility types.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write a conditional type with `extends ? :`;
- extract a piece of a type with `infer`;
- transform every key of a shape with a mapped type;
- combine string literals with a template literal type;
- model route parameters as a type that rejects missing keys;
- run this course's Day 39 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- when an advanced type earns its complexity;
- why `infer` has no runtime equivalent;
- why type-level route safety cannot prove a server payload;
- why `any` inside a conditional type leaks unsafety.

## The problem this solves

```ts
type Params<Path extends string> =
  Path extends `${string}:${infer Name}/${infer Rest}`
    ? { [Key in Name | keyof Params<Rest>]: string }
    : Path extends `${string}:${infer Name}`
      ? { [Key in Name]: string }
      : {}
type UserParams = Params<'/users/:id/posts/:postId'>
```

This helps a route-building API reject missing keys while editing. It does not parse a URL at runtime; a real application still validates `URL.pathname`.

## JS runtime deep dive

### Advanced types are useful when they make an API harder to misuse

Advanced types increase compile-time complexity and error-message size. Prefer a named interface or union when it is easier for a teammate to understand. They pay off when the contract is complex enough that the compiler prevents a real class of mistakes.

### Conditional and inferred types

```ts
type IsString<T> = T extends string ? true : false
type ReturnOf<T> = T extends (...args: never[]) => infer Result ? Result : never
type NumberResult = ReturnOf<() => number> // number
```

`infer` asks TypeScript to name a piece it can discover. There is no runtime equivalent; JavaScript simply calls the function and handles the returned value.

### Mapped and template literal types

```ts
type Mutable<T> = { -readonly [Key in keyof T]: T[Key] }
type EventName<Name extends string> = `on${Capitalize<Name>}`
type ClickEvent = EventName<'click'> // 'onClick'
```

Mapped types iterate over keys at compile time. Template literal types combine string literals at compile time. JavaScript uses ordinary `Object.keys` and string operations at runtime.

### Route parameters: a useful boundary

The starter's `ExtractParams<'/users/:id/posts/:postId'>` becomes `{ id: string; postId: string }`. The route-builder API then rejects a route object missing either key, and the editor shows the required shape. At runtime, the URL still needs a real parser.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Using an advanced type where an interface reads better | Enthusiasm | Prefer the simpler contract |
| Letting `any` leak through a conditional | Convenience | Use `unknown` and narrow it |
| Expecting type-level routes to parse URLs | Type/runtime confusion | Validate `URL.pathname` at runtime |
| Assuming advanced types check server data | Trusting the editor | Keep guards at the boundary |
| Building clever types with no tests | Over-engineering | Keep the runtime implementation readable |

## The TypeScript layer

### The compiler computes; JavaScript executes

Every conditional, mapped, and template literal type is resolved at compile time and erased before the browser runs the file. The runtime work — parsing, mapping objects, reading keys — is ordinary JavaScript: `Object.entries`, string operations, and a real URL parser.

### What TypeScript cannot decide

Advanced types cannot decide what a server returned, what a URL really contains, or whether a payload matches the promised route parameters. They narrow what the compiler accepts; runtime validation of `URL.pathname` and network data stays a separate, required step.

### One compiler error, walked through

Open `39_day_ts_advanced_types/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const route: UserRoutes = { id: '1' }
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'postId' is missing in type '{ id: string; }' but required in type 'UserRoutes'.
```

Read it as: *"`ExtractParams` derived every `:name` segment of the path, so `UserRoutes` requires both `id` and `postId` — an object with only `id` does not satisfy the route contract."* The fix is to supply every extracted parameter:

```ts
const route: UserRoutes = { id: '1', postId: '42' }
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Advanced types compute new contracts from shapes — conditional on a relationship, inferred by discovery, mapped over keys, composed from string literals — so the compiler rejects misuse while editing, and the runtime still does the real work in JavaScript.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What does `infer` ask TypeScript to do, and why does it have no runtime equivalent?
2. What do mapped types iterate over, and what does JavaScript use instead at runtime?
3. When would an advanced type earn its complexity over a named interface?
4. Why can type-level route safety not prove what a server returned?
5. Run `npm.cmd run day39:js` and `npm.cmd run day39`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 981 Time Based Key-Value Store — https://leetcode.com/problems/time-based-key-value-store/ (hint: https://neetcode.io/problems/time-based-key-value-store/question)

### Level 2 — Applied mini-projects

1. Create an exhaustive shape-area function over a discriminated union.
2. Create an `EventName` helper that turns `'click'` into `'onClick'`.
3. Create a route-parameter type that extracts every `:name` segment.
4. Add a JavaScript runtime parser for the route so you can distinguish compile-time and runtime work.

### Level 3 — Creative synthesis

1. The conditional audit: write `IsString<T>` and check it against a string, a number, and a union; comment on each result.
2. The infer extractor: use `ReturnOf` on a function and a non-function, and comment on what `never` means for the false branch.
3. The mapped modifier: write `Mutable<T>` from a `Readonly<T>` view and comment on what `-readonly` does at compile time.
4. The runtime parser: parse a pathname in JavaScript and comment on which guarantee the type adds and which it cannot.

## Finish line

Day 39 is complete when you can do all of these **without notes**:

1. Write a conditional type with `extends ? :`.
2. Extract a piece of a type with `infer`.
3. Transform every key of a shape with a mapped type.
4. Combine string literals with a template literal type.
5. Model route parameters as a type that rejects missing keys.

If any answer is a guess, revisit the matching section before Day 40.

## Prove it

Write, in your own words, a short answer to each:

1. What does `infer` ask TypeScript to do, and why does it have no runtime equivalent?
2. What do mapped types iterate over, and what does JavaScript use instead at runtime?
3. When would an advanced type earn its complexity over a named interface?
4. Why can type-level route safety not prove what a server returned?
5. Why does `const route: UserRoutes = { id: '1' }` fail, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 40: TypeScript in a Maintainable Project — Safety in the Real World](../40_day_ts_best_practices/40_day_ts_best_practices.md).

**Day 39 complete.** Advanced types compute new contracts from shapes — conditional on a relationship, inferred by discovery, mapped over keys, composed from string literals — so the compiler rejects misuse while editing, and the runtime still does the real work in JavaScript.