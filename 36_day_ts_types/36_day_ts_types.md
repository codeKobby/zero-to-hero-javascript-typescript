# Day 36: TypeScript Types and Interfaces — Designing the Data Contract

[← Previous lesson](../35_day_api_integration/35_day_api_integration.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../37_day_ts_generics/37_day_ts_generics.md)



## Start here

Read the [course README](../README.md), complete the [VS Code setup](../VS_CODE_SETUP.md), and use the [day index](../DAY_INDEX.md) to confirm where this lesson fits. Run the paired local starters before attempting [exercises](practice/exercises.md), then use [hints](practice/hints.md) and [solutions](practice/solutions.md) only after an honest attempt.

## Table of Contents

- [Start here](#start-here)

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [An object can silently change shape](#an-object-can-silently-change-shape)
  - [Type aliases and interfaces](#type-aliases-and-interfaces)
  - [Narrowing a union](#narrowing-a-union)
  - [Types disappear at runtime](#types-disappear-at-runtime)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The annotation is checked before execution](#the-annotation-is-checked-before-execution)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
  - [TypeScript docs](#typescript-docs)
  - [MDN](#mdn)
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

Day 36 is where you stop only annotating and start designing a small data model. Interfaces, unions, and narrowing let the editor catch invalid property access before the code runs. The catch: types describe shape, they do not prove that JSON or user input is valid — so you learn both sides of the boundary.

## Prerequisites

- Day 34-35: `unknown`, type guards, trust boundaries.
- Day 19-20: objects and class shapes.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- model an object shape with an interface;
- compose unions, tuples, and primitives with a type alias;
- narrow a discriminated union with a `status` or `ok` field;
- keep a runtime guard for data crossing a network, storage, or DOM boundary;
- run this course's Day 36 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what is passed to `message`, and which property narrows the union;
- why `JSON.parse` still needs a runtime guard in TypeScript;
- when an interface would be clearer than a type alias;
- why `as User` is an assertion, not validation.

## The problem this solves

In JavaScript, an object can silently change shape:

```js
const user = { id: 1, name: 'Mina' }
user.name = 42 // JavaScript allows this; a later function may fail
```

TypeScript can describe the intended shape:

```ts
interface User { id: number; name: string; role: 'admin' | 'user' }
const user: User = { id: 1, name: 'Mina', role: 'user' }
// user.name = 42 // compile-time error
```

The value passed to `user` is an object. The annotation after the colon is checked before execution; it is not emitted into the browser.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **An object can silently change shape** | The lesson explains an object can silently change shape through runnable examples and practice. |
| **Type aliases and interfaces** | The lesson explains type aliases and interfaces through runnable examples and practice. |
| **Narrowing a union** | The lesson explains narrowing a union through runnable examples and practice. |
| **Types disappear at runtime** | The lesson explains types disappear at runtime through runnable examples and practice. |
| **Common mistakes table** | The lesson explains common mistakes table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [An object can silently change shape](#an-object-can-silently-change-shape)
- [Type aliases and interfaces](#type-aliases-and-interfaces)
- [Narrowing a union](#narrowing-a-union)
- [Types disappear at runtime](#types-disappear-at-runtime)
- [Common mistakes table](#common-mistakes-table)

## JS runtime deep dive

### An object can silently change shape

JavaScript lets an object change shape unless you guard it yourself. TypeScript lets you describe the same shape so the editor catches invalid property access before the code runs. Keep the runtime guard for external data; types do not prove that JSON or form input is valid.

### Type aliases and interfaces

Use an interface for an extendable object shape. Use a type alias for unions, tuples, primitives, and composition:

```ts
type ID = string | number
type Status = 'idle' | 'loading' | 'success' | 'error'
interface Employee extends User { department: string }
```

Neither choice validates a value received from `JSON.parse`. That value is `unknown` until a runtime guard proves it.

The [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) explains the choice in its own words: [Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces) are for extendable object shapes, [Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases) for unions and composition. The page even shows the interface `extends` syntax you used above.

### Narrowing a union

```ts
type Response =
  | { ok: true; data: User }
  | { ok: false; error: string }

function message(response: Response): string {
  return response.ok ? `User: ${response.data.name}` : `Error: ${response.error}`
}
```

`response.ok` is the discriminator. Once the branch checks it, TypeScript knows which fields exist. In JavaScript the same pattern works, but the editor cannot guarantee that every caller supplied the right shape.

The handbook section on [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) is exactly this pattern — read it to meet the `never` check that makes a union exhaustive (Level 3 below uses it).

### Types disappear at runtime

`interface`, `type`, and the union disappear after compilation. Nothing ships to the browser. That is why a guard must exist in code for data crossing a network, storage, or DOM boundary — the compiler cannot be the runtime check.

The handbook's [Everyday Types page](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) notes the same erasure: "Type annotations are erased at compile time." And because erased types cannot validate `JSON.parse` output, the runtime check is real JavaScript — [MDN documents `JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), the function your guards must wrap.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| `as User` to silence an unknown API response | Convenience | It is an assertion, not validation; guard at runtime |
| Treating `email?: string` as "any value is acceptable" | Misreading optionality | Optional means the property may be absent, nothing more |
| Reading a field that only one union arm has | Laziness | Narrow by the discriminator first |
| Assuming types validate `JSON.parse` output | Trusting the editor | Types describe; guards prove |
| Making every shape an interface | Habit | Interface for object shapes, type alias for unions and composition |

## The TypeScript layer

### The annotation is checked before execution

The colon annotation is a compile-time contract. TypeScript checks it when you run `npm run check` and when your editor opens the file; it is erased from the emitted JavaScript. The value you store must match the shape you declared.

### What TypeScript cannot decide

TypeScript cannot decide what a server sends, what a user types into a form, or what an object becomes after `JSON.parse`. Those values start as `unknown` and need runtime guards. The type layer reduces whole classes of mistakes; it does not replace checking.

### One compiler error, walked through

Open `36_day_ts_types/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const role: 'admin' | 'user' = 'guest'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Type '"guest"' is not assignable to type '"admin" | "user"'.
```

Read it as: *"`role` is a literal union with exactly two allowed values, and `'guest'` is a third value the contract did not list."* The fix is to use a value the union allows:

```ts
const role: 'admin' | 'user' = 'user'
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

TypeScript types and interfaces are a compile-time contract that describes shape, narrows unions through a discriminator, and vanishes at runtime — while runtime guards, not assertions, are the only thing that validates data crossing a boundary.

## Learn more on MDN

### TypeScript docs

The official handbook is the authority on every construct in this lesson. Bookmark the pages that match what you just wrote:

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — interfaces, type aliases, unions, and literal types in one tour
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the full family of narrowing checks, including the `in` operator you used in guards
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) — optional properties, readonly, and index signatures
- [Type Manipulation](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) — what type aliases can compose beyond unions and tuples
- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — `value is Book` predicates and the `unknown` boundary

### MDN

- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the runtime function your guards must wrap
- [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) — the runtime type check behind every guard
- [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) — the runtime check for class instances
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) — what the emitted JavaScript can throw when a guard is missing

## Read the first example line by line

The first runnable example introduces **TypeScript Types and Interfaces — Designing the Data Contract**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const user = { id: 1, name: 'Mina' }` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `user.name = 42 // JavaScript allows this; a later function may fail` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **TypeScript Types and Interfaces — Designing the Data Contract**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **TypeScript Types and Interfaces — Designing the Data Contract**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What is passed to `message`, and which property narrows the union?
2. Why does `JSON.parse` still need a runtime guard in TypeScript?
3. When would an interface be clearer than a type alias?
4. Why is `as User` an assertion, not validation?
5. Run `npm.cmd run day36:js` and `npm.cmd run day36`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 271 Encode and Decode Strings — https://leetcode.com/problems/encode-and-decode-strings/ (hint: https://neetcode.io/problems/string-encode-and-decode/question) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Create a `Book` model with id, title, author, and optional `publishedAt`.
2. Model a `LoadingState` discriminated union with idle, loading, success, and error.
3. Write a function that handles every state and returns a readable string.
4. Write the JavaScript equivalent and explain what the compiler adds.
5. **TypeScript docs lookup:** Open the handbook section on [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) and find the `never` exhaustive check. Add a `'pending'` status to your `LoadingState` union, then write a `switch` with an `exhaustive` branch — comment on what the compiler tells you when a case is missing.

### Level 3 — Creative synthesis

1. The shape guard: implement `isBook(value: unknown): value is Book` and comment on what a type alias could not provide by itself.
2. The extendable model: create `Employee extends User` and comment on when interface inheritance beats repeating fields.
3. The exhaustive state: add a new status to `LoadingState` and comment on what the compiler tells you about every switch.
4. The assertion trap: replace a runtime guard with `as Book` and comment on what breaks the moment the data does not match.

## Finish line

Day 36 is complete when you can do all of these **without notes**:

1. Model an object shape with an interface.
2. Compose unions, tuples, and primitives with a type alias.
3. Narrow a discriminated union with a `status` or `ok` field.
4. Keep a runtime guard for data crossing a boundary.
5. Explain why an assertion is not validation.

If any answer is a guess, revisit the matching section before Day 37.

## Prove it

Write, in your own words, a short answer to each:

1. What is passed to `message`, and which property narrows the union?
2. Why does `JSON.parse` still need a runtime guard in TypeScript?
3. When would an interface be clearer than a type alias?
4. Why is `as User` an assertion, not validation?
5. Why does `role = 'guest'` fail, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 37: TypeScript Generics — One Function, Many Types](../37_day_ts_generics/37_day_ts_generics.md).

**Day 36 complete.** TypeScript types and interfaces are a compile-time contract that describes shape, narrows unions through a discriminator, and vanishes at runtime — while runtime guards, not assertions, are the only thing that validates data crossing a boundary.