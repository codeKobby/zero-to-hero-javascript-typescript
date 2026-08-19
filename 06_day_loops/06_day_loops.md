# Day 6: Loops — Repeating Work with for and while

[Day 5 <<](../05_day_control_flow/05_day_control_flow.md) | [Day 7 >>](../07_day_functions_i/07_day_functions_i.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The loop model: start, check, work, change](#the-loop-model-start-check-work-change)
  - [Trace it by hand](#trace-it-by-hand)
  - [for loops: count when you need a position](#for-loops-count-when-you-need-a-position)
  - [Arrays and indexes](#arrays-and-indexes)
  - [for...of: use the item when you do not need its position](#forof-use-the-item-when-you-do-not-need-its-position)
  - [while loops: continue until something changes](#while-loops-continue-until-something-changes)
  - [The most dangerous loop bug: no progress](#the-most-dangerous-loop-bug-no-progress)
  - [break and continue](#break-and-continue)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The same loop, different safety](#the-same-loop-different-safety)
  - [What TypeScript cannot catch](#what-typescript-cannot-catch)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

You can already make decisions. But a program that greets three students still writes the greeting three times, and a program that greets three hundred students cannot exist that way. The mechanism that turns one instruction into repeated work — safely, without endless spinning — is the **loop**. It is the first real encounter with scale: the same body of code, executed many times over changing values.

This lesson teaches the three loop tools — `for`, `for...of`, and `while` — plus the single discipline that prevents the worst failure mode in programming: a loop that never stops. You will learn the four-step model every safe loop obeys, how to trace a loop on paper before running it, and exactly what TypeScript can and cannot protect against here.

## Prerequisites

- Day 4: comparison operators, truthiness.
- Day 5: `if` inside a loop body.
- Day 3: arrays (you can read `array[0]` and `array.length`).

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write a `for` loop with the correct condition (`index < length`, not `<=`);
- use `for...of` to visit every item of an array in order;
- write a `while` loop and name the line that makes it stop;
- use `break` to stop a loop early and `continue` to skip one round;
- count items that pass a test inside a loop;
- run this course's Day 6 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the four steps every loop repeats, and why skipping "change" is fatal;
- why the condition is checked before the body runs;
- the difference between `for` and `for...of`, and when each fits;
- why `for...in` is the wrong tool for array values;
- what TypeScript checks in a loop, and what it cannot prove.

## The problem this solves

Here is a loop that runs without a single error and produces nothing useful at all:

```js
let lives = 3

while (lives > 0) {
  console.log('You have ' + lives + ' lives left.')
}
```

It prints one line, then prints it again, then again — forever, because nothing ever changes `lives`. In a browser this freezes the tab; in Node it spins until the process is killed. No error message exists for this bug. The code is exactly as written, and the writer did not notice the missing progress line.

This lesson gives you a four-step model that makes such a bug visible at a glance, plus a trace technique that checks a loop's correctness *before* you run it.

## JS runtime deep dive

### The loop model: start, check, work, change

Every safe loop repeats four steps:

1. **Start** with a value.
2. **Check** whether it is time to continue.
3. **Work** once.
4. **Change** something so the check will eventually become false.

Count from 1 to 3:

```js
let number = 1              // 1. start

while (number <= 3) {       // 2. check
  console.log(number)       // 3. work
  number = number + 1       // 4. change
}
```

Output:

```text
1
2
3
```

The loop did not copy the body. JavaScript ran the *same* body again with a changed value, until the check said stop.

### Trace it by hand

Before running a loop, make a small table. This is how developers find most loop mistakes — the trace shows exactly which step misfires.

| Round | number before check | number <= 3 | printed | number after change |
| --- | ---: | --- | ---: | ---: |
| 1 | 1 | true | 1 | 2 |
| 2 | 2 | true | 2 | 3 |
| 3 | 3 | true | 3 | 4 |
| 4 | 4 | false | nothing | loop ends |

Two things to notice:

- The condition is checked **before** the body runs. When `number` becomes 4, the body does not run again.
- Step 4 (change) is what made round 4 happen. Without it, the loop would check `1 <= 3` forever.

### for loops: count when you need a position

A `for` loop puts start, check, and change together in the header:

```js
for (let index = 0; index < 3; index = index + 1) {
  console.log(index)
}
```

Read the header in plain English:

> Start `index` at 0. As long as `index` is less than 3, run the body. After each round, add 1 to `index`.

The output is 0, 1, 2. It does not print 3, because `index < 3` becomes false before a fourth round can run.

```js
for (let index = 0; index < names.length; index = index + 1) {
//   start           check                 change
  console.log(names[index])
}
```

- The **start** runs once, when the loop begins.
- The **check** runs before every round.
- The **body** runs only when the check is true.
- The **change** runs after every completed body.

### Arrays and indexes

Array positions start at zero:

```js
const names = ['Ada', 'Grace', 'Linus']

console.log(names[0]) // Ada
console.log(names[1]) // Grace
console.log(names[2]) // Linus
```

That makes this the classic counting pattern:

```js
const names = ['Ada', 'Grace', 'Linus']

for (let index = 0; index < names.length; index = index + 1) {
  const name = names[index]
  console.log(index + ': ' + name)
}
```

Output:

```text
0: Ada
1: Grace
2: Linus
```

Why `index < names.length` and not `index <= names.length`? The last valid position is `names.length - 1`. At `names.length` there is no item — you get `undefined`. This is the classic **off-by-one error**, and tracing the table above (round 4) is how you see it before you run.

**Stop and predict.** Without running it, what does this print?

```js
for (let index = 2; index < 5; index = index + 1) {
  console.log(index)
}
```

Answer: 2, then 3, then 4. If that was not obvious, trace the start, check, body, and change.

### for...of: use the item when you do not need its position

Often you care about every name, not about position 0, 1, or 2. `for...of` hands you the item directly:

```js
const names = ['Ada', 'Grace', 'Linus']

for (const name of names) {
  console.log('Hello, ' + name)
}
```

JavaScript assigns `Ada` to `name` for the first round, `Grace` for the second, `Linus` for the third, then stops after the final item. No index math, no off-by-one opportunity.

Choose:

- a **`for` loop** when you need the index, want to step by a particular amount, or need to walk right to left;
- **`for...of`** when you only need each item in order.

Do **not** use `for...in` with arrays. It produces property *names* such as `'0'` and `'1'`, not the array values. We will meet its proper object use after Day 9.

### while loops: continue until something changes

Use `while` when the stopping condition is the main idea, rather than a counter:

```js
let lives = 3

while (lives > 0) {
  console.log('You have ' + lives + ' lives left.')
  lives = lives - 1
}

console.log('Game over')
```

Output:

```text
You have 3 lives left.
You have 2 lives left.
You have 1 lives left.
Game over
```

The `while` form does not hide the change in a header. The change must live inside the body, and that is exactly where beginners forget it.

### The most dangerous loop bug: no progress

This loop never changes `lives`. Its condition stays true forever:

```js
let lives = 3

while (lives > 0) {
  console.log(lives)
}
```

That is an **infinite loop**. Before running any `while` loop, point to the line that moves it toward stopping. If you cannot name one, the loop is already broken. The four-step model makes the missing piece obvious: *change* is absent.

### break and continue

Sometimes a loop needs a deliberate exception.

`break` stops the whole loop immediately:

```js
const secretNumber = 7

for (let guess = 1; guess <= 10; guess = guess + 1) {
  if (guess === secretNumber) {
    console.log('Found it: ' + guess)
    break
  }
}
```

Once `guess` is 7, `break` ends the loop. Guesses 8, 9, and 10 never happen.

`continue` skips only the current round:

```js
for (let number = 1; number <= 5; number = number + 1) {
  if (number === 3) {
    continue
  }

  console.log(number)
}
```

Output:

```text
1
2
4
5
```

When `number` is 3, `continue` skips `console.log` for that round. The loop still performs its normal change and continues with 4.

Use `break` and `continue` sparingly. A clear `if` is usually easier to read than several jumps.

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| `index <= names.length` | One extra round; reads `undefined` | Use `index < names.length` |
| Forgetting the change line in a `while` | Infinite loop; frozen tab | Name the progress line before running |
| `const` for a changing counter | Cannot assign the next value | Use `let` for a counter |
| Changing the array while walking it | Items skipped or repeated | Build a new result instead |
| `for...in` on an array | Gives `'0'`, `'1'` names, not values | Use `for...of` or `for` |
| Reaching for a loop when one decision is enough | Harder to read | `if` for one decision, loop for repeated work |
| Off-by-one starting at 1 for the first item | First item never visited | Arrays start at index 0 |

## The TypeScript layer

### The same loop, different safety

Loop syntax is identical in both languages. The runtime behavior is identical too:

```js
const scores = [85, 92, 78]
let total = 0

for (const score of scores) {
  total = total + score
}

console.log(total) // 255
```

```ts
const scores: number[] = [85, 92, 78]
let total: number = 0

for (const score of scores) {
  total = total + score
}

console.log(total) // 255
```

TypeScript adds a promise the compiler checks: `scores` contains numbers, so `score` and `total` must be used as numbers.

### What TypeScript cannot catch

Here is the honest division of labor — it matters more for loops than anywhere else:

```ts
const scores: number[] = [85, 92, 78]

for (const score of scores) {
  // console.log(score.toUpperCase())
  // Error: numbers do not have toUpperCase.
}
```

TypeScript catches using the wrong *kind* of value. It does **not** prove your loop logic is correct:

```ts
while (lives > 0) {
  // TypeScript is perfectly happy. It will not
  // notice that lives never changes.
}
```

| Question | JavaScript | TypeScript |
| --- | --- | --- |
| Does the loop run in the browser or Node? | Yes | Yes, after conversion to JavaScript |
| Can it catch using a string method on a number? | No — fails only at runtime | Yes, before running |
| Can it prove `index < length` was the intended condition? | No | No |
| Can it stop an infinite loop? | No | No |
| Is the loop syntax different? | No | No |

The four-step model and the hand trace are the tools for loop *logic*. TypeScript is the tool for loop *types*. Use both.

### One compiler error, walked through

Open `06_day_loops/starter/ts/main.ts`. The starter builds a `scores: number[]` array and walks it. The last line is commented out and deliberately broken:

```ts
scores.push('not a number')
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

Read it as: *"`scores` is a list of numbers — a string cannot be pushed into it."* The fix is not to loosen the array type; the fix is that the *value* was wrong. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A loop repeats **start → check → work → change**; trace those four steps on paper whenever a loop feels confusing, and remember that TypeScript checks the types inside the loop but never the loop's logic.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `for (let index = 0; index < 3; index = index + 1) { console.log(index) }`
2. `for (let index = 2; index < 5; index = index + 1) { console.log(index) }`
3. `for (let number = 1; number <= 5; number = number + 1) { console.log(number) }`
4. `for (let index = 5; index >= 1; index = index - 1) { console.log(index) }` — note the change subtracts.
5. `let count = 3; while (count > 0) { console.log(count); count = count - 1 }`
6. `for (const color of ['red', 'yellow', 'green']) { console.log('Light: ' + color) }`
7. `for (let number = 1; number <= 5; number = number + 1) { if (number === 3) { continue }; console.log(number) }`
8. `for (let guess = 1; guess <= 5; guess = guess + 1) { if (guess === 3) { console.log('Found'); break }; console.log(guess) }`
9. Draw the four-step trace table for exercise 1. Label the round where the check becomes false.
10. Run `npm.cmd run day6:js` and `npm.cmd run day6`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Print the numbers 1 through 5 with a `for` loop. Expected: 1, 2, 3, 4, 5 on separate lines.
2. Use `for...of` to print each color in `['red', 'yellow', 'green']`.
3. Start with `let count = 3` and use `while` to print 3, 2, 1, then `'Lift off!'`.
4. Given `[12, 7, 20, 4]`, use a loop to count how many values are at least 10. Expected answer: 2.
5. Find the first score below 50 in `[82, 91, 47, 76, 40]`, printing each score you check and stopping as soon as you find the low one.
6. Print only the odd numbers from 1 through 10 using `continue` on the evens.

### Level 3 — Creative synthesis

1. Write a loop that builds the string `'0 1 2 3 4 '` by appending each number plus a space — no `console.log` inside the loop body except the final result.
2. A countdown with a message: print 5, 4, 3, 2, 1 and `'Lift off!'`, using a `while` loop whose progress line you can name in one sentence.
3. An average: use `for...of` to sum `[88, 91, 76, 84, 95]`, then print the average to one decimal place. Watch out: `total / scores.length` is a decimal, not an integer.
4. A boundary-crossing detector: walk `[12, 7, 20, 4]` and print `'first value >= 10 at index N'` the moment it appears — use `break`, and trace why the later items never print.
5. Trace the bug: write a `while` loop that forgets its progress line, put a comment directly above it that says exactly which of the four steps is missing, then (without running the infinite version) rewrite it correctly.
6. TypeScript challenge: type the scores array as `number[]`, add the string push, run `npm.cmd run check`, read the error, fix it, and confirm the check passes again.

## Finish line

Day 6 is complete when you can do all of these **without notes**:

1. Name the four steps every safe loop repeats.
2. Write a `for` loop and a `for...of` loop, and say when each fits.
3. Write a `while` loop and point to the line that makes it stop.
4. Trace any loop on paper and predict its exact output.
5. Explain why `index < names.length` beats `index <= names.length`.
6. Say what `break` and `continue` do, with one example each.
7. State what TypeScript checks in a loop and what it cannot prove.

If any answer is a guess, revisit the matching section before Day 7.

## Prove it

Write, in your own words, a short answer to each:

1. What are the four repeated steps of a loop, and which one stops an infinite loop?
2. Why is the condition checked before the body runs?
3. When would you choose `for...of` instead of `for`?
4. What does `break` do that `continue` does not?
5. Why is `for...in` wrong for array values?
6. What does a TypeScript error like `'string' is not assignable to 'number'` prevent, and what can TypeScript never do for a loop?

Your answers are today's evidence. If you can write them, move to [Day 7: Functions I — Inputs, Work, and Results](../07_day_functions_i/07_day_functions_i.md).

**Day 6 complete.** Repeating work is now exact: you can write a loop, trace it, stop it, and know precisely what TypeScript does and does not protect.