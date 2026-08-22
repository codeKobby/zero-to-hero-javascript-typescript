# Day 5: Control Flow — Making Decisions with if, else, and switch

[← Previous lesson](../04_day_operators/04_day_operators.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../06_day_loops/06_day_loops.md)



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
  - [Programs choose: if takes one path](#programs-choose-if-takes-one-path)
  - [Only the first true branch runs](#only-the-first-true-branch-runs)
  - [Order matters: specific before broad](#order-matters-specific-before-broad)
  - [Write conditions as questions](#write-conditions-as-questions)
  - [The ternary: choose one small value](#the-ternary-choose-one-small-value)
  - [switch: compare one value with named choices](#switch-compare-one-value-with-named-choices)
  - [Fall-through and when it is intentional](#fall-through-and-when-it-is-intentional)
  - [Which tool, and when](#which-tool-and-when)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Literal unions constrain known choices](#literal-unions-constrain-known-choices)
  - [Narrowing inside branches](#narrowing-inside-branches)
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

So far your programs run top to bottom: the same lines every time. Real programs are not scripts; they are *decision makers*. The login either shows the dashboard or the sign-in page. The grade is an A or a B or a fail. The plan is free or pro. Control flow is the mechanism of every one of those choices.

This lesson teaches the three decision tools — `if`/`else if`/`else`, the ternary, and `switch` — plus the discipline of choosing correctly between them. The traps are subtle and silent: condition order that makes a branch unreachable, `switch` cases that leak into each other, ternaries that bury three steps inside one line. By the end you will trace any decision structure exactly, and pick the right tool for the job.

## Prerequisites

- Day 4: comparison operators (`===`, `>=`), logical operators, truthiness.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- trace an `if` / `else if` / `else` chain and say which branch runs, and why;
- order conditions so every branch is reachable;
- write a ternary when it fits, and an `if` when it does not;
- write a `switch` without accidental fall-through;
- model allowed choices with a TypeScript literal union;
- run this course's Day 5 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why only one branch of an `if` chain runs;
- why `switch` compares with strict equality;
- what fall-through is, and when it is intentional;
- what a literal union prevents.

## The problem this solves

Here is a bug that compiles, runs, and silently gives the wrong answer:

```js
const score = 95

if (score >= 60) {
  console.log('Pass')
} else if (score >= 90) {
  console.log('A') // dead code — a 95 never gets here
}
```

The order is wrong, so the A branch is unreachable. No error is printed — the program just quietly hands out passes. That is the nature of control-flow bugs: the code runs exactly as written, and the writer is sure they meant what they wrote. This lesson builds the exact mental execution model — top to bottom, first true wins — that makes you see that bug at a glance instead of after an hour of debugging.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **condition** | A question whose result chooses a branch. |
| **if** | A keyword that runs a block when its condition is true. |
| **else** | A fallback block when earlier conditions are false. |
| **switch** | A branching statement for matching one expression to cases. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Programs choose: if takes one path](#programs-choose-if-takes-one-path)
- [Only the first true branch runs](#only-the-first-true-branch-runs)
- [Order matters: specific before broad](#order-matters-specific-before-broad)
- [Write conditions as questions](#write-conditions-as-questions)
- [The ternary: choose one small value](#the-ternary-choose-one-small-value)

## JS runtime deep dive

### Programs choose: if takes one path

The `if` statement runs a block of code only when its condition is truthy:

```js
const isLoggedIn = true

if (isLoggedIn) {
  console.log('Show dashboard')
} else {
  console.log('Show sign-in page')
}
```

The runtime evaluates the condition (a boolean — remember Day 4), and routes execution down one of two paths: the `if` block, or the `else` block. Exactly one runs.

```
        if (isLoggedIn) ── true  ──> dashboard block
              |
             false
              |
              └───────────────> sign-in block
```

### Only the first true branch runs

An `if` / `else if` / `else` chain is a sequence of doors. The runtime opens the first door that is true and *walks through; it does not come back to check the rest.*

```js
const score = 85

if (score >= 90) {
  console.log('A')
} else if (score >= 80) {
  console.log('B')
} else if (score >= 60) {
  console.log('Pass')
} else {
  console.log('Needs more practice')
}
```

Trace it for `score = 85`:

| Check | Result | What happens |
| --- | --- | --- |
| `score >= 90` | false | skip the A block |
| `score >= 80` | true | print B and **leave the chain** |
| `score >= 60` | never checked | skipped |
| `else` | never reached | skipped |

The `else` at the end is the catch-all: it runs only when *every* condition was false. The rule that governs all of this: **in one chain, only the first true branch runs.** This is why `else if` exists — it makes the choices *exclusive*. If you wrote five separate `if` statements instead, more than one could run, and that is usually not what you meant.

### Order matters: specific before broad

Because the first true branch wins, the order of conditions is part of the logic:

```js
const score = 95

if (score >= 90) {
  console.log('A')
} else if (score >= 60) {
  console.log('Pass')
}
```

A score of 95 is `>= 90`, so it prints A — correct. Now swap the order:

```js
if (score >= 60) {
  console.log('Pass') // a 95 stops here
} else if (score >= 90) {
  console.log('A') // unreachable
}
```

A 95 is `>= 60`, so it prints Pass and leaves the chain. The A branch is dead code. The rule: **put the most specific condition first, broad conditions later.** If a later branch can never be reached, your ordering is wrong — the compiler will not tell you, but the trace will.

### Write conditions as questions

A condition should read like a question with a boolean answer:

```js
if (isLoggedIn) { ... }          // readable: "if logged in"
if (isLoggedIn === true) { ... } // redundant: already a boolean
```

Since `isLoggedIn` is already a boolean, comparing it to `true` adds nothing. Write the condition itself. The same discipline applies to falsy checks: `if (!userInput)` reads "if there is no input."

The [if...else reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) shows the full statement — including `else if` chains and what counts as a truthy condition.

### The ternary: choose one small value

An `if`/`else` that does nothing but *pick one of two values* is common enough to have a compact form — the **ternary**:

```js
const score = 85
const status = score >= 60 ? 'Pass' : 'Fail'
```

Read it as: *"Is score at least 60? Yes → 'Pass'. No → 'Fail'."* Structure:

```
condition ? valueIfTrue : valueIfFalse
```

A ternary is an **expression** — it produces a value, so it can be assigned. That is its superpower and its trap. Use it when both choices are short values and the result is assigned immediately. The moment either side grows beyond a short value — or you need multiple statements — switch to `if`/`else`:

```js
let status
if (score >= 60) {
  status = 'Pass'
  console.log('You passed')
} else {
  status = 'Fail'
  console.log('Keep trying')
}
```

The rule: **ternary for one small two-way value; `if`/`else` for real work.**

The [conditional (ternary) operator reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) covers the exact structure and nesting rules.

### switch: compare one value with named choices

When a single value has a small set of exact, named possibilities, `switch` reads better than a long `if` chain:

```js
const day = 'Saturday'

switch (day) {
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend')
    break
  default:
    console.log('Weekday')
}
```

Key facts about how `switch` runs:

- It compares `day` to each `case` using **strict equality** (`===`).
- When a case matches, it runs that case's statements.
- `break` exits the switch entirely. **Without `break`, execution falls through into the next case** — see below.
- `default` runs when no case matches; it is the switch's `else`.

Another example with a plan:

```js
const plan = 'free'

switch (plan) {
  case 'free':
    console.log('Basic features')
    break
  case 'pro':
    console.log('Advanced features')
    break
  default:
    console.log('Unknown plan')
}
```

The runtime model: *match value against case labels in order, using `===`; run the matched case; stop at `break`.*

The [switch reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) walks through the same model with a step-by-step example.

### Fall-through and when it is intentional

Fall-through is what happens when a case does not end with `break`: execution continues into the next case's body.

```js
const day = 'Saturday'

switch (day) {
  case 'Saturday':   // matches — no break yet
  case 'Sunday':     // falls through here on purpose
    console.log('Weekend') // shared body for both days
    break
}
```

This is the one *intentional* use of fall-through: grouping cases that share a body. The matching case falls into the shared body, then `break` ends it.

Unintentional fall-through is a classic bug:

```js
switch (plan) {
  case 'free':
    console.log('Basic features')
    // missing break — accidentally runs the pro case too!
  case 'pro':
    console.log('Advanced features')
    break
}
```

With `plan = 'free'`, both lines print. The rule: **every case ends with `break` unless it is deliberately sharing a body with the next case.** If you do share, say so in a comment — future you will not remember the intent.

### Which tool, and when

| Situation | Tool |
| --- | --- |
| Ordered conditions, ranges, mixed questions | `if` / `else if` / `else` |
| One value, a small set of exact choices | `switch` |
| Pick one of two short values, assign it | ternary |
| More than a short value, or multiple steps | `if` / `else` |

The boundary that trips people up: `switch` compares *exact equality* against named cases. It is the wrong tool for numeric ranges (`score >= 80`) — those belong to `if` chains. Use `switch` when you can list the choices by name.

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| Broad condition before specific | Later branch is dead code | Put the most specific case first |
| Separate `if`s when choices exclude each other | More than one branch runs | Use `else if` |
| Missing `break` in `switch` | Fall-through runs the next case | End every case with `break` |
| `switch` for numeric ranges | Can't express `>=` against cases | Use `if` / `else if` |
| Ternary doing multi-step work | Unreadable, hard to trace | Use `if` / `else` |
| `if (isLoggedIn === true)` | Redundant comparison | Write `if (isLoggedIn)` |
| Assuming `default` is required | It is optional — but be sure unmatched values are handled | Include `default` for safety |

## The TypeScript layer

### Literal unions constrain known choices

The `switch` choices are a *known set*. JavaScript lets a typo in a case value pass silently:

```js
const plan = 'proo' // typo — JavaScript does not care
```

TypeScript can model the allowed set as a **literal union**:

```ts
type Plan = 'free' | 'pro'

const plan: Plan = 'pro' // fine
// const typo: Plan = 'proo'
// Error: Type '"proo"' is not assignable to type 'Plan'.
```

The union lists the exact allowed string values. Assigning anything else is a compile error — the typo is caught while the code is still on your screen, not at runtime after a user hits it.

This turns `switch` into a checked enumeration:

```ts
type Plan = 'free' | 'pro'

function describePlan(plan: Plan): string {
  switch (plan) {
    case 'free':
      return 'Basic features'
    case 'pro':
      return 'Advanced features'
  }
}
```

### Narrowing inside branches

TypeScript watches your conditions and *narrows* types inside each branch. Inside an `if` branch, the checked type is known:

```ts
function describePlan(plan: Plan | null): string {
  if (plan === null) {
    return 'No plan selected'
  }
  // here plan is a Plan — TypeScript narrowed it
  switch (plan) {
    case 'free':
      return 'Basic features'
    case 'pro':
      return 'Advanced features'
  }
}
```

After the `null` check, TypeScript knows `plan` is a `Plan`, and the `switch` cases are validated against the union. The check is not ceremony — it is the compiler forcing you to handle the missing-plan case before proceeding. This is the same narrowing you met with `number | null` in Day 4, now applied to decisions.

### What TypeScript cannot catch

TypeScript knows the *allowed values*. It does not know which plan is right for a given user, or whether the `>= 80` threshold should be `>= 85`:

```ts
const score: number = 85
if (score >= 80) { /* is 80 the right cutoff? TypeScript cannot say */ }
```

Product rules and business thresholds are yours. The division of labor: TypeScript prevents *invalid values*; you decide *correct behavior*.

### One compiler error, walked through

Open `05_day_control_flow/starter/ts/main.ts`. The starter defines a `TrafficLight` union and builds a light from it. The last line is commented out and deliberately broken:

```ts
const invalidLight: TrafficLight = 'blue'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Type '"blue"' is not assignable to type 'TrafficLight'.
```

Read it as: *"`TrafficLight` is red, yellow, or green — `'blue'` is not on the list."* The fix is not to widen the type so `'blue'` fits; the fix is that the *value* was wrong. This is TypeScript doing exactly the job it was hired for: making an invalid known-value impossible before anyone runs the code. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Control flow routes execution: `if` chains run the first true branch and skip the rest, the ternary picks one of two values, `switch` matches one value against named cases with `===` and needs `break` to stop, and TypeScript literal unions make the set of allowed choices a compile-time fact.

## Learn more on MDN

Day 5 makes decisions exact, and MDN documents each tool. Bookmark these pages and return as you grow:

- [if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) — the statement behind every branch you wrote today
- [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) — `condition ? yes : no` and its nesting rules
- [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) — the statement that matches one value against named cases
- [break](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) — what stops fall-through and exits loops early
- [Comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_operators) — the questions behind today's conditions
- [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) — what makes a condition run
- [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) — the exact values that do not

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations and literal unions behind today's `Plan`
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how TypeScript watches your branches and knows more inside each one

## Read the first example line by line

The first runnable example introduces **Control Flow — Making Decisions with if, else, and switch**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const score = 95` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `` | Blank line: it separates ideas for the reader. |
| 3 | `if (score >= 60) {` | Control-flow statement: the runtime decides whether or how this block runs. |
| 4 | `  console.log('Pass')` | Output call: the program displays the evaluated value in the console. |
| 5 | `} else if (score >= 90) {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 6 | `  console.log('A') // dead code — a 95 never gets here` | Output call: the program displays the evaluated value in the console. |
| 7 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Control Flow — Making Decisions with if, else, and switch**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Control Flow — Making Decisions with if, else, and switch**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down which branch runs and what prints, before running.

1. `if (true) { console.log('A') } else { console.log('B') }`
2. `if (0) { console.log('A') } else { console.log('B') }`
3. `if (false && true) { console.log('A') } else if (true || false) { console.log('B') } else { console.log('C') }`
4. `const n = 10; const s = n > 5 ? 'big' : 'small'; console.log(s)`
5. Write a `switch` on `'a'` where the `'a'` case has no `break` and the `'b'` case prints — predict both lines.
6. `if (null) { console.log('A') } else { console.log('B') }`
7. `if ('0') { console.log('A') } else { console.log('B') }` — `'0'` is a non-empty string; predict carefully.
8. Run `npm.cmd run day5:js` and `npm.cmd run day5`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Temperature classifier: classify a temperature as freezing (below 0), cold (below 10), warm (below 25), or hot — with the specific conditions in the correct order.
2. Adult/minor: use a ternary to assign `'Adult'` or `'Minor'` from an age, and print it.
3. Traffic light: write a `switch` that prints `Stop`, `Slow down`, or `Go` for red, yellow, green — with a `default` for unknown input.
4. Write a weekend detector: write a `switch` that groups Saturday and Sunday into one `Weekend` case, with the fall-through commented as intentional.
5. TypeScript union: define `type Plan = 'free' | 'pro' | 'enterprise'` and a `describePlan` function with a `switch` and a `default`.
6. Grade reporter: use an `if`/`else if` chain for score ≥ 90 → A, ≥ 80 → B, ≥ 60 → Pass, else Fail — and trace what happens for scores 95, 85, 65, 40.
7. Read the [switch reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch). Copy one small example into the starter. Run it and write down what it does.

### Level 3 — Creative synthesis

1. Write a login gate: `isLoggedIn`, `hasPaidPlan`, and `isAdmin` combine with `&&`/`||` in an `if`/`else` that prints one of three screens. Trace every combination you can think of.
2. Write a pricing story: a ternary that chooses the price display, then a comment explaining why a ternary fits *here* but a full `if` is needed for the multi-step discount logic.
3. Write a deliberate-fall-through report: write a `switch` on a day where weekdays share a body and weekends share a body, with comments explaining exactly which cases fall through and why that is safe.
4. TypeScript challenge: take the `TrafficLight` union, write a `safetyMessage(light)` function that returns a message for each color with an exhaustive `switch`, and prove the invalid value `'blue'` is rejected by `npm run check`.
5. Write a dead-code detector: write three `if` chains, one of which has an unreachable branch on purpose, then explain in comments exactly *why* that branch can never run — using the first-true rule.

## Finish line

Day 5 is complete when you can do all of these **without notes**:

1. Trace any `if` / `else if` / `else` chain and name the single branch that runs.
2. Order conditions so no branch is dead code.
3. Say when a ternary fits and when it does not.
4. Write a `switch` with correct `break`s and explain fall-through.
5. Explain why `switch` cannot do `score >= 80`.
6. Define a TypeScript literal union and state what it prevents.

If any answer is a guess, revisit the matching section before Day 6.

## Prove it

Write, in your own words, a short answer to each:

1. Why does only one branch of an `if` chain run?
2. Why must specific conditions come before broad ones?
3. What is a ternary, and when do you avoid it?
4. What does `break` do in a `switch`, and what happens without it?
5. When is fall-through intentional?
6. What does a TypeScript literal union prevent, and what can it not decide?

Your answers are today's evidence. If you can write them, move to [Day 6: Loops — Repeating Work with for and while](../06_day_loops/06_day_loops.md).

**Day 5 complete.** Decisions are now exact: you can trace any branch, choose the right tool, write a safe `switch`, and make the set of valid choices a compile-time fact with TypeScript.
