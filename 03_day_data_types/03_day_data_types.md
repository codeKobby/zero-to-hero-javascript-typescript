# Day 3: Data Types — What a Value Is, and How to Ask

[← Previous lesson](../02_day_variables/02_day_variables.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../04_day_operators/04_day_operators.md)



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
  - [A type is a contract about meaning](#a-type-is-a-contract-about-meaning)
  - [The seven primitive types](#the-seven-primitive-types)
  - [The five types you will use daily](#the-five-types-you-will-use-daily)
  - [Reference types: arrays and objects](#reference-types-arrays-and-objects)
  - [Two values for "nothing": undefined and null](#two-values-for-nothing-undefined-and-null)
  - [typeof and its two famous lies](#typeof-and-its-two-famous-lies)
  - [The + trap: when operators change meaning](#the-trap-when-operators-change-meaning)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Annotations say which type a name may hold](#annotations-say-which-type-a-name-may-hold)
  - [Inference keeps the obvious obvious](#inference-keeps-the-obvious-obvious)
  - [Union types model missing values](#union-types-model-missing-values)
  - [What TypeScript cannot catch](#what-typescript-cannot-catch)
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

Day 2 gave values names. Today is about the values themselves. Every value in a program carries a **type**, and the type decides which operations make sense: you can add numbers, you can join strings, and you cannot meaningfully multiply a boolean by a person.

Getting types wrong is the single most common source of subtle bugs in JavaScript — not because the language is broken, but because it *tries to be helpful* and silently converts values instead of stopping you. Today you learn exactly what each type means, how to ask a value what it is, where the language lies to you, and how TypeScript turns "guess the type" into "the compiler enforces the type."

## Prerequisites

- Day 1: how programs run.
- Day 2: variables, `let`/`const`, the difference between `undefined` and `ReferenceError`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create and log a value of each primitive type;
- use `typeof` correctly — and explain its two quirks;
- write a TypeScript union type like `string | null` and check both branches;
- run this course's Day 3 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what a type actually is, in one sentence;
- the difference between primitive and reference values, with a runtime picture;
- the real difference between `undefined` and `null` — and why both exist;
- why `1 + 1` is `2` but `'1' + '1'` is `'11'`;
- what TypeScript adds to data types, and what it cannot catch.

## The problem this solves

Look at these two lines:

```js
console.log(1 + 1)     // 2
console.log('1' + '1') // '11'
```

Same operator, same visible shape, different answer. The values look similar, but their **types** are different — and the runtime chose a different behavior for each. Now imagine the same thing happening inside real data: a form field that arrives as a string when your code expected a number, a missing value you treat as "empty string" when it is actually `null`. Each of those is a type problem wearing a disguise.

This lesson gives you the vocabulary and the runtime picture to see through the disguise — and shows you how TypeScript makes the type of a value explicit instead of guessable.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **primitive** | A basic value such as a string, number, or Boolean. |
| **object** | A value that groups properties and can have identity. |
| **null** | An intentional empty value. |
| **typeof** | An operator that reports a value category. |
| **union type** | A TypeScript type that permits one of several alternatives. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [A type is a contract about meaning](#a-type-is-a-contract-about-meaning)
- [The seven primitive types](#the-seven-primitive-types)
- [The five types you will use daily](#the-five-types-you-will-use-daily)
- [Reference types: arrays and objects](#reference-types-arrays-and-objects)
- [Two values for "nothing": undefined and null](#two-values-for-nothing-undefined-and-null)

## JS runtime deep dive

### A type is a contract about meaning

A type answers three questions about a value:

1. What is this value?
2. What operations make sense on it?
3. How does it behave when stored or compared?

A string is text; it joins, slices, and measures length. A number is a quantity; it adds, multiplies, and compares. A boolean is a decision; it is `true` or `false`, nothing in between.

```js
const greeting = 'Hello' // string: text
const count = 7          // number: quantity
const isOpen = true      // boolean: decision
```

The runtime stores each value together with its type. When you write an expression, the type is part of the calculation — which is why `1 + 1` and `'1' + '1'` diverge.

### The seven primitive types

A **primitive** value is a single value with no named parts. JavaScript has seven primitive types:

| Type | Example | Meaning |
| --- | --- | --- |
| `string` | `'Ada'` | text |
| `number` | `42` | numbers, including decimals |
| `boolean` | `true` | yes or no |
| `undefined` | `undefined` | declared, not yet assigned |
| `null` | `null` | intentionally empty |
| `bigint` | `9007199254740993n` | very large exact integers |
| `symbol` | `Symbol('id')` | unique, unguessable identifier |

You will touch five of these constantly: string, number, boolean, undefined, null. Bigint and symbol are real and you should recognize them, but they are specialized tools you reach for rarely.

The seven types are cataloged in [MDN's data structures reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures), and the two you rarely use each get their own page — [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) for very large exact integers, [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) for unique identifiers — so you can recognize them when you meet them.

### The five types you will use daily

**String** — text, always written inside quotes:

```js
const name = 'Ada'
console.log(name.length)     // 3
console.log(name + ' L.')    // Ada L.
console.log(name.toUpperCase()) // ADA
```

**Number** — the ordinary numeric type, including decimals and the special values:

```js
const price = 12.5
const quantity = 3
console.log(price * quantity) // 37.5

console.log(typeof NaN) // "number" — even "not a number" is a number
console.log(Infinity)   // Infinity
```

`NaN` is a number type whose value is "not a valid number." It is the result of math that fails, like `0 / 0`. It has a nasty habit: `NaN === NaN` is `false`. We will meet it again and give it the respect it demands.

The full picture of the numeric type — the special values, the methods, and the constants like `Number.MAX_SAFE_INTEGER` — lives in [the Number reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number).

**Boolean** — the two decisions:

```js
const isLoggedIn = true
const isAdmin = false
```

**`undefined`** — a declared name with no value yet (you met this in Day 2):

```js
let searchText
console.log(searchText) // undefined
```

**`null`** — the program deliberately says "there is nothing here":

```js
const selectedUser = null
```

Both `undefined` and `null` mean *absence*, and they are not interchangeable in meaning. Keep the distinction crisp: `undefined` is *the runtime hasn't given a value*, `null` is *the program chose no value*. A search box that was never typed into is `undefined`; a search that returned nothing is `null`. That distinction becomes behavior later: "no input yet" and "no results" should not be handled the same way.

### Reference types: arrays and objects

Primitives are single values. **Reference** values are collections with named parts — arrays and objects. They behave differently at runtime, and the difference is the source of a classic bug.

```js
const colors = ['red', 'blue']
const user = { name: 'Ada', age: 36 }
```

The variable does not hold the collection itself. It holds a **reference** — a pointer to the collection somewhere in memory. This is the box-and-label picture from Day 2, with one new idea: the box holds an address, not the contents.

```
box: [ colors -> [ 'red', 'blue' ] ]
```

Because the box holds a reference, assigning one variable to another does not copy the array; both names point at the same collection:

```js
const firstList = ['red']
const secondList = firstList  // both names, one array

secondList.push('blue')       // change through one name...
console.log(firstList)        // ...and the other name sees it: ['red', 'blue']
```

This is exactly why Day 2's `const colors` still allowed `colors.push` — `const` locks the *name*, and the name holds a reference, while the array behind the reference is free to change.

The practical consequence: if you want an independent copy, you must say so explicitly (`[...firstList]` — a spread — or `.slice()`). We cover arrays properly later; today the rule is: *assignment shares, it does not copy.*

### Two values for "nothing": undefined and null

Both are primitives. Both mean absence. They are different values with different jobs:

```js
let unassigned            // undefined: the runtime has not been told a value
const emptyByChoice = null // null: the program decided "no value here"
```

- Use `undefined` to let the runtime report *"this was never set."*
- Use `null` when *you* set it, to mean *"I looked, and there is nothing."*

A note on comparison: because they are different values, `undefined == null` is `true` (loose equality) but `undefined === null` is `false` (strict equality). Strict equality is what you will use. We cover comparison operators tomorrow; today, just know they are distinct.

### typeof and its two famous lies

JavaScript lets you ask a value what it is:

```js
console.log(typeof 'Ada')       // "string"
console.log(typeof 42)          // "number"
console.log(typeof true)        // "boolean"
console.log(typeof undefined)   // "undefined"
console.log(typeof 10n)         // "bigint"
console.log(typeof Symbol('x')) // "symbol"
```

Two results are traps, and both come from history:

```js
console.log(typeof null)  // "object"   — WRONG: null is a primitive
console.log(typeof [])    // "object"   — right, but useless: is it an array?
```

`typeof null` returning `"object"` is a decades-old bug kept for compatibility. You cannot trust it. The correct test for "is this exactly null" is direct comparison:

```js
const value = null
console.log(value === null) // true
```

For arrays, `typeof` is correct but unhelpful — it says `"object"` for arrays, objects, and null. The precise test is:

```js
console.log(Array.isArray([]))    // true
console.log(Array.isArray({}))    // false
```

Rule of thumb: `typeof` for primitives, `=== null` for null, `Array.isArray` for arrays.

Every result `typeof` can return, including the edge cases, is listed in [the typeof reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

### The + trap: when operators change meaning

The `+` operator is polite to a fault. For two numbers it adds; the moment either side is a string, it joins:

```js
console.log(1 + 1)      // 2
console.log('1' + '1')  // '11'
console.log(1 + '1')    // '11' — the number is converted to a string
console.log('Total: ' + 42) // 'Total: 42'
```

That is how you should read `'Total: ' + 42`: the runtime converts the number to text so the `+` can join. It is convenient for printing and a silent trap for math. A variable you *believe* is a number can arrive from a form, a file, or an API as a string, and `+` will quietly join instead of add:

```js
const formInput = '5'   // arrives as text
console.log(formInput + 5) // '55' — not 10
```

The fix is to convert explicitly when you mean arithmetic: `Number(formInput)` or `+formInput`. The mental rule: **`+` adds only when both sides are numbers.** Other operators are less forgiving — `'5' - 2` is `3` because `-` has no string meaning, so it converts. Remember this asymmetry; it will save you an afternoon of debugging later.

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| Testing `typeof null` | Returns `"object"`, misleading you | `value === null` |
| Testing `typeof []` to check for arrays | Returns `"object"` | `Array.isArray(value)` |
| Treating `undefined` and `null` as identical | Correct distinction is lost | Decide: unassigned, or chosen empty? |
| Assigning one array to another and expecting a copy | Both names share one array | Use a spread: `[...list]` |
| Expecting `'5' + 5` to be 10 | It is `'55'` (string join) | Convert first: `Number('5') + 5` |
| Expecting `NaN === NaN` to be true | It is `false` | Use `Number.isNaN(value)` |
| Assuming a form value is a number | It arrives as a string | Convert with `Number(...)` at the boundary |
| Forgetting `symbol` and `bigint` exist | Confused by strange `typeof` output | Recognize them, reach for them rarely |

Each row is a real, silent bug waiting to happen — and the first six are the kind a TypeScript annotation would have caught or made visible.

## The TypeScript layer

Data types are where TypeScript stops being a nice-to-have and becomes a second pair of eyes.

### Annotations say which type a name may hold

```ts
const name: string = 'Ada'
const count: number = 42
const isOpen: boolean = true
```

The annotation is a contract: this name holds this type, full stop. JavaScript lets a variable change type silently; TypeScript refuses:

```js
// JavaScript:
let score = 10
score = 'ten' // fine, silent

// TypeScript:
let score: number = 10
score = 'ten' // error: Type 'string' is not assignable to type 'number'.
```

The error is the feature: the wrong assignment is caught while the code is still on your screen, not three screens away at runtime.

### Inference keeps the obvious obvious

You rarely need to write the annotation for obvious cases — TypeScript reads the value:

```ts
const city = 'London' // inferred: string
let score = 0         // inferred: number
const isActive = true // inferred: boolean
```

Inference is the default and it is almost always right for `const` with an initial value. Annotate when there is nothing to infer — a declaration without a value — or when the annotation documents intent:

```ts
let userName: string // no value yet, so no inference
```

### Union types model missing values

Here is where TypeScript shines for data. A value that may legitimately be missing gets a **union type**:

```ts
let selectedUserName: string | null = null

selectedUserName = 'Ada' // fine
selectedUserName = null  // fine
```

The `|` reads "or": this name holds a string, or it holds null. The consequence is a *promise*: later code cannot use it as a string until it has checked. TypeScript enforces the check:

```ts
if (selectedUserName !== null) {
  console.log(selectedUserName.toUpperCase()) // safe: TypeScript knows it's a string here
}
```

Without the check, TypeScript stops you — which is precisely the bug it is designed to kill: using a possibly-missing value as if it were there.

The same applies to `undefined`:

```ts
let futureGoal: string | undefined
if (futureGoal !== undefined) {
  console.log(futureGoal.toUpperCase())
}
```

Day 2 introduced `string | undefined`; today `string | null` joins it. In a few days you will learn the shorthand that covers "string, or any flavor of missing" in one gesture.

### What TypeScript cannot catch

TypeScript checks *types*, not *truth* and not *reality*:

```ts
const price: number = 12.5
const total = price * 3 // fine. Is the formula right? Unknown.
```

It cannot tell you the business formula is correct, that a network call succeeded, or that a user typed what they should. Those are runtime problems. The junior's superpower is knowing which category a bug belongs to — type, logic, or runtime — because the fix differs for each.

### One compiler error, walked through

Open `03_day_data_types/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
const wrongScore: number = 'forty-two'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Type 'string' is not assignable to type 'number'.
```

Read it as: *"I asked for a number, you handed me a string; the contract is broken."* The two valid fixes are the teaching moment:

- if the value really is a score, write `const wrongScore: number = 42`;
- if it is text, write `const wrongScore: string = 'forty-two'`.

Which one you choose depends on what the value means — and *that* is the decision TypeScript leaves to you. Comment the broken line back out when finished so the starter keeps passing `npm run check`.

## One-sentence mental model

Every value carries a type that decides how it behaves; primitives are single values, reference values are shared collections pointed at by names, `undefined` and `null` are two different kinds of absence, and TypeScript makes the allowed type of each name a contract enforced before runtime.

## Learn more on MDN

Day 3 is about what a value is, and MDN has the vocabulary for all of it. Bookmark these pages and return as you grow:

- [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) — the seven primitive types and how they behave at runtime
- [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) — the operator behind today's two famous lies
- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) — the value for "declared but never set"
- [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) — the value for "chosen nothing"
- [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — the numeric type, its special values, and its methods
- [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) — the reliable test for arrays
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) — exact integers beyond the ordinary number range
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) — unique, unguessable identifiers

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind today's contracts
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how the `!== null` checks you wrote narrow a union to one type

## Read the first example line by line

The first runnable example introduces **Data Types — What a Value Is, and How to Ask**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `console.log(1 + 1)     // 2` | Output call: the program displays the evaluated value in the console. |
| 2 | `console.log('1' + '1') // '11'` | Output call: the program displays the evaluated value in the console. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Data Types — What a Value Is, and How to Ask**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Data Types — What a Value Is, and How to Ask**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each, predict the exact output before running, then run and compare.

1. `console.log(typeof 'Ada')`
2. `console.log(typeof 42)`
3. `console.log(typeof true)`
4. `console.log(typeof undefined)`
5. `console.log(typeof null)` — predict first, then let it surprise you
6. `console.log(typeof [])` and `console.log(typeof {})`
7. `console.log('1' + 1)` and `console.log(1 + '1')`
8. `console.log(Number('5') + 5)`
9. `console.log(Array.isArray([]))` and `console.log(Array.isArray({}))`
10. Run `npm.cmd run day3:js` and `npm.cmd run day3`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write a program that creates and logs one value of each of the seven primitive types, with a comment naming each type.
2. Write a program that logs `typeof` for each of the seven values from exercise 1, and compare the output against your expectations.
3. Write a program that demonstrates the shared-reference array behavior: create an array, copy the reference to a second name, change it through the second name, and log the first.
4. Write a program that shows `undefined` and `null` as different values, using `console.log` and a comment explaining the difference in meaning.
5. Write a program that uses `Number.isNaN` to check two expressions, one of which is `NaN`, and explains in a comment why `NaN === NaN` is false.
6. In TypeScript, create a `string | null` variable, assign `null` to it, then safely print its length inside an `if` check.
7. **MDN lookup:** Open the [typeof reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof), read how `typeof` reports a function, then log `typeof function named() {}`. Comment on why the result is not one of the seven primitive types.

### Level 3 — Creative synthesis

1. A "type report card": a single program that builds a small table of values and their true type — using `typeof` for primitives, `=== null` for null, and `Array.isArray` for arrays. Print all three categories.
2. A form-arithmetic bug: simulate a form that delivers `'5'` as a string, then show the wrong way (`formInput + 5`) and the right way (`Number(formInput) + 5`) side by side, each with a comment.
3. A `null` vs `undefined` story: write a mini-program modeling a login box — `undefined` when the user has not typed, `null` when they submitted empty — and log the difference with comments.
4. TypeScript challenge: write a function-like experiment where a value is typed `number | null`, and demonstrate that the `.toFixed(2)` call only works inside the `!== null` branch — then explain why TypeScript demands the check.
5. Write, in comments, a short "type decision tree" you would use when debugging: how to tell a string, a number, a boolean, an array, an object, `undefined`, and `null` apart — the exact operator or method you would use for each.

## Finish line

Day 3 is complete when you can do all of these **without notes**:

1. Create and log one value of each primitive type.
2. Predict `typeof` for any primitive value, including the two traps.
3. Test for `null` and for arrays using the correct tools.
4. Explain why `'5' + 5` is `'55'` but `'5' - 2` is `3`.
5. Explain the shared-reference behavior of arrays and objects.
6. Write a `string | null` annotation and check both branches.

If any answer is a guess, revisit the matching section before Day 4.

## Prove it

Write, in your own words, a short answer to each:

1. What is a type, and what does it decide?
2. Name the seven primitive types and give one example of each.
3. What is the real difference between `undefined` and `null`?
4. Why is `typeof null` unreliable, and what is the correct test?
5. Why does assigning one array to another not copy it, and how do you copy it?
6. What does TypeScript's `string | null` force you to do, and why is that a feature?

Your answers are today's evidence. If you can write them, move to [Day 4: Operators — Math, Truth, and Comparison](../04_day_operators/04_day_operators.md).

**Day 3 complete.** You know what a value's type means, how to ask a value what it is, where the language lies to you, and how TypeScript makes types a contract instead of a guess.
