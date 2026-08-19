# Day 4: Operators — Math, Truth, and Comparison

[Day 3 <<](../03_day_data_types/03_day_data_types.md) | [Day 5 >>](../05_day_control_flow/05_day_control_flow.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Operators are the verbs of a program](#operators-are-the-verbs-of-a-program)
  - [Arithmetic and assignment operators](#arithmetic-and-assignment-operators)
  - [Comparisons produce booleans](#comparisons-produce-booleans)
  - [Strict vs loose equality: === means "exactly"](#strict-vs-loose-equality--means-exactly)
  - [Logical operators: and, or, not](#logical-operators-and-or-not)
  - [Short-circuiting: the runtime stops early](#short-circuiting-the-runtime-stops-early)
  - [Truthy and falsy: every value is a condition](#truthy-and-falsy-every-value-is-a-condition)
  - [Order of operations](#order-of-operations)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [TypeScript blocks accidental mixed math](#typescript-blocks-accidental-mixed-math)
  - [The narrowing pattern](#the-narrowing-pattern)
  - [What TypeScript cannot catch](#what-typescript-cannot-catch)
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

Data types are the nouns of a program; operators are the verbs. `+`, `-`, `&&`, `===` — these are how values *do things*. Every feature you build from here on — a form check, a total, a filter, a login gate — is an operator at heart.

This lesson is the one that makes the "it doesn't work" bugs *predictable* rather than mysterious. The two biggest traps are in this lesson: `==` (loose equality, which converts types silently) and truthiness (where `0`, `''`, and `null` all masquerade as "false"). Get both straight today and the rest of the course gets dramatically smoother.

## Prerequisites

- Day 3: data types, especially string vs number, and `undefined` vs `null`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- calculate with arithmetic and assignment operators, including `%` and `**`;
- choose `===` deliberately and explain why `==` is avoided;
- combine boolean conditions with `&&`, `||`, and `!` and predict the outcome;
- identify every falsy value and reason about truthiness;
- run this course's Day 4 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what an operator and its operands are;
- what short-circuiting means at runtime;
- why `5 == '5'` is `true` and why that is a bug waiting to happen;
- what TypeScript blocks for operators, and what it cannot see.

## The problem this solves

Two programs, both "obviously correct," both wrong:

```js
const formTotal = '5' + 5   // '55' — the string trap from Day 3
const count = 0
if (count === false) { /* ... */ } // this never runs — and the why is invisible
```

The first is a type problem disguised as arithmetic. The second is a *truthiness* problem: `0` is falsy, so `count === false` is false. Neither line shows a red error; both quietly do the wrong thing. This lesson is about reading those lines with full x-ray vision — knowing exactly what the runtime will do before you run it.

## JS runtime deep dive

### Operators are the verbs of a program

An **operator** is a symbol that works on values. The values it works on are its **operands**.

```js
const total = 12 * 3 // * is the operator; 12 and 3 are the operands
```

`total` gets the *result* of applying the operator to its operands. Read every expression this way: *operator applies to operands, produces a result.* That habit — naming the operator and both operands — is the whole of operator debugging.

### Arithmetic and assignment operators

| Operator | Meaning | Example | Result |
| --- | --- | --- | --- |
| `+` | add, or join strings | `2 + 3` / `'a' + 'b'` | `5` / `'ab'` |
| `-` | subtract | `8 - 3` | `5` |
| `*` | multiply | `4 * 2` | `8` |
| `/` | divide | `10 / 2` | `5` |
| `%` | remainder | `7 % 2` | `1` |
| `**` | power | `2 ** 3` | `8` |

The remainder operator `%` is the quiet workhorse of programming: even/odd checks, wrapping values, cycling through lists, pagination.

```js
console.log(8 % 2 === 0) // true  — even
console.log(7 % 2 === 0) // false — odd
```

**Assignment operators** combine arithmetic with `=`:

```js
let score = 10
score += 5   // same as score = score + 5
score -= 3   // same as score = score - 3
console.log(score) // 12
```

`score += 5` reads "score becomes score plus 5." It exists for every arithmetic operator (`-=`, `*=`, `/=`, `%=`). Use the shorthand only when it genuinely reads better; the long form is often clearer for beginners.

### Comparisons produce booleans

Comparison operators ask a question and answer `true` or `false`:

```js
console.log(5 > 3)    // true
console.log(5 >= 5)   // true
console.log(5 < 3)    // false
console.log(5 !== 3)  // true
```

The answer is a boolean — a value with a type, just like the numbers on the left and right. That means a comparison result can be stored:

```js
const isBigger = 5 > 3
console.log(isBigger) // true
console.log(typeof isBigger) // "boolean"
```

Keep that in mind: tomorrow's `if` statements run entirely on these boolean results.

### Strict vs loose equality: === means "exactly"

JavaScript has two equality operators, and they are not cousins — they are different creatures.

**Strict equality `===`** asks two questions: *are the values equal, and are the types equal?* Both must match.

```js
console.log(5 === 5)    // true  — same value, same type
console.log(5 === '5')  // false — same visible digits, different types
console.log('5' === '5') // true
```

**Loose equality `==`** asks one question with a catch: it converts types first, then compares.

```js
console.log(5 == '5')   // true  — the string becomes a number
console.log(0 == false) // true  — false becomes 0
console.log('' == 0)    // true  — both become... 0
```

The conversions are a rabbit hole of special cases — exactly the kind of "wait, why?" that wastes hours. The decision is easy: **always use `===` and `!==`.** There are vanishingly few reasons to use `==`, and none of them matter to you yet. If you are ever tempted by `==` because it is shorter, remember it is shorter only because it hides a type conversion.

MDN's [equality comparisons and sameness page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) documents the full rabbit hole of loose-equality conversions, so you can see exactly what you are avoiding.

### Logical operators: and, or, not

Logical operators combine conditions — and they are *not* limited to booleans, as the truthiness section shows. Start with the boolean case:

| Operator | Name | Result is `true` when |
| --- | --- | --- |
| `&&` | AND | both sides are `true` |
| `\|\|` | OR | at least one side is `true` |
| `!` | NOT | it reverses the boolean |

```js
const isLoggedIn = true
const hasPaidPlan = false

console.log(isLoggedIn && hasPaidPlan) // false — one is false
console.log(isLoggedIn || hasPaidPlan) // true  — one is true
console.log(!isLoggedIn)               // false — reverses true
```

Read `&&` as "and", `||` as "or", `!` as "not". A real condition usually combines several:

```js
const canCheckout = isLoggedIn && hasItemInCart && !isBlocked
```

### Short-circuiting: the runtime stops early

Here is the runtime behavior that surprises people. `&&` and `||` evaluate **left to right and stop as soon as the answer is known**. That is called *short-circuiting*.

For `&&`: if the left side is `false`, the whole thing must be `false` — the right side is never evaluated.

```js
const hasName = false
hasName && console.log('This never runs') // left is false; right is skipped
```

For `||`: if the left side is `true`, the whole thing must be `true` — again, the right side is skipped.

Short-circuiting matters for two reasons:

- **Efficiency** — work on the right side is skipped.
- **Safety** — the right side can *assume* the left side was true:

```js
const user = null
// user.name  -> TypeError: Cannot read properties of null
user && user.name // short-circuits at null; no error
```

That last pattern — "only touch the right side if the left side was truthy" — is the seed of the optional data handling you will meet in later days. For today, know the rule: *left to right, stop when decided.*

### Truthy and falsy: every value is a condition

A condition does not have to be a boolean. Any value in a boolean position is *coerced* — converted — to a boolean. The coercion follows a short, exact list. These are the **falsy** values — everything else is **truthy**:

```
false, 0, -0, 0n (bigint zero), '' (empty string), null, undefined, NaN
```

```js
console.log(Boolean('hello')) // true  — non-empty string is truthy
console.log(Boolean(''))      // false — empty string is falsy
console.log(Boolean([]))      // true  — empty array is truthy (a surprise!)
console.log(Boolean({}))      // true  — empty object is truthy (another surprise!)
console.log(Boolean(0))       // false
console.log(Boolean(NaN))     // false
```

The two empty-collection surprises matter: an empty array and an empty object are *truthy*. Only the eight values in the falsy list coerce to `false`.

The discipline that separates good code from buggy code: **do not test with truthiness when you need a precise condition.** Truthiness lumps `0` and `''` and `null` together — all falsy — but they mean very different things. If the requirement is "did the user actually give a value?", test exactly that:

```js
if (userInput !== null && userInput !== '') { /* real input */ }
```

instead of relying on `if (userInput)`, which is also false for `0` — and `0` might be a legitimate answer to "how many items?"

The glossary pages for [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) list the coercion rules, and [the Boolean reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) covers the `Boolean(...)` conversion you just used.

### Order of operations

Arithmetic follows the usual precedence: `**` before `*`/`/` before `+`/`-`, left to right within a level. Comparison and logical operators have their own precedence rules, which are easy to misremember.

The professional rule is short: **when in doubt, use parentheses.** Parentheses state both execution order *and* intent.

```js
console.log(3 + 4 * 2)   // 11 — multiplication first
console.log((3 + 4) * 2) // 14 — parentheses win
```

If an expression mixes more than one operator, add parentheses or split it into an intermediate variable. A future reader (including you, next month) will thank you.

The full ranking — every operator, arithmetic to logical — is in [the operator precedence reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence).

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| `=` inside a condition | Assignment, not comparison — silent logic bug | Use `===` |
| Using `==` | Hidden type conversion (`5 == '5'` is `true`) | Always use `===` |
| Assuming `0` is "missing data" | Truthiness treats `0`, `''`, `null` alike | Test precisely: `value !== null` |
| Expecting an empty array to be falsy | `Boolean([])` is `true` | Check `array.length === 0` |
| Forgetting `%` precedence | `7 % 2 === 0` needs no parens, but `(x % 2)` when mixing | Parenthesize mixed expressions |
| Reading `&&` as boolean-only math | Missing its value-returning / short-circuit power | Left to right, stop when decided |
| Comparing number and string with `==` | `5 == '5'` → `true`, a false positive | `5 === '5'` → `false` |

## The TypeScript layer

### TypeScript blocks accidental mixed math

JavaScript happily applies `+` to a number and a string — joining them. TypeScript treats that as the bug it usually is:

```js
// JavaScript:
console.log(5 + '5') // '55' — silent

// TypeScript:
const price: number = 5
const label: string = '5'
// const result = price + label
// Error: Operator '+' cannot be applied to types 'number' and 'string'.
```

TypeScript cannot read your intent — maybe you wanted text joining. It only knows the operation is suspicious. The fix is to make intent explicit:

```ts
const label = '5'
const quantity = Number(label) // convert at the boundary, on purpose
const total = 5 + quantity     // now clearly numeric
```

That is the pattern in the Day 4 TypeScript starter: convert where the data enters, then operate on values of a known type.

### The narrowing pattern

TypeScript's other gift for operators is **narrowing**: inside a truthy check, TypeScript knows more about the type. With the union type from Day 3:

```ts
let score: number | null = 87

if (score !== null) {
  // here, TypeScript knows score is a number
  const doubled = score * 2 // fine
}
```

Outside the check, `score * 2` would be an error — `null` times 2 is nonsense, and TypeScript refuses. The check is not ceremony; it is the contract forcing you to handle the missing-value case before doing math. This is how TypeScript turns "I forgot to check for null" from a runtime crash into a compile-time reminder.

### What TypeScript cannot catch

TypeScript does not know which comparison you *meant* or whether a business rule is right:

```ts
const price: number = 12
const total = price * 3 // fine — but is the 3 correct? Unknown.
if (total > 100) { /* is > 100 the right threshold? Unknown. */ }
```

Those are logic decisions, and they are yours. TypeScript catches *type* mismatches; you make *meaning* decisions. Knowing which category a bug falls into — type, logic, or runtime — is the debugging skill this course is building.

### One compiler error, walked through

Open `04_day_operators/starter/ts/main.ts`. The last line is commented out and deliberately broken:

```ts
const mixedTotal = price + '12'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Operator '+' cannot be applied to types 'number' and 'string'.
```

Read it as: *"You added a number and a string. `+` means addition for numbers and joining for strings — I will not guess which you wanted."* The fix is where the intent lives:

- numeric: `const mixedTotal = price + Number('12')` → `24`;
- textual: `const mixedTotal = String(price) + '12'` → `'1212'`.

Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Operators are the verbs that turn values into new values; comparisons answer with booleans, `===` demands same value *and* same type, `&&`/`||` stop early left-to-right, truthiness makes every value a condition with exactly eight falsy exceptions, and TypeScript blocks mixed-type arithmetic before runtime.

## Learn more on MDN

Day 4 makes operators predictable, and MDN documents every rule. Bookmark these pages and return as you grow:

- [Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators) — the guide that ranks today's whole operator family
- [Arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_operators) — `+` through `**`, including the `%` remainder quirk
- [Assignment operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_operators) — the shorthand forms behind `+=` and friends
- [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) — why `===` and `==` are different creatures
- [Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_operators) — `&&`, `||`, `!` and their value-returning behavior
- [Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) — the full ranking table behind order of operations
- [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) — the values that coerce to `true`
- [Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) — the exact eight values that coerce to `false`

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind today's numeric contracts
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how the `!== null` check narrows `number | null` to `number`

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

Predict the exact output (or the error) before running, then run and compare.

1. `console.log(17 % 5)`
2. `console.log(2 ** 3)`
3. `console.log(5 === '5')` and `console.log(5 == '5')`
4. `console.log(0 == false)` and `console.log('' == 0)`
5. `console.log(Boolean([]))` and `console.log(Boolean({}))`
6. `console.log(true && false)` and `console.log(true || false)`
7. `let n = 5; n += 3; n -= 2; console.log(n)`
8. `console.log(8 % 2 === 0)` and `console.log(7 % 2 === 0)`
9. Run `npm.cmd run day4:js` and `npm.cmd run day4`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. A cart total: multiply a price by a quantity, apply a discount with `-`, and print the result using a `const`.
2. An even/odd reporter: use `%` to print whether each of `21`, `22`, `7`, `8` is even or odd.
3. A feature gate: create `isLoggedIn` and `hasPaidPlan` booleans, then log the result of `&&`, `||`, and `!` for them, each with a comment predicting the result first.
4. A strict-vs-loose lab: log `5 === '5'`, `5 == '5'`, `0 === false`, and `0 == false`, and explain each result in a comment.
5. A truthiness table: use `Boolean(...)` on `0`, `1`, `''`, `' '`, `null`, `undefined`, `NaN`, `[]`, `{}` and print the results.
6. In TypeScript, create a `number | null` variable and use narrowing to safely double it inside an `if` check.
7. **MDN lookup:** Open the [logical operators reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_operators), read how `||` returns the first truthy operand rather than a boolean, then write a `defaultName(name)` function that returns `name` or the string `'guest'` using `||`. Test it with `'Ada'`, `''`, and `null` and comment on the result for each.

### Level 3 — Creative synthesis

1. A "free shipping" calculator: `price > 50` should give free shipping. Use a boolean variable, print "free" or "paid" based on it, and include the exact comparison you chose.
2. A safe-access demo: create `const user = null` and show both the crash (`user.name`) and the safe pattern (`user && user.name`), each with a comment.
3. A short-circuit sketch: write three lines that *prove* `&&` stops early — log a marker inside the skipped side and show it never prints.
4. TypeScript challenge: deliberately mix `price` (number) with a string constant, read the compiler error, then fix it two ways (numeric and textual) with comments explaining each intent.
5. A "do not trust truthiness" experiment: model a survey where `0` is a valid answer, show why `if (answer)` fails for it, and write the precise condition that accepts `0` but rejects "no answer" (`null`/`undefined`).

## Finish line

Day 4 is complete when you can do all of these **without notes**:

1. Compute `%`, `**`, and the assignment operators by hand.
2. Explain, in one sentence, the difference between `===` and `==`, and state which you use.
3. List every falsy value from memory.
4. Predict the output of `&&`, `||`, and `!` given any two booleans.
5. Explain short-circuiting in runtime terms.
6. Say what TypeScript blocks for operators, and name one thing it cannot see.

If any answer is a guess, revisit the matching section before Day 5.

## Prove it

Write, in your own words, a short answer to each:

1. What is an operator, and what are operands?
2. Why is `5 == '5'` `true` and `5 === '5'` `false`?
3. What is short-circuiting, and what does it let you do safely?
4. Which eight values are falsy?
5. Why is `Boolean([])` `true`?
6. What does TypeScript's narrowing let you do after an `if (value !== null)` check, and why?

Your answers are today's evidence. If you can write them, move to [Day 5: Control Flow — Decisions with if, else, and switch](../05_day_control_flow/05_day_control_flow.md).

**Day 4 complete.** Operators are now predictable: arithmetic, comparisons, logic, and truthiness all behave by exact rules — and TypeScript stops the mixed-type accidents before runtime.
