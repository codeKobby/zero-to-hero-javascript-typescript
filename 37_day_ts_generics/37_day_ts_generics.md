# Day 37: TypeScript Generics — One Function, Many Types

[Day 36 <<](../36_day_ts_types/36_day_ts_types.md) | [Day 38 >>](../38_day_ts_utility_types/38_day_ts_utility_types.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [One function, many types](#one-function-many-types)
  - [The relationship is only a convention in JavaScript](#the-relationship-is-only-a-convention-in-javascript)
  - [Constraints explain what a generic may do](#constraints-explain-what-a-generic-may-do)
  - [Keys and repositories](#keys-and-repositories)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [A type parameter is a placeholder filled by the caller](#a-type-parameter-is-a-placeholder-filled-by-the-caller)
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

Day 36 taught you to describe one shape. Day 37 teaches you to describe the *relationship* between a function's input and output, once, for every type. Generics keep that relationship visible to the editor; the emitted code is still one ordinary JavaScript function.

## Prerequisites

- Day 36: interfaces, type aliases, unions, narrowing.
- Day 12-13: higher-order functions and how functions are values.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write a generic function with a type parameter;
- constrain a generic with `extends` to require a known property;
- use `keyof` to limit a key parameter to keys that exist;
- build a generic `Repository<T>` and read what it stores and returns;
- run this course's Day 37 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what a type parameter is and who fills it;
- why `extends` here is not class inheritance;
- when a generic is useful versus a plain annotation;
- why a generic cannot validate a value loaded from JSON.

## The problem this solves

```js
function identity(value) { return value }
const answer = identity(42) // JavaScript gives no static promise about answer
```

Specific TypeScript copies are safe but repetitive:

```ts
function numberIdentity(value: number): number { return value }
function stringIdentity(value: string): string { return value }
```

A type parameter is a placeholder filled by the caller:

```ts
function identity<T>(value: T): T { return value }
const answer = identity(42)       // T is number; answer is number
const label = identity('ready')   // T is string; label is string
```

The runtime JavaScript is still one function. The `<T>` relationship is removed after checking.

## JS runtime deep dive

### One function, many types

JavaScript can still write the runtime function and test it by hand. TypeScript adds type parameters so the relationship between input and output stays visible to the editor, but the emitted code is still one ordinary JavaScript function.

### The relationship is only a convention in JavaScript

`identity` is one function at runtime. Nothing in JavaScript records that a number in produces a number out — that promise lives in TypeScript only. The runtime value `answer` is just the object that was returned, and the editor cannot promise what it is.

### Constraints explain what a generic may do

```ts
interface HasLength { length: number }
function lengthOf<T extends HasLength>(value: T): number {
  return value.length
}
```

`extends` does not mean class inheritance here. It means the caller's type must include a `length` property. The value could be a string, array, or custom object.

The handbook's [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) section is the same `extends` rule — constrain only what the implementation actually needs, never the runtime type.

### Keys and repositories

```ts
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}
const product = { id: 'p1', price: 20 }
getProperty(product, 'price') // number
// getProperty(product, 'name') // compile-time error
```

The starter also builds a `Repository<Product>`. Trace what `create` receives and what `getAll` returns.

The [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) handbook page explains how `K extends keyof T` limits a key parameter to keys that actually exist.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Reaching for `any` on a hard generic | Impatience | Start with `unknown` or a constraint |
| Generics where one fixed type is enough | Over-engineering | Use a plain annotation |
| Mixing `T[]` and `Array<T>` | Inconsistency | Pick one style and keep it |
| Over-constraining | Fear of errors | Constrain only what the implementation needs |
| Constraining by runtime type | Confusion with classes | Constrain by shape, not by inheritance |

## The TypeScript layer

### A type parameter is a placeholder filled by the caller

`function identity<T>(value: T): T` is checked once against the relationship "output has the input's type", then instantiated per call: `T` is `number` for `identity(42)`, `string` for `identity('ready')`. Nothing about `<T>` is emitted to JavaScript.

The handbook's [Generics page](https://www.typescriptlang.org/docs/handbook/2/generics.html) walks through the same placeholder idea — including a `getProperty`-style helper very close to the one you wrote.

### What TypeScript cannot decide

A generic preserves and checks the relationship between types at compile time. It cannot stop a malformed value loaded from JSON, because the compiler has no idea what bytes a `JSON.parse` produced. The relationship and the value's actual shape are different facts.

### One compiler error, walked through

Open `37_day_ts_generics/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
getProperty(product, 'name')
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Argument of type '"name"' is not assignable to parameter of type 'keyof { id: string; price: number }'.
```

Read it as: *"`K` is limited to keys that actually exist on `product`, and `'name'` is not one of them — so `product.name` would be undefined the moment this ran."* The fix is to ask for a key that exists:

```ts
console.log(getProperty(product, 'price')) // number
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Generics make one function preserve the relationship between input and output for every type, with `extends` and `keyof` constraining what the implementation may rely on — and with the emitted code still one ordinary JavaScript function.

## Learn more on MDN

### TypeScript docs

The official handbook is the authority on every construct in this lesson — bookmark the pages that match what you just wrote:

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) — type parameters, generic functions, and how the caller fills `T`
- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) — why `extends` here means shape, not inheritance
- [Generic Types](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types) — writing `Repository<T>`-style generic classes and interfaces
- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) — the `keyof T` check behind safe key access
- [Type Inference](https://www.typescriptlang.org/docs/handbook/2/type-inference.html) — how TypeScript picks the type argument when you omit it

### MDN

- [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) — the runtime type check; generics are erased so there is no runtime equivalent
- [in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) — the runtime key lookup behind `keyof`-checked access
- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) — the runtime type behind `T[]` / `Array<T>` and the `length` constraint

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What is a type parameter, and who fills it?
2. Why does `extends` in `T extends HasLength` not mean class inheritance?
3. What does `keyof T` restrict `K` to, and why does that keep `getProperty` safe?
4. When would a generic be less clear than a plain annotation?
5. Run `npm.cmd run day37:js` and `npm.cmd run day37`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 238 Product of Array Except Self — https://leetcode.com/problems/product-of-array-except-self/ (hint: https://neetcode.io/problems/products-of-array-discluding-self/question) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Implement `first<T>` that returns `T | undefined`.
2. Implement `swap<A, B>` that returns a tuple with the arguments reversed.
3. Implement a constrained `logLength` and call it with a string, an array, and a custom object.
4. Implement a generic `Result<T, E>` union and a function that narrows it.
5. **TypeScript docs lookup:** Open the handbook's [Generics page](https://www.typescriptlang.org/docs/handbook/2/generics.html) and find the [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) section. Write a generic `pluck<T, K extends keyof T>(object: T, key: K): T[K]` that returns one property, then constrain a second generic with `extends HasLength` and comment on what each `extends` restricts.

### Level 3 — Creative synthesis

1. The identity promise: call `identity` with a number, then a string, and comment on what the return type is in each case.
2. The constraint audit: try `logLength(42)` and comment on what the compiler reports and why.
3. The repository trace: implement `Repository<Product>` and comment on what `create` receives and what `getAll` returns.
4. The JS constraint imitation: write a runtime check that throws when a value lacks `length`, and comment on when it runs compared with the compile-time check.

## Finish line

Day 37 is complete when you can do all of these **without notes**:

1. Write a generic function with a type parameter.
2. Constrain a generic with `extends` to require a known property.
3. Use `keyof` to limit a key parameter to keys that exist.
4. Build a generic `Repository<T>`.
5. Explain when a generic is useful versus a plain annotation.

If any answer is a guess, revisit the matching section before Day 38.

## Prove it

Write, in your own words, a short answer to each:

1. What is a type parameter, and who fills it?
2. Why does `extends` in `T extends HasLength` not mean class inheritance?
3. What does `keyof T` restrict `K` to, and why does that keep `getProperty` safe?
4. When would a generic be less clear than a plain annotation?
5. Why does `getProperty(product, 'name')` fail, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 38: TypeScript Utility Types — Transforming Shapes Without Rewriting Them](../38_day_ts_utility_types/38_day_ts_utility_types.md).

**Day 37 complete.** Generics make one function preserve the relationship between input and output for every type, with `extends` and `keyof` constraining what the implementation may rely on — and with the emitted code still one ordinary JavaScript function.