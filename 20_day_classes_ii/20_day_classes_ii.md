# Day 20: Designing Classes — Contracts and Data Hiding

[← Previous lesson](../19_day_classes_i/19_day_classes_i.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../21_day_modules/21_day_modules.md)



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
  - [Classes should protect meaningful rules](#classes-should-protect-meaningful-rules)
  - [JavaScript private fields are truly private](#javascript-private-fields-are-truly-private)
  - [Getters are property-shaped methods](#getters-are-property-shaped-methods)
  - [Keep money as integers while calculating](#keep-money-as-integers-while-calculating)
  - [Prefer composition before inheritance](#prefer-composition-before-inheritance)
  - [Custom errors now make sense](#custom-errors-now-make-sense)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [TypeScript privacy is different](#typescript-privacy-is-different)
  - [Constructor shorthand and readonly](#constructor-shorthand-and-readonly)
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

A class's value is not hiding every field. It is keeping related state and the **rules that protect that state** together. A bank account should never silently accept a negative deposit or spend more than its balance. Those rules belong close to the balance.

This lesson teaches private fields, getters, integer money, and the composition-over-inheritance instinct — the design skills that separate a focused class from a bag of state.

## Prerequisites

- Day 19: classes, constructors, instances, methods.
- Day 18: throwing and catching errors.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- protect a field with a JavaScript `#private` field;
- expose read-only state through a getter;
- validate and mutate state through methods that enforce rules;
- store money as integer cents and format at the display boundary;
- write a custom error class and catch it separately;
- choose `readonly` and `private` modifiers in TypeScript;
- run this course's Day 20 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why an explicit method is better than letting any code assign a balance;
- the difference between `#private` at runtime and TypeScript `private`;
- why integer cents are safer than decimal dollars;
- when composition is clearer than inheritance;
- when a custom error is genuinely useful.

## The problem this solves

A bank account must enforce rules that a plain object cannot. Any code can set `account.balance = -50`. The class fixes that by hiding the balance and routing every change through a validated method:

```js
class BankAccount {
  #balanceInCents

  constructor(owner, initialBalanceInCents = 0) {
    if (!Number.isInteger(initialBalanceInCents) || initialBalanceInCents < 0) {
      throw new Error('Initial balance must be zero or more whole cents')
    }

    this.owner = owner
    this.#balanceInCents = initialBalanceInCents
  }

  get balanceInCents() {
    return this.#balanceInCents
  }

  deposit(cents) {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error('Deposit must be positive whole cents')
    }

    this.#balanceInCents += cents
  }
}
```

Code outside the class can read `account.balanceInCents` through the getter, but it cannot assign `account.#balanceInCents`. The class is the only place allowed to change its private balance.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **Classes should protect meaningful rules** | The lesson explains classes should protect meaningful rules through runnable examples and practice. |
| **JavaScript private fields are truly private** | The lesson explains javascript private fields are truly private through runnable examples and practice. |
| **Getters are property-shaped methods** | The lesson explains getters are property-shaped methods through runnable examples and practice. |
| **Keep money as integers while calculating** | The lesson explains keep money as integers while calculating through runnable examples and practice. |
| **Prefer composition before inheritance** | The lesson explains prefer composition before inheritance through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Classes should protect meaningful rules](#classes-should-protect-meaningful-rules)
- [JavaScript private fields are truly private](#javascript-private-fields-are-truly-private)
- [Getters are property-shaped methods](#getters-are-property-shaped-methods)
- [Keep money as integers while calculating](#keep-money-as-integers-while-calculating)
- [Prefer composition before inheritance](#prefer-composition-before-inheritance)

## JS runtime deep dive

### Classes should protect meaningful rules

The point of a class is not to hide every field. It is to keep related state and the rules that protect that state together. A bank account should never silently accept a negative deposit or spend more than its balance. Those rules belong close to the balance.

### JavaScript private fields are truly private

A field beginning with `#` can be read or written **only inside the class body**:

```js
// Outside the class, this throws a SyntaxError:
// account.#balanceInCents
```

JavaScript privacy is enforced at runtime. The class is the only place allowed to change its private balance. Private fields are a standard, mature part of the language — the [MDN private class features reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) documents `#` fields, private methods, and the `#field in obj` existence check.

### Getters are property-shaped methods

This call has no parentheses:

```js
console.log(account.balanceInCents)
```

It invokes the getter. A getter should usually be quick and unsurprising. It is good for exposing a derived read-only value. Do not hide expensive network calls, mutations, or risky work behind a property-looking access.

Prefer explicit methods for actions: `deposit`, `withdraw`, `rename`, and `closeAccount` communicate that state might change. The [MDN getter reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) documents the syntax and rules — a getter takes no arguments, and a setter is its write-side counterpart when you need to validate assignments.

### Keep money as integers while calculating

The example stores cents rather than decimal dollars. That avoids ordinary floating-point rounding surprises:

```js
account.deposit(250) // 250 cents, or $2.50
```

Formatting belongs at the display boundary:

```js
function formatCents(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
```

`Number.isInteger` does the guard work throughout this lesson — [MDN documents `Number.isInteger`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) and its sibling `Number.isFinite`, which you will reach for any time an unvalidated number enters a boundary.

### Prefer composition before inheritance

Inheritance says one class is a specialized form of another. That is sometimes correct, but it can create deep, fragile trees. Often a class should receive or own another focused object instead:

```js
class ProgressReporter {
  report(account) {
    return account.owner + ' has ' + account.balanceInCents + ' cents'
  }
}
```

The reporter **uses** an account; it is not a kind of account. This is composition. It keeps responsibilities narrow.

### Custom errors now make sense

Now that you know classes, you can create an error category when callers genuinely need to distinguish it:

```js
class InsufficientFundsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InsufficientFundsError'
  }
}
```

Use a custom error for a meaningful program decision, not merely to give every failed condition a new class.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Hiding every field behind private | Misunderstanding the purpose | Hide only state with rules to protect |
| Over-balance as a plain error | Losing the caller's decision | Use a custom error the caller can catch |
| Storing dollars as decimals | Convenience | Store cents as integers; format at the edge |
| Expensive work in a getter | Property-shaped access | Use an explicit method for real work |
| Inheritance before composition | Modeling "is a" by habit | Prefer "has/uses" until a real "is a" exists |

## The TypeScript layer

### TypeScript privacy is different

TypeScript `private` restricts access during type checking:

```ts
class BankAccount {
  private balanceInCents: number

  constructor(public readonly owner: string, initialBalanceInCents = 0) {
    this.balanceInCents = initialBalanceInCents
  }
}
```

JavaScript `#private` is **runtime** privacy. TypeScript `private` is a **compile-time** rule. When runtime secrecy or invariants matter, choose the JavaScript private field syntax deliberately — the starter uses `#balanceInCents` for exactly that reason.

### Constructor shorthand and readonly

`public readonly owner: string` in the constructor parameter list is shorthand that declares the field, marks it public, and forbids reassignment after construction. `readonly` means the reference cannot be reassigned — it does not make an object's contents immutable.

### What TypeScript cannot decide

TypeScript cannot decide which fields deserve runtime privacy versus compile-time rules, or which errors deserve their own class. It also cannot enforce business rules like "deposit must be positive" — those still live in the method bodies your tests must prove.

### One compiler error, walked through

Open `20_day_classes_ii/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
account.owner = 'Alex'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Cannot assign to 'owner' because it is a read-only property.
```

Read it as: *"The constructor shorthand declared `owner` as `readonly`; the reference cannot be reassigned after construction."* The fix is to pass the new value at construction time, not reassign later:

```ts
const renamed = new BankAccount('Alex', 1_000)
```

Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Design a class around the rules its state must obey — hide that state with a runtime `#` field, expose read-only values through getters, change state only through validated methods, keep money as integer cents, and prefer composition over inheritance.

## Learn more on MDN

Class design touches several reference pages — bookmark the ones that match the rules you just enforced:

- [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) — `#` fields, private methods, and `#field in obj` checks
- [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) — the syntax and rules of property-shaped reads
- [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) — the write-side counterpart for validated assignments
- [Number.isInteger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) — the runtime guard used on every money mutation
- [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) — rejecting `NaN` and `Infinity` at boundaries
- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) — the base class custom errors extend
- [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) — subclassing and the `super` call
- [Using classes guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) — composition versus inheritance trade-offs in context

### TypeScript docs

- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) — `private`, `protected`, `readonly`, and constructor shorthand
- [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) — `readonly` properties and how TypeScript models mutable object contents

## Read the first example line by line

The first runnable example introduces **Designing Classes — Contracts and Data Hiding**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `class BankAccount {` | Expression or data declaration: identify the values, operators, and names before running it. |
| 2 | `  #balanceInCents` | Expression or data declaration: identify the values, operators, and names before running it. |
| 3 | `` | Blank line: it separates ideas for the reader. |
| 4 | `  constructor(owner, initialBalanceInCents = 0) {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 5 | `    if (!Number.isInteger(initialBalanceInCents) \|\| initialBalanceInCents < 0) {` | Control-flow statement: the runtime decides whether or how this block runs. |
| 6 | `      throw new Error('Initial balance must be zero or more whole cents')` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 7 | `    }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 8 | `` | Blank line: it separates ideas for the reader. |
| 9 | `    this.owner = owner` | Expression or data declaration: identify the values, operators, and names before running it. |
| 10 | `    this.#balanceInCents = initialBalanceInCents` | Expression or data declaration: identify the values, operators, and names before running it. |
| 11 | `  }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 12 | `` | Blank line: it separates ideas for the reader. |
| 13 | `  get balanceInCents() {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 14 | `    return this.#balanceInCents` | Return statement: the function sends a result back to its caller. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Designing Classes — Contracts and Data Hiding**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Designing Classes — Contracts and Data Hiding**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why use an explicit `deposit` method instead of allowing any code to assign the balance?
2. What is the difference between `#private` and TypeScript `private`?
3. Why are integer cents safer than decimal dollars for this example?
4. `account.balanceInCents` — why is there no `()` after it?
5. `account.deposit(0)` — what happens, and why?
6. `account.withdraw(2_000)` with a balance of 1_250 — what is thrown?
7. Run `npm.cmd run day20:js` and `npm.cmd run day20`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 155 Min Stack — https://leetcode.com/problems/min-stack/ (hint: https://neetcode.io/problems/minimum-stack/question) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Add `withdraw(cents)` to `BankAccount`. Reject zero, negative, non-integer, and over-balance withdrawals.
2. Add a `formattedBalance` getter that returns a currency string without changing the stored cents.
3. Create a custom `InsufficientFundsError` and catch it separately from other errors.
4. TypeScript: choose which public fields should be `readonly` and which field should be private.

### Level 3 — Creative synthesis

1. The daily limit: extend `BankAccount` so a withdrawal above `dailyLimitInCents` throws a custom `DailyLimitError`, and show a caller catching it separately.
2. The shared state guard: write a `TemperatureSensor` class with a private `#readingCelsius`, a getter, and a `record(celsius)` method that rejects non-finite values. Show that the reading is read-only from outside.
3. The composition decision: build a small `Report` that takes an array of `BankAccount` instances and prints one line each. Explain in a comment why `Report` uses accounts rather than extending them.
4. The custom error memo: write a comment block listing two cases where a custom error earns its class and two where a plain `Error` is enough.
5. **MDN lookup:** Open the [private class features reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields), find the `#field in obj` check, and add a `hasBalance(account)` helper that reports whether an object carries the private `#balanceInCents` field. Comment on why `in` can detect a private field even though the field cannot be read from outside the class.

## Finish line

Day 20 is complete when you can do all of these **without notes**:

1. Protect a field with a JavaScript `#private` field.
2. Expose read-only state through a getter.
3. Validate and mutate state through methods that enforce rules.
4. Store money as integer cents and format at the display boundary.
5. Write a custom error class and catch it separately.
6. Choose `readonly` and `private` modifiers in TypeScript.
7. Explain when composition beats inheritance.

If any answer is a guess, revisit the matching section before Day 21.

## Prove it

Write, in your own words, a short answer to each:

1. Why use an explicit `deposit` method instead of allowing any code to assign the balance?
2. What is the difference between `#private` and TypeScript `private`?
3. Why are integer cents safer than decimal dollars for this example?
4. When is composition clearer than inheritance?
5. Why should a getter be quick and unsurprising?
6. What does the type checker know that your tests must still verify about classes?

Your answers are today's evidence. If you can write them, move to [Day 21: Modules — Imports and Exports](../21_day_modules/21_day_modules.md).

**Day 20 complete.** Classes now protect their rules: `#` fields are truly private at runtime, getters expose read-only views, methods enforce the rules, money stays in integer cents until the display boundary, and composition wins over inheritance by default.