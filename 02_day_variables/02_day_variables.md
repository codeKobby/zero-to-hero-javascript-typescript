# Day 2: Variables — Names, Values, and the Rules of Change

[← Previous lesson](../01_day_setup/01_day_setup.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../03_day_data_types/03_day_data_types.md)



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
  - [A variable is a named box](#a-variable-is-a-named-box)
  - [Declaration, assignment, reassignment](#declaration-assignment-reassignment)
  - [let and const — the two keywords you will use](#let-and-const-the-two-keywords-you-will-use)
  - [Why var is retired](#why-var-is-retired)
  - [Naming rules that keep code honest](#naming-rules-that-keep-code-honest)
  - [undefined versus not declared](#undefined-versus-not-declared)
  - [Hoisting, precisely](#hoisting-precisely)
  - [const locks the name, not the value](#const-locks-the-name-not-the-value)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [What TypeScript adds](#what-typescript-adds)
  - [The string-or-undefined question](#the-string-or-undefined-question)
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
  - [Level 2 — Build small programs](#level-2-build-small-programs)
  - [Level 3 — Use the idea in a small project](#level-3-use-the-idea-in-a-small-project)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Every program you will ever write is a story about data changing over time: the score goes up, the cart fills, the user logs in, the timer counts down. Variables are the names you give to that changing data. If you get variables wrong, every later topic — functions, objects, the event loop — is built on sand.

This lesson is deliberately rigorous about the *rules of change*: when a name may change, when it may not, what happens when you read a name too early, and what the error messages are telling you. Mastery here is not "I used `let` once." Mastery is: given any declaration, you can predict exactly what the program does, and you know why.

## Prerequisites

- Day 1, including the machine model (code is text, a runtime turns it into behavior).
- Node.js installed and verified (`node -v`).

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- declare variables with `let` and `const`, and choose between them with a reason;
- predict and verify the output of assignment and reassignment code;
- explain the difference between `undefined` and a `ReferenceError` by looking at output;
- recognize why `var` is avoided, without reciting a slogan;
- run this course's Day 2 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what a variable actually is, in runtime terms;
- the difference between declaration, assignment, and reassignment;
- what hoisting really does and what it does not do;
- why `const` does not freeze arrays and objects;
- what TypeScript adds to variables, and what it cannot catch.

## The problem this solves

Imagine writing a score counter without a name for the score:

```js
0 = 0 + 1 // meaningless to a human reader, and wrong
```

Numbers need names before programs can talk about them. But naming is exactly where beginners get burned: a name that changes when it should not, a value read before it exists, a misspelling that turns into a `ReferenceError`. This lesson removes those traps by teaching the rules precisely — and then shows what TypeScript adds to make the rules enforceable before the program even runs.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **let** | Declares a name whose value may be reassigned. |
| **const** | Declares a name that cannot be reassigned. |
| **var** | An older declaration keyword with different scope behavior. |
| **undefined** | The value of a declared name that has not received a value. |
| **hoisting** | The runtime preparation of declarations before execution. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [A variable is a named box](#a-variable-is-a-named-box)
- [Declaration, assignment, reassignment](#declaration-assignment-reassignment)
- [let and const — the two keywords you will use](#let-and-const-the-two-keywords-you-will-use)
- [Why var is retired](#why-var-is-retired)
- [Naming rules that keep code honest](#naming-rules-that-keep-code-honest)

## JS runtime deep dive

### A variable is a named box

A variable is a name attached to a value. The runtime keeps a box in memory, labels it with your name, and puts the value inside.

```js
let age = 36
```

When this line runs, the runtime does three things:

1. sees `let`, and prepares a box;
2. labels the box `age`;
3. drops the value `36` inside.

Later code that reads `age` tells the runtime: open the box labeled `age` and give me what is inside.

```
   box: [ age |  36  ]
```

That picture explains a rule you will hit constantly: **a variable holds one value at a time.** Putting a new value in the box throws the old one away. Reading the box never empties it.

### Declaration, assignment, reassignment

Three different actions, three different words:

```js
let score        // 1. declaration: prepare a box named score
score = 10       // 2. assignment: put 10 into the box
score = 20       // 3. reassignment: replace 10 with 20

console.log(score) // 20
```

- **Declaration** creates the name. After `let score`, the box exists but is empty.
- **Assignment** gives the name its first value.
- **Reassignment** replaces the current value with a new one.

A declared-but-unassigned box is not "broken" — it has a real value: `undefined`.

```js
let remainingLives
console.log(remainingLives) // undefined
```

And the `=` sign is *assignment*, not the "equals" of math. Read `counter = counter + 1` aloud as *"take the current value, add 1, store the result back."* In math that sentence is nonsense; in programming it is the most common line in the language:

```js
let counter = 0
counter = counter + 1 // reads 0, computes 1, stores 1
counter = counter + 1 // reads 1, computes 2, stores 2
console.log(counter) // 2
```

The right side of `=` always runs first, using the box's current value.

### let and const — the two keywords you will use

Modern JavaScript gives you exactly two keywords for declaring variables. Choose with intent.

**`let`** means *this value may change*:

```js
let score = 0
score = score + 1 // fine, that is why we chose let
```

**`const`** means *this name is permanently attached to this value*:

```js
const courseName = 'Zero to Hero'
// courseName = 'Something else'
// TypeError: Assignment to constant variable.
```

Try reassigning a `const` and the runtime throws an error at that line. The error is the runtime enforcing your intent: the name does not change.

Two `const` rules to know exactly:

- A `const` must receive its value at declaration. There is no "declare now, assign later":

```js
const name // SyntaxError: Missing initializer in const declaration
```

- The default choice. Start every variable as `const`. Switch to `let` only when you can point at the line where it changes. This is the industry rule, and it makes your code self-documenting: a reader sees `const` and knows the name is stable.

Both keywords are documented in depth on MDN — [read `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) there to meet their full rules, including redeclaration errors and the temporal dead zone mentioned below.

### Why var is retired

`var` is the old declaration keyword, from before `let` and `const`. You will meet it in old code and old tutorials. You should understand it, and you should not write it.

Its sin: `var` ignores block scope. A block is any `{ ... }` — the body of an `if`, a loop, a function. `let` and `const` respect blocks; `var` escapes them:

```js
if (true) {
  var oldScore = 10   // escapes the block
  let newScore = 20   // stays inside the block
}

console.log(oldScore) // 10 — var leaked out
console.log(newScore) // ReferenceError: newScore is not defined
```

A variable that silently escapes its block makes large programs unpredictable: some distant line sees a name it was never supposed to see. `var` also has the early-access behavior shown in the hoisting section below, which hides bugs instead of surfacing them.

The rule: **`var` is retired. Use `let` and `const`.** Know what `var` does so old code is readable; never introduce it.

### Naming rules that keep code honest

A valid JavaScript name must follow hard rules:

- must not begin with a number;
- may only contain letters, digits, `$`, and `_`;
- must not contain spaces or dashes;
- must not be a reserved word (`let`, `const`, `if`, `for`, `class`, ...).

Valid:

```js
firstName
lastName
country
capitalCity
age
isMarried

first_name
num1
_num_1
$num1
year2020
```

Invalid, and why:

```js
first-name // dash is not allowed
1_num      // cannot start with a number
num_#_1    // # is not allowed
let        // reserved word
```

Legal does not mean good. These are legal and terrible:

```js
let x = 'London'  // what is x? nothing in the name says.
let c = 'UK'      // same problem, worse.
```

The course uses **camelCase**: first word lowercase, later words capitalized.

```js
let firstName = 'Ada'
let isMarried = true
let boilingPoint = 100
```

Contrast the readability of `capitalCity` against `capitalcity` or `x`. Teams ship code that other people read; a name that says what the value is *is* the documentation.

### undefined versus not declared

Two outputs that look similar and mean opposite things:

```js
let mystery
console.log(mystery) // undefined
```

`mystery` **exists** — the box is there, it is just empty. `undefined` is the runtime saying *"this name is real, but no value has been assigned."*

```js
console.log(ghost) // ReferenceError: ghost is not defined
```

`ghost` **does not exist** — there is no box with that label. The runtime throws a `ReferenceError`.

The practical skill: when you see `undefined` in output, ask "was this variable ever assigned?" When you see `ReferenceError`, ask "is the name spelled identically everywhere, and was it declared at all?" A misspelled variable is one of the most common beginner bugs, and this pair of outputs is how you diagnose it.

### Hoisting, precisely

You will hear: *"Hoisting means JavaScript moves declarations to the top."* That sentence is a simplification that leads you astray. Here is the precise behavior:

Before the runtime starts running a scope line by line, it **prepares the bindings** — it registers every name declared in that scope. It does not move your code. Assignments still run exactly where you wrote them.

That produces three different behaviors:

```js
console.log(oldCount) // undefined — var names are prepared with undefined inside
var oldCount = 3

// console.log(count) // ReferenceError — let names exist but cannot be read yet
let count = 3

// console.log(course) // ReferenceError — same for const
const course = 'JavaScript'
```

The interval between "scope starts" and "the declaration line" is called the **temporal dead zone** (TDZ). Inside it, a `let` or `const` name exists but is unreadable, and reading it throws a `ReferenceError`.

Why this matters for you:

- `undefined` from a `var` read means "prepared but not assigned yet."
- `ReferenceError` from a `let`/`const` read means "you reached for a name before its declaration line."

The practical lesson is shorter than the theory: **declare every variable at the top of the block where you need it.** Then the TDZ never bites you, and hoisting becomes trivia you can explain in an interview.

MDN's [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) pages both document the temporal dead zone and hoisting in their own words — worth reading side by side to see why `var` predates and `let`/`const` fix it.

### const locks the name, not the value

The most common `const` misconception:

```js
const colors = ['red', 'blue']
colors.push('green') // this works!
console.log(colors) // ['red', 'blue', 'green']
```

`const` forbids *reassigning the name*. It does not freeze the value.

- For primitives (strings, numbers, booleans), the value is the value, so `const` effectively locks it.
- For arrays and objects, `const` locks the *reference* — which name points at which object — but the object's contents can change freely.

```js
const colors = ['red', 'blue']
colors = ['black'] // TypeError: cannot reassign the name
colors[0] = 'black' // fine: changing contents is allowed
```

Same idea with an object:

```js
const user = { name: 'Ada' }
user.name = 'Grace' // fine: contents change
// user = { name: 'Grace' } // TypeError: reassigning the name is blocked
```

Remember the box-and-label picture: `const` superglues the label to the box. What is *inside* the box is the object's business. We explore arrays and objects properly in later days; today's rule is that `const` governs names, not contents.

The [MDN reference for `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) spells out the same rule under "const declarations" — including that `const` creates an immutable binding, not an immutable value.

### Common mistakes table

| Mistake | What happens | The fix |
| --- | --- | --- |
| `const` declared without a value | `SyntaxError` | Assign at declaration |
| Reassigning a `const` | `TypeError: Assignment to constant variable` | Use `let`, or don't change it |
| Reading a misspelled name | `ReferenceError: x is not defined` | Check spelling and declaration |
| Reading a `let`/`const` before its line | `ReferenceError` (TDZ) | Move the declaration above the use |
| Using `var` in new code | Variable escapes blocks | Use `let` or `const` |
| Expecting `const colors` to freeze an array | `colors.push` works and surprises you | `const` locks the name, not contents |
| `first-name` as a name | `SyntaxError` | Use camelCase: `firstName` |
| Declaring a variable with a number first | `SyntaxError` | Start with a letter, `_`, or `$` |

Every row maps to an error the runtime prints. Reading that error is how you fix it — which is exactly the debugging habit Day 1 installed.

## The TypeScript layer

Variables are where TypeScript earns its keep first. Everything below is the same runtime code as above; TypeScript just checks the types *before* the runtime runs.

### What TypeScript adds

TypeScript lets you say what kind of value a name may hold:

```ts
let age: number = 36
age = 37 // fine
// age = 'thirty-seven'
// TypeScript error: Type 'string' is not assignable to type 'number'.
```

In plain JavaScript the same mistake is silent — the box just gets a string and the bug surfaces somewhere else later:

```js
let age = 36
age = 'thirty-seven' // no error at this line
```

The annotation `: number` is a contract TypeScript enforces at development time, in the editor and in `npm run check`, before the program runs. That is the whole job: catch the wrong assignment while the code is still on your screen.

Most of the time you do not even write the annotation — TypeScript infers it:

```ts
const city = 'London' // inferred as string
let score = 0 // inferred as number
let isActive = true // inferred as boolean
```

Inference is the default and it is usually enough. Write an explicit annotation when it clarifies a contract or when there is nothing to infer:

```ts
let userName: string // declared now, assigned later
```

The course rule: annotate when it helps a reader; skip when inference is obvious.

### The string-or-undefined question

A variable declared but not yet assigned has the type `undefined` — and TypeScript models that honestly:

```ts
let futureGoal: string | undefined // may hold a string, or nothing yet
```

The `|` reads "or." This is a **union type**: the value may be a string, or it may be the absence of a value. When we reach the section on handling missing values, this annotation becomes the tool that forces you to check before using.

### What TypeScript cannot catch

TypeScript knows types, not truth. All of these pass and are still bugs:

```ts
let age: number = 25 // correct type. Is 25 right? TypeScript cannot say.
let total: number = price + 2 // fine if price is a number. Is the formula right? Unknown.
```

It also cannot see runtime reality — a failed network call, a missing file, bad user input. Those still need runtime handling, later in the course.

TypeScript makes *type* mistakes early. It does not make *design* mistakes good. A junior who can name which category a bug belongs to is already separating themselves.

### One compiler error, walked through

Open `02_day_variables/starter/ts/main.ts`. The file ends with a commented-out line that is deliberately broken:

```ts
completedLessons = 'two' // string where a number is expected
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the exact line and the reason:

```
Type 'string' is not assignable to type 'number'.
```

Read it as: *"`completedLessons` was declared as a number, and you assigned a string. Those do not match; I am stopping you here."* Two valid fixes exist, and choosing is the point:

- if the value should be a number, write `completedLessons = 2`;
- if the variable genuinely holds either kind, change the declaration to `let completedLessons: number | string`.

Comment the line back out when you are done, so the starter keeps passing `npm run check`. A clean check is silent — that silence is the sound of the contract being kept.

## One-sentence mental model

A variable is a labeled box holding one value at a time; `const` locks the label, `let` allows changing the value, `var` is retired because it ignores blocks, and TypeScript checks the type of what goes in the box before the runtime runs.

## Learn more on MDN

Variables look simple until you read the fine print. Bookmark these pages and return as you grow:

- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) — redeclaration errors, scoping, and the temporal dead zone
- [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) — immutable bindings versus immutable values
- [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) — the old keyword and why it escapes blocks
- [Identifier](https://developer.mozilla.org/en-US/docs/Glossary/Identifier) — the full grammar rules for valid names
- [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) — the value of a declared-but-unassigned name
- [ReferenceError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) — the error for names that do not exist or are in the TDZ
- [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) — the error for reassigning a `const`
- [Scope (JavaScript guide)](https://developer.mozilla.org/en-US/docs/Glossary/Scope) — blocks, functions, and where names live

### TypeScript docs

- [Variable Declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html) — how `let`/`const` map to TypeScript, with `const` guidance for object shapes
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — annotations and `string | undefined` unions

## Read the first example line by line

The first runnable example introduces **Variables — Names, Values, and the Rules of Change**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `0 = 0 + 1 // meaningless to a human reader, and wrong` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Variables — Names, Values, and the Rules of Change**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Variables — Names, Values, and the Rules of Change**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, **write down the exact output before running it**, then run and compare.

1. `let a = 1` then `a = a + 2` then `console.log(a)`
2. `const b = 2` then `console.log(b + 1)`
3. `let c` then `console.log(c)`
4. `console.log(d)` where `d` is never declared — predict the error type
5. `let e = 5`, `e = e * 2`, `e = e - 1`, `console.log(e)`
6. `const f = [1, 2]`, then `f.push(3)`, then `console.log(f)`
7. `let g = 'hi'`, `g = g + '!'`, `console.log(g)`
8. `console.log(h)` then `var h = 4` — predict, then run
9. `console.log(i)` then `let i = 4` — predict, then run
10. Run `npm.cmd run day2:js` and `npm.cmd run day2`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Build small programs

1. Make a score counter. Start at `0`, add `3`, subtract `1`, and add `2`. Print the score after each change.
2. Make a profile. Store a name, age, country, city, and `isStudent`. Print all five values.
3. Swap two values. Start with `a = 1` and `b = 2`. Finish with `a = 2` and `b = 1`.
4. Print one `undefined` value. Then read a name that was never declared. What is different about the two results?
5. Make `const colors = ['red']`. Add `'blue'` with `push`. Then try to assign a new array and record the error.
6. Start `counter` at `0`. Add `1` three times. Print the number after each addition.
7. Open the [MDN `let` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let). Read about the temporal dead zone. Read a `let` variable before its declaration and write down the exact error.

### Level 3 — Use the idea in a small project

1. Store `20` degrees Celsius in a `const` variable. Convert it to Fahrenheit and print both values.
2. Store three item prices. Add them and print the receipt total.
3. Write five tiny snippets. Predict each result before you run it. Correct one prediction that was wrong.
4. In TypeScript, declare `let name: string | undefined`. Assign a string and print it. Then make one bad assignment and run the type check.
5. Write one short comment explaining why `var`, `let`, and `const` behave differently before their declaration.

## Finish line

Day 2 is complete when you can do all of these **without notes**:

1. Declare variables with `let` and `const`, and justify each choice in one sentence.
2. Predict the output of reassignment code before running it.
3. Tell the difference between `undefined` and `ReferenceError` from the output alone.
4. Explain why `var` is retired, using the block-escape example.
5. Explain why `const colors.push(...)` works.
6. Say what TypeScript checks in a variable assignment, and name one thing it cannot check.

If any answer is a guess, revisit the matching section before Day 3.

## Prove it

Write, in your own words, a short answer to each:

1. What is a variable, in runtime terms?
2. What is the difference between declaration, assignment, and reassignment?
3. When do you choose `let`, and when `const`?
4. What does hoisting actually do, precisely?
5. Why does `const` allow `colors.push('green')`?
6. What does TypeScript catch for variables that JavaScript misses, and what can it not catch?

Your answers are today's evidence. If you can write them, move to [Day 3: Data Types — Numbers Deep Dive](../03_day_data_types/03_day_data_types.md).

**Day 2 complete.** You now know what a variable is at runtime, the exact rules of change, why `var` is retired, what hoisting really does, and how TypeScript makes the box's type a contract.
