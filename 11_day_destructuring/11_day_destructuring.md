# Day 11: Destructuring — Extracting Values Cleanly

[← Previous lesson](../10_day_arrays/10_day_arrays.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../12_day_hof_i/12_day_hof_i.md)



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
  - [The long way first](#the-long-way-first)
  - [Object destructuring uses property names](#object-destructuring-uses-property-names)
  - [Array destructuring uses positions](#array-destructuring-uses-positions)
  - [Defaults handle only undefined](#defaults-handle-only-undefined)
  - [Rest gathers what remains](#rest-gathers-what-remains)
  - [Spread places values into something new](#spread-places-values-into-something-new)
  - [Rest versus spread: the same dots, two jobs](#rest-versus-spread-the-same-dots-two-jobs)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Type the source, infer the destructured variables](#type-the-source-infer-the-destructured-variables)
  - [Optional properties stay optional](#optional-properties-stay-optional)
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

You already know how to read one array item with `scores[0]` and one object property with `book.title`. But real code constantly needs *several* values from one source — the first three scores from an array, or `name` and `track` from a user record. Writing line after line of `const name = learner.name` is verbose, and functions in real codebases receive whole objects and arrays that they must pull apart.

This lesson teaches the compact syntax that does that pulling apart: **destructuring** (assigning several values from an array or object in one line), **rest** (collecting whatever is left over), and **spread** (placing an array or object's contents into something new). The `...` token looks identical in rest and spread — its job depends on where it appears — and the classic beginner trap is confusing the two. By the end you will read either one correctly just from its position.

## Prerequisites

- Day 6: loops over arrays.
- Day 9: objects, properties, copying with spread.
- Day 10: arrays, indexes, `length`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- destructure arrays by position and objects by property name;
- skip positions and rename properties;
- supply defaults that apply only when a value is `undefined`;
- gather remaining values with rest;
- place an array or object's contents into a new value with spread;
- build an "immutable update" — a new object that keeps the original untouched;
- run this course's Day 11 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- why `const { name } = learner` reads a property while `const [name] = learner` reads a position;
- why rest must be the last element of a pattern;
- why `{ ...task, done: true }` does not change `task.done`;
- what a default does and when it does not apply;
- why a TypeScript default turns an optional property into a definite value.

## The problem this solves

An API returns one learner record. Your code needs the `name` and `track` as local variables:

```js
const learner = {
  name: 'Mina',
  track: 'frontend',
  completedLessons: 11
}

const name = learner.name
const track = learner.track
```

Two variables, two lines, two chances to typo the property name. Now add ten properties and a function that needs several of them, and the boilerplate drowns the meaning. The code that *wants the data* spends all its energy *copying the data out*.

Destructuring collapses the assignment to one line:

```js
const { name, track } = learner
```

Same result — two variables holding `'Mina'` and `'frontend'` — with the shape of the source written once. This is not a new feature of objects; it is assignment syntax that reads the object for you. And its partner, spread, solves the other half of the problem: *copying* an object or array so you can change it without mutating the original.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **The long way first** | The lesson explains the long way first through runnable examples and practice. |
| **Object destructuring uses property names** | The lesson explains object destructuring uses property names through runnable examples and practice. |
| **Array destructuring uses positions** | The lesson explains array destructuring uses positions through runnable examples and practice. |
| **Defaults handle only undefined** | The lesson explains defaults handle only undefined through runnable examples and practice. |
| **Rest gathers what remains** | The lesson explains rest gathers what remains through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [The long way first](#the-long-way-first)
- [Object destructuring uses property names](#object-destructuring-uses-property-names)
- [Array destructuring uses positions](#array-destructuring-uses-positions)
- [Defaults handle only undefined](#defaults-handle-only-undefined)
- [Rest gathers what remains](#rest-gathers-what-remains)

## JS runtime deep dive

### The long way first

Before the shortcut, the long way:

```js
const learner = { name: 'Mina', track: 'frontend', completedLessons: 11 }

const name = learner.name
const track = learner.track
```

That is valid JavaScript. Object destructuring is a shorter assignment that says the same thing:

```js
const { name, track } = learner
```

Read it from right to left:

1. Start with the object in `learner`.
2. Look up its `name` property and store it in a variable named `name`.
3. Look up its `track` property and store it in a variable named `track`.

The braces are **not** making a new object here. On the left side of `=`, braces describe *which properties to pull out*. Read the [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) reference for the full syntax.

### Object destructuring uses property names

Property order does not matter — the names do:

```js
const book = { title: 'Dune', author: 'Frank Herbert', year: 1965 }
const { author, title } = book

console.log(title)  // Dune
console.log(author) // Frank Herbert
```

Rename a property when the local variable needs a different name:

```js
const { title: bookTitle } = book
console.log(bookTitle) // Dune
```

The syntax is `sourceProperty: localVariable`. Read `{ title: bookTitle }` as *"pull out `title` and call it `bookTitle` here."*

A default supplies a fallback when the property is missing:

```js
const { format = 'paperback' } = book
console.log(format) // paperback (book has no format property)
```

### Array destructuring uses positions

Arrays have ordered slots, so square brackets describe positions:

```js
const scores = [92, 86, 74]
const [first, second] = scores

console.log(first)  // 92
console.log(second) // 86
```

Trace it:

| Pattern position | Source position | New variable |
| --- | --- | --- |
| first slot | `scores[0]` = 92 | `first` = 92 |
| second slot | `scores[1]` = 86 | `second` = 86 |

To skip a position, leave an empty space between commas:

```js
const [gold, , bronze] = ['gold', 'silver', 'bronze']
console.log(gold, bronze) // gold bronze
```

### Defaults handle only undefined

A default kicks in when the value is `undefined` — a missing item or missing property. It does **not** kick in for other falsy values:

```js
const [first, second = 'fallback'] = ['Mina']
console.log(second) // fallback (the second item is undefined)

const [firstValue, secondValue = 0] = [10, 0]
console.log(secondValue) // 0 — the default does NOT replace a supplied 0
```

The rule: a default handles `undefined`, not `0`, not `''`. Supplied values win.

### Rest gathers what remains

**Rest** appears in a destructuring pattern and gathers the unassigned remainder into one new array or object:

```js
const [winner, ...otherFinishers] = ['Mina', 'Kai', 'Owen']
// winner is 'Mina'
// otherFinishers is ['Kai', 'Owen']

const { name, ...publicProfile } = learner
// publicProfile is { track: 'frontend', completedLessons: 11 }
```

Rest must be the **last** element because it means "everything that is still left." This is invalid:

```js
// const [...others, last] = [1, 2, 3]   // Error: rest must be last
```

Rest creates a new outer array or object, but it is not a deep copy. If a nested object is shared, both outer containers still point to that same nested object. See [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) for how the same token works in function calls.

### Spread places values into something new

**Spread** appears inside an array literal, object literal, or function call. It takes an iterable or object and places its contents there:

```js
const requiredTopics = ['variables', 'functions']
const allTopics = [...requiredTopics, 'arrays']
// allTopics is ['variables', 'functions', 'arrays']

const originalProfile = { name: 'Mina', role: 'learner' }
const promotedProfile = { ...originalProfile, role: 'mentor' }
// promotedProfile is { name: 'Mina', role: 'mentor' }
```

For `allTopics`, JavaScript makes a new array containing the elements of `requiredTopics`, then adds `'arrays'`. For `promotedProfile`, it copies the listed properties, then the later `role` property **replaces** the earlier one. Read the [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) reference to see every place spread works.

This gives the clean "immutable update" pattern — change a copy, never the original:

```js
const tasks = ['read', 'practice']
const nextTasks = [...tasks, 'review']

console.log(tasks)     // ['read', 'practice']
console.log(nextTasks) // ['read', 'practice', 'review']
```

### Rest versus spread: the same dots, two jobs

| Syntax | Direction | Example question |
| --- | --- | --- |
| rest (`...name` in a pattern) | many values → one variable | "What values are left?" |
| spread (`...name` in a literal or call) | one array/object → many positions/properties | "How do I place these values here?" |

The dots are identical; the **position** decides the job. In a destructuring pattern (`[a, ...rest]`, `{ a, ...rest }`), it is rest. In a literal or function call (`[...arr]`, `{ ...obj }`, `f(...args)`), it is spread.

Neither syntax magically protects data from mutation. A copied outer array protects you from *outer* changes; nested objects inside it are still shared references (Day 9's shallow-copy rule).

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Using `{}` on an array or `[]` on an object | Braces = names, brackets = positions | Match the pattern to the source's nature |
| Expecting object destructuring to respect order | Object properties are looked up by name | Order does not matter; names do |
| Confusing rest and spread | The dots look identical | Read the position: pattern = rest, literal/call = spread |
| Putting rest anywhere but last | Rest means "all that remains" | Move it to the final position |
| Expecting a default to replace `0` or `''` | Defaults fire only on `undefined` | Check your data's real values |
| Mutating the source through a "copy" of nested data | Spread and rest are shallow | Copy nested objects explicitly when needed |

## The TypeScript layer

### Type the source, infer the destructured variables

```js
const { name, track } = learner
```

```ts
type Learner = {
  name: string
  track: 'frontend' | 'backend'
  completedLessons: number
}

const learner: Learner = {
  name: 'Mina',
  track: 'frontend',
  completedLessons: 11
}

const { name, track } = learner
// name is inferred as string
// track is inferred as 'frontend' | 'backend'
```

Type the **source** value once; TypeScript infers each destructured variable from the source's type. Do not write a second, unrelated type for the destructured variables — that creates a second shape that can drift from the real source.

### Optional properties stay optional

When you destructure an optional property without a default, TypeScript keeps the uncertainty:

```ts
type Profile = { name: string; nickname?: string }
const profile: Profile = { name: 'Mina' }

const { nickname } = profile
// nickname is string | undefined
```

Add a default and the default handles the `undefined`, so the variable is definite:

```ts
const { nickname = 'new learner' } = profile
// nickname is string — the default covers the undefined case
```

TypeScript understands the default precisely because it understands when the default fires: only on `undefined`.

### What TypeScript cannot decide

Types check shapes, not presence at runtime. TypeScript cannot know whether an object arriving from an API actually *has* every property its type claims — it trusts the type you wrote. And TypeScript cannot tell you whether destructuring the fifth position of an array is *meaningful*; a tuple (Day 10) is how you encode that intent, and even then the runtime value decides.

| Question | JavaScript | TypeScript |
| --- | --- | --- |
| Does destructuring read the same properties at runtime? | Yes | Yes (same runtime) |
| Can it flag a destructured property that is not in the type? | No | Yes |
| Can it prove an API object really has its declared properties? | No | No |
| Does a default change the runtime value? | Yes | Yes (same rule: fires on `undefined`) |

### One compiler error, walked through

Open `11_day_destructuring/starter/ts/main.ts`. The starter defines a `Learner` type and destructures it. The last line is commented out and deliberately broken:

```ts
const { learnerId } = learner
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Property 'learnerId' does not exist on type 'Learner'.
```

Read it as: *"You asked to pull `learnerId` out of a `Learner`, but `Learner` has no such property — check the name."* The fix is not to add the property to the type; the fix is that the code asked for a property the source does not declare. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Destructuring pulls values out of a source in one line — objects by name, arrays by position, with defaults that fire only on `undefined`, rest gathering what remains, and spread placing contents into something new — while TypeScript checks that every name you pull out actually exists in the source's type.

## Learn more on MDN

Bookmark these pages and return as you grow:

- [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) — the full syntax for pulling values out of arrays and objects.
- [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) — gathering remaining values, including in function calls.
- [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — placing contents into an array literal, object literal, or call.
- [Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) — the function-side cousin of destructuring defaults.
- [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) — how object literals, shorthand, and computed names work.
- [Property accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) — dot and bracket notation behind every destructured name.
- [Shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) — why nested objects are still shared after spread and rest.

### TypeScript docs

- [Variable Declarations](https://www.typescriptlang.org/docs/handbook/variable-declarations.html) — destructuring and rest in TypeScript, in depth.
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the source types your destructured variables are inferred from.

## Read the first example line by line

The first runnable example introduces **Destructuring — Extracting Values Cleanly**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const learner = {` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `  name: 'Mina',` | Expression or data declaration: identify the values, operators, and names before running it. |
| 3 | `  track: 'frontend',` | Expression or data declaration: identify the values, operators, and names before running it. |
| 4 | `  completedLessons: 11` | Expression or data declaration: identify the values, operators, and names before running it. |
| 5 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |
| 6 | `` | Blank line: it separates ideas for the reader. |
| 7 | `const name = learner.name` | Declaration or assignment: the runtime creates or updates a named value. |
| 8 | `const track = learner.track` | Declaration or assignment: the runtime creates or updates a named value. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Destructuring — Extracting Values Cleanly**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Destructuring — Extracting Values Cleanly**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use [practice/exercises.md](practice/exercises.md) first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `const book = { title: 'Dune', author: 'Frank Herbert' }` with `const { title, author } = book` — what are `title` and `author`?
2. `const { author: writer } = book` — what does `writer` hold? Does a variable named `author` exist?
3. `const scores = [92, 86, 74]` with `const [first, second] = scores` — what are `first` and `second`?
4. `const [gold, , bronze] = ['gold', 'silver', 'bronze']` — what are `gold` and `bronze`?
5. `const [a, b = 'fallback'] = ['Mina']` — what is `b`?
6. `const [a, b = 0] = [10, 0]` — what is `b`, and why is the default ignored?
7. `const [winner, ...rest] = ['Mina', 'Kai', 'Owen']` — what is `rest`?
8. `const { name, ...progress } = learner` — what does `progress` hold?
9. `const updated = { ...learner, completedLessons: 12 }` — does `learner.completedLessons` change? What is `updated.completedLessons`?
10. Run `npm.cmd run day11:js` and `npm.cmd run day11`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. From `['first', 'middle', 'last']`, create variables `first` and `last` without indexing (skip the middle).
2. From `{ id: 7, title: 'Inbox', done: false }`, create a variable named `taskTitle` for `title`.
3. Create a new `updatedTask` object that keeps every task property but changes `done` to `true`. Confirm the original is still `false`.
4. From a `learner` object, destructure `name` and use rest to collect the remaining properties into `progress`.
5. TypeScript: define a `Task` type with an optional `assignee`. Destructure it with a fallback of `'unassigned'`.
6. Write `printFirstTwo(scores)` that destructures the first two items in its parameter and logs them.
7. **MDN lookup:** on the [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) page, read the "Assigning to new variable names" section, then write `extractTitle(book)` that destructures `title` into a variable named `bookTitle` and returns it.

### Level 3 — Creative synthesis

1. The swap: destructure two variables to **swap** their values without a third variable. (Hint: `[a, b] = [b, a]` — assignment without `const`.) Trace it and explain why it works.
2. The config updater: write `updateSetting(settings, key, value)` that returns a **new** settings object with `[key]: value` applied, leaving the original untouched. Explain in a comment why the original is safe.
3. The podium: from `['gold', 'silver', 'bronze', 'wood']`, destructure `gold`, `silver`, and `bronze` while dropping the rest into `others` — one line. Verify `others` is `['wood']`.
4. The rest-must-be-last story: write the invalid pattern `const [...others, last] = [1, 2, 3]` in a comment, and in your own words explain the error before you run it.
5. The default trap: destructure a default from `[10, 0]` expecting a fallback, observe the real result, and write a comment explaining exactly when defaults fire — using the rule from this lesson.

## Finish line

Day 11 is complete when you can do all of these **without notes**:

1. Destructure an object by name and an array by position.
2. Rename a property and skip an array position.
3. Explain when a default applies and when it does not.
4. Gather the remainder with rest, knowing it must be last.
5. Build an immutable update with spread that leaves the original untouched.
6. Say whether TypeScript can flag a destructured property missing from the source type.

If any answer is a guess, revisit the matching section before Day 12.

## Prove it

Write, in your own words, a short answer to each:

1. Why does `const { name } = learner` read a property while `const [name] = learner` reads a position?
2. Why must rest be the last element of a destructuring pattern?
3. Why does `{ ...task, done: true }` not change `task.done`?
4. When does a default apply, and why does it not replace a supplied `0`?
5. How does rest differ from spread, and how do you tell them apart from the syntax alone?
6. Why does a TypeScript default turn an optional property into a definite value?

Your answers are today's evidence. If you can write them, move to [Day 12: Higher-Order Functions I — map, filter, reduce, and forEach](../12_day_hof_i/12_day_hof_i.md).

**Day 11 complete.** Destructuring is now exact: one line pulls out exactly the values you need — objects by name, arrays by position, defaults, rest, and spread — with TypeScript checking that every name you pull actually exists in the source.