# Day 15: Numbers and Math — Parsing, Precision, and Calculation

[← Previous lesson](../14_day_strings/14_day_strings.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../16_day_dates/16_day_dates.md)



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
  - [JavaScript has one ordinary number type](#javascript-has-one-ordinary-number-type)
  - [Convert input deliberately](#convert-input-deliberately)
  - [Calculate with intention](#calculate-with-intention)
  - [Format only at the display boundary](#format-only-at-the-display-boundary)
  - [The decimal precision trap](#the-decimal-precision-trap)
  - [Randomness is not security](#randomness-is-not-security)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Model uncertainty with a union return](#model-uncertainty-with-a-union-return)
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

Values from form inputs, URLs, CSV files, and APIs arrive as **text**. A price such as `'19.99'` looks numeric to a human but is still a string to JavaScript. Arithmetic on it fails silently or produces surprising results, and decimal math has a precision trap that breaks naive equality checks.

This lesson teaches the complete path for numeric work: receive text, convert it deliberately, reject bad data, calculate, and format the result only at the display boundary. Each step has a tool and a trap — and knowing the trap is what separates working code from code that "mostly works."

## Prerequisites

- Day 3: operators, comparisons.
- Day 4: conditionals.
- Day 7: functions, `return`.
- Day 14: strings, trimming, validation.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- convert text to a number with `Number`, `parseInt`, and `parseFloat`;
- detect bad input with `Number.isFinite` and reject empty input before converting;
- round, floor, ceil, min, and max with `Math`;
- clamp a value into a range;
- format currency and decimals only at the display boundary;
- compare decimals with a tolerance instead of strict equality;
- write a safe random integer for games and practice (not security);
- run this course's Day 15 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why `Number('')` is `0` and why that is risky;
- why `NaN` must be tested with `Number.isNaN`, not `=== NaN`;
- why currency formatting happens after calculation;
- why `0.1 + 0.2` is not `0.3` and what to do about it;
- why `toFixed` returns a string and should not feed later arithmetic;
- why `Math.random()` is not suitable for secrets.

## The problem this solves

A form sends a quantity as text. The app must parse it, reject nonsense, calculate, and show a formatted result:

```js
function readQuantity(text) {
  const trimmed = text.trim()
  const quantity = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(quantity)) {
    return null
  }

  return quantity
}
```

This function has **two** possible results: a number means valid input; `null` means no usable quantity. That is clearer than quietly turning bad data into zero — a zero quantity could silently cancel an order.

The path is the theme of the day: **receive text → convert → reject bad data → calculate → format**. Skipping the reject step is how garbage becomes silent bugs.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **JavaScript has one ordinary number type** | The lesson explains javascript has one ordinary number type through runnable examples and practice. |
| **Convert input deliberately** | The lesson explains convert input deliberately through runnable examples and practice. |
| **Calculate with intention** | The lesson explains calculate with intention through runnable examples and practice. |
| **Format only at the display boundary** | The lesson explains format only at the display boundary through runnable examples and practice. |
| **The decimal precision trap** | The lesson explains the decimal precision trap through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [JavaScript has one ordinary number type](#javascript-has-one-ordinary-number-type)
- [Convert input deliberately](#convert-input-deliberately)
- [Calculate with intention](#calculate-with-intention)
- [Format only at the display boundary](#format-only-at-the-display-boundary)
- [The decimal precision trap](#the-decimal-precision-trap)

## JS runtime deep dive

### JavaScript has one ordinary number type

JavaScript uses `number` for whole numbers and decimals:

```js
const lessonsCompleted = 15
const price = 19.99
const temperature = -4.5
```

There is also `bigint` for extremely large whole numbers, but ordinary product work begins with `number`. Do not mix `number` and `bigint` in one calculation.

### Convert input deliberately

Use `Number` when the whole string must represent a number:

```js
Number('42')       // 42
Number('  3.5 ')   // 3.5
Number('')         // 0 — surprising; validate empty input first
Number('3.5px')    // NaN
```

Use `parseInt` or `parseFloat` only when you deliberately accept a numeric prefix:

```js
parseInt('12px', 10) // 12
parseFloat('3.5rem') // 3.5
```

For a price field, accepting `'12dollars'` as `12` is usually a bug. Prefer `Number` after checking for an empty string.

`NaN` means "not a number." It is a special number value, so testing it requires `Number.isNaN` — `NaN === NaN` is `false`:

```js
console.log(NaN === NaN) // false
console.log(Number.isNaN(NaN)) // true
```

`Number.isFinite` is even more useful for validation because it also rejects `Infinity` and `-Infinity`:

```js
Number.isFinite(Number('42'))    // true
Number.isFinite(Number('3.5px')) // false
Number.isFinite(Infinity)        // false
```

The conversion toolset is bigger than three functions. [Read about `Number` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) to meet `Number.MAX_SAFE_INTEGER` and the `Number.isInteger`/`Number.isSafeInteger` checks, and see [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) and [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) for edge cases like the radix argument and numeric prefixes.

### Calculate with intention

`Math` gives named operations:

```js
Math.round(4.5) // 5
Math.floor(4.9) // 4
Math.ceil(4.1)  // 5
Math.min(3, 9)  // 3
Math.max(3, 9)  // 9
```

A clamp keeps a value inside an allowed range:

```js
function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

clamp(120, 0, 100) // 100
```

Read it from the inside out: `Math.max` raises a value below the minimum; `Math.min` then lowers a value above the maximum.

`Math` is a toolbox, not a single function — [browse the full Math reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) for `Math.abs`, `Math.pow`, `Math.sqrt`, `Math.trunc`, `Math.hypot`, `Math.sign`, and more. You only need a handful today; knowing the whole toolbox is what lets you reach for the right one later.

### Format only at the display boundary

Keep values as numbers while calculating. Format them only when presenting them:

```js
const subtotal = 1234.5
const label = subtotal.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})

console.log(label) // $1,234.50 in an en-US environment
```

`toFixed` is useful for displaying a fixed number of decimal places, but it returns a **string**:

```js
console.log((3.5).toFixed(2)) // '3.50' (a string)
```

Do not use a formatted string as the next calculation input. Formatting is the last step, not a step in the middle.

`toLocaleString` is one method on a number; [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) is the same engine as a reusable object — read its MDN page to meet percent, unit, and compact-notation styles you can apply at the display boundary.

### The decimal precision trap

Computers store ordinary JavaScript numbers in binary floating point. Many decimal fractions cannot be stored exactly:

```js
console.log(0.1 + 0.2)         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false
```

Do not compare calculated decimal values for strict equality. For a small tolerance:

```js
function nearlyEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON
}

console.log(nearlyEqual(0.1 + 0.2, 0.3)) // true
```

For money, do calculations in the smallest unit you control (such as cents), or use a decimal-money approach chosen by your team. Formatting to two decimals does not repair a calculation.

JavaScript numbers are IEEE-754 binary floating point. [Read MDN's floating-point guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#Floating_point_equality) to understand why `0.1 + 0.2` lands on `0.30000000000000004`, and meet `Number.EPSILON`, `Number.MAX_VALUE`, and the safe-integer limits.

### Randomness is not security

`Math.random` returns a number from `0` up to, but **not including**, `1`. It is fine for a dice game or a random practice prompt:

```js
function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}
```

It is **not** appropriate for passwords, authentication tokens, or security-sensitive IDs. Browser code should use the Web Crypto APIs for those cases — [read about `crypto.getRandomValues` on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues), which is designed for exactly that job.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Trusting `Number('')` to be `0` | `Number('')` returns `0` | Reject empty input before converting |
| Testing `value === NaN` | `NaN` never equals itself | Use `Number.isNaN(value)` |
| Comparing `0.1 + 0.2 === 0.3` | Binary floating point is inexact | Compare with a tolerance or work in cents |
| Feeding `toFixed` output into arithmetic | `toFixed` returns a string | Keep numbers for math; format at display |
| Using `Math.random()` for tokens or passwords | It is not cryptographically secure | Use Web Crypto for secrets |
| Accepting `'12dollars'` as `12` | `parseInt` reads a numeric prefix | Use `Number` for whole-string values |

## The TypeScript layer

### Model uncertainty with a union return

The runtime conversion is JavaScript. TypeScript makes the result shape explicit:

```ts
function readQuantity(text: string): number | null {
  const trimmed = text.trim()
  const quantity = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(quantity)) {
    return null
  }

  return quantity
}

const quantity = readQuantity('3')
if (quantity !== null) {
  console.log(quantity * 2)
}
```

The null check is required because the function honestly says that parsing can fail. This is the useful TypeScript habit: **model uncertainty** instead of pretending invalid input cannot happen.

### What TypeScript cannot decide

TypeScript knows `readQuantity` may return `null`; it cannot know what your app should *do* when it does — show a message, default to one, or refuse to submit. And TypeScript cannot detect the precision trap: `0.1 + 0.2 === 0.3` is perfectly typed and perfectly wrong. Decimal correctness is a runtime decision your tests must prove. The same applies to `Math.random`: it is typed as a number either way, and whether that number is safe for authentication is a product decision.

### One compiler error, walked through

Open `15_day_numbers/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
console.log(quantity.toFixed(2))
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
'quantity' is possibly 'null'.
```

Read it as: *"You called a number method on a value that may be `null` — `readQuantity` returns `number | null` because parsing can fail."* The fix is to narrow first:

```ts
if (quantity !== null) {
  console.log(quantity.toFixed(2))
}
```

Inside the `if`, TypeScript knows `quantity` is a number. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Numbers arrive as text and must be converted, validated, calculated, and formatted in that order — with `Number.isFinite` rejecting bad input, `Math` for calculation, formatting only at the display boundary, and a tolerance (or cents) for decimal comparisons — while TypeScript forces you to handle the `number | null` reality of parsing.

## Learn more on MDN

This lesson walks the full numbers pipeline — convert, validate, calculate, format — but each tool is bigger than one day. Bookmark these pages and return as you grow:

- [Numbers and dates (JavaScript guide)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates) — the whole landscape in one place
- [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — `toFixed`, `toPrecision`, `Number.MAX_SAFE_INTEGER`, `Number.isInteger`, and more
- [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) — `abs`, `pow`, `sqrt`, `trunc`, `hypot`, `sign`, and more
- [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) — the radix argument and when a numeric prefix is acceptable
- [parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) — reading a leading decimal number
- [Number.isNaN / Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) — strict numeric checks that reject `NaN` and infinities
- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) — currency, percent, and locale-aware formatting as a reusable object
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) — whole numbers beyond `Number.MAX_SAFE_INTEGER`
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — secure random values and cryptography

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — `number`, `bigint`, and annotation basics
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how the compiler narrows unions like `number | null` after a check

## Read the first example line by line

The first runnable example introduces **Numbers and Math — Parsing, Precision, and Calculation**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `function readQuantity(text) {` | Function syntax: this line defines reusable behavior or an arrow function. |
| 2 | `  const trimmed = text.trim()` | Declaration or assignment: the runtime creates or updates a named value. |
| 3 | `  const quantity = Number(trimmed)` | Declaration or assignment: the runtime creates or updates a named value. |
| 4 | `` | Blank line: it separates ideas for the reader. |
| 5 | `  if (trimmed === '' \|\| !Number.isFinite(quantity)) {` | Control-flow statement: the runtime decides whether or how this block runs. |
| 6 | `    return null` | Return statement: the function sends a result back to its caller. |
| 7 | `  }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 8 | `` | Blank line: it separates ideas for the reader. |
| 9 | `  return quantity` | Return statement: the function sends a result back to its caller. |
| 10 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Numbers and Math — Parsing, Precision, and Calculation**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Numbers and Math — Parsing, Precision, and Calculation**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `Number('42')`, `Number('  3.5 ')`, `Number('')`, `Number('3.5px')` — four results.
2. `parseInt('12px', 10)` and `parseFloat('3.5rem')` — two results.
3. `Math.round(4.5)`, `Math.floor(4.9)`, `Math.ceil(4.1)` — three results.
4. `Math.min(Math.max(120, 0), 100)` — what is the result, and what does it do?
5. `0.1 + 0.2 === 0.3` — true or false, and why?
6. `(3.5).toFixed(2)` — what type is the result?
7. `NaN === NaN` — true or false? What should you use instead?
8. `Math.floor(Math.random() * 6) + 1` — what range of values can it produce?
9. `Number.isFinite(Number('42'))` versus `Number.isFinite(Number('3.5px'))` — two results.
10. Run `npm.cmd run day15:js` and `npm.cmd run day15`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 202 Happy Number — https://leetcode.com/problems/happy-number/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Write `readPercentage(text)` that returns a number from `0` through `100`, or `null` for an empty, non-numeric, or out-of-range input.
2. Write `formatCents(cents, locale, currency)` that converts integer cents to a localized currency label (e.g. `1234` → `$12.34`).
3. Write `clamp(value, minimum, maximum)` and verify `clamp(120, 0, 100)`, `clamp(-5, 0, 100)`, `clamp(50, 0, 100)`.
4. Write `rollDie()` and run it a few times, confirming the range with a comment.
5. TypeScript: write `readPercentage` with precise types — `string` in, `number | null` out. Do not use `any`.
6. Write `nearlyEqual(a, b)` and verify it returns `true` for `0.1 + 0.2` versus `0.3`.
7. Read the [Math reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math). Copy one small example into the starter. Run it and write down what it does.

### Level 3 — Creative synthesis

1. Write the range reader: write `randomInteger(minimum, maximum)` that includes **both** endpoints. State what should happen if `minimum` is greater than `maximum`, and implement your decision.
2. Write the validator: write `readNonNegative(text)` that returns a non-negative number or `null`. Compare your empty-input handling with `readQuantity` from the lesson.
3. Write the safe total: write `totalInCents(priceText, quantityText)` that multiplies a parsed price by a parsed quantity, working entirely in cents, and returns `null` if either input is invalid.
4. Write the display helper: write `formatPrice(price)` using `toLocaleString` with the `'USD'` currency, and `formatPercent(value)` with the `'percent'` style. Call both on the same value.
5. Write two short comments. Say when money should avoid decimal fractions. Say why `Math.random` is fine for a dice game but not for a password.

## Finish line

Day 15 is complete when you can do all of these **without notes**:

1. Convert text with `Number`, `parseInt`, and `parseFloat` and state when each is appropriate.
2. Reject empty and non-finite input before returning a number.
3. Clamp a value into a range with `Math.min`/`Math.max`.
4. Format currency and decimals only at the display boundary.
5. Compare decimals with a tolerance, or work in cents for money.
6. Explain why `NaN` must be tested with `Number.isNaN`.
7. Explain why `Math.random` is not suitable for security.
8. Model a parse result as `number | null` in TypeScript and narrow before use.

If any answer is a guess, revisit the matching section before Day 16.

## Prove it

Write, in your own words, a short answer to each:

1. Why is `Number('')` risky without a separate empty-input check?
2. Why is `Number.isNaN` better than comparing a value to `NaN`?
3. Why should currency formatting happen after calculation?
4. Why does `readQuantity` return `number | null` rather than always a number?
5. Why is `0.1 + 0.2 === 0.3` false, and what are the two practical responses?
6. What does the type checker know that your tests must still verify about numbers?

Your answers are today's evidence. If you can write them, move to [Day 16: Dates and Time — Moments and Durations](../16_day_dates/16_day_dates.md).

**Day 15 complete.** Numeric work now follows one path — convert, validate, calculate, format — and the traps are named: empty input, `NaN`, binary decimal precision, string-typed formatting, and randomness that must never guard a secret.