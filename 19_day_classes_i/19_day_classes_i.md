# Day 19: Classes and Instances — Blueprints and Objects

[← Previous lesson](../18_day_error_handling/18_day_error_handling.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../20_day_classes_ii/20_day_classes_ii.md)



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
  - [A class is one way to create related objects](#a-class-is-one-way-to-create-related-objects)
  - [Read class code as an instance recipe](#read-class-code-as-an-instance-recipe)
  - [Instance versus class](#instance-versus-class)
  - [Methods need the right receiver](#methods-need-the-right-receiver)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Declare fields and method contracts](#declare-fields-and-method-contracts)
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

Objects already solve many problems. A class is useful when you need **many objects that share the same data shape and behaviors** — a list of courses, timers, reading progress entries. It is syntax built on JavaScript's prototype system, not a replacement for objects or functions.

This lesson teaches you to read class code as an instance recipe, understand the shared-vs-own split (methods are shared; data is per-instance), and see why `this` must be the right receiver.

## Prerequisites

- Day 7: functions and `return`.
- Day 9: objects, `this`-adjacent object methods.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- write a class with a constructor, state fields, and methods;
- create multiple independent instances with `new`;
- call an instance method and read instance state;
- explain why ticking one instance does not change another;
- type a class's fields, constructor, and methods in TypeScript;
- run this course's Day 19 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what object `this` refers to during `progress.summary()`;
- which data is unique to each instance and which is shared;
- why two instances can use the same method without sharing changing state;
- when a plain object and a function are simpler than a class.

## The problem this solves

A course tracker must hold progress for many courses at once. Each entry needs the same shape — a title and a completed-lesson count — and the same behaviors: mark one more lesson done, produce a summary.

```js
class ReadingProgress {
  constructor(title, completedLessons) {
    this.title = title
    this.completedLessons = completedLessons
  }

  completeNextLesson() {
    this.completedLessons += 1
  }

  summary() {
    return this.title + ': ' + this.completedLessons + ' lessons complete'
  }
}

const progress = new ReadingProgress('JavaScript', 18)
progress.completeNextLesson()
console.log(progress.summary())
```

The class is the recipe; each `new` call bakes a separate instance with its own data.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **A class is one way to create related objects** | The lesson explains a class is one way to create related objects through runnable examples and practice. |
| **Read class code as an instance recipe** | The lesson explains read class code as an instance recipe through runnable examples and practice. |
| **Instance versus class** | The lesson explains instance versus class through runnable examples and practice. |
| **Methods need the right receiver** | The lesson explains methods need the right receiver through runnable examples and practice. |
| **Common mistakes table** | The lesson explains common mistakes table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [A class is one way to create related objects](#a-class-is-one-way-to-create-related-objects)
- [Read class code as an instance recipe](#read-class-code-as-an-instance-recipe)
- [Instance versus class](#instance-versus-class)
- [Methods need the right receiver](#methods-need-the-right-receiver)
- [Common mistakes table](#common-mistakes-table)

## JS runtime deep dive

### A class is one way to create related objects

Use a class when an instance owns state and methods that work on that state. Do not create a class merely to hold a collection of unrelated helper functions. JavaScript's classes are syntax over its prototype-based inheritance — the [MDN class reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) explains the difference and the pieces this course uses: constructors, static methods, and field declarations.

### Read class code as an instance recipe

Trace `new ReadingProgress('JavaScript', 18)`:

1. JavaScript creates one new object.
2. The constructor runs with that object as `this`.
3. The constructor stores `title` and `completedLessons` on that object.
4. The variable `progress` refers to the finished instance.

Methods written in the class body are shared through the class prototype. The instance owns its changing data; it does **not** get a separate copy of every method. The prototype mechanism underneath all of this is documented in the MDN guide [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain), which shows how method lookup actually walks the chain.

### Instance versus class

The class is `ReadingProgress`. `progress` is one instance. A second instance has different state:

```js
const first = new ReadingProgress('JavaScript', 19)
const second = new ReadingProgress('TypeScript', 4)

first.completeNextLesson()
console.log(first.completedLessons)  // 20
console.log(second.completedLessons) // 4
```

`completeNextLesson` updated `first`'s own `completedLessons`; `second` is untouched. Methods are shared, state is per-instance. The [MDN `new` operator reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) shows the exact steps `new` performs, including how the constructor is invoked with the fresh object as `this`.

### Methods need the right receiver

When you call `progress.summary()`, JavaScript sets `this` inside `summary` to `progress`. If you take the method away from the object, that relationship is lost:

```js
const showSummary = progress.summary
// showSummary() is not a safe call: this is no longer progress.
```

For now, call instance methods **through their instance**. You will return to `this` and callbacks later with DOM events.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Forgetting `new` | The constructor is called as a plain function | Always `new ClassName(...)` |
| Naming the class and an instance the same | Confusing recipe with result | `const progress = new ReadingProgress(...)` |
| Expecting each instance to copy the methods | Methods live on the prototype | Understand state is owned, methods are shared |
| Using a class for unrelated helpers | Misusing the recipe tool | Prefer plain functions/objects |
| Detaching a method and calling it bare | `this` is no longer the instance | Call through the instance |

## The TypeScript layer

### Declare fields and method contracts

The JavaScript class runs as shown. TypeScript declares the fields and method contracts:

```ts
class ReadingProgress {
  title: string
  completedLessons: number

  constructor(title: string, completedLessons: number) {
    this.title = title
    this.completedLessons = completedLessons
  }

  completeNextLesson(): void {
    this.completedLessons += 1
  }
}
```

TypeScript's public constructor shorthand can reduce this later, but writing the assignments today makes the flow visible.

### What TypeScript cannot decide

TypeScript cannot stop a JavaScript caller from passing bad runtime data — validate external input at the boundary. It also cannot decide whether a class is even the right tool for the job; that is a design choice you make from the problem shape.

### One compiler error, walked through

Open `19_day_classes_i/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const broken = new ReadingProgress(18, 'JavaScript')
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Argument of type 'number' is not assignable to parameter of type 'string'.
```

Read it as: *"The constructor's contract says `title` is a string and `completedLessons` is a number; the arguments must match in order."* The fix is to pass the arguments in the declared order:

```ts
const fixed = new ReadingProgress('JavaScript', 18)
```

Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A class is a recipe for instances — `new` builds a fresh object, the constructor stores per-instance state on `this`, methods are shared through the prototype, and TypeScript declares the fields and constructor contract in advance.

## Learn more on MDN

Classes sit on top of a large language feature — bookmark the pages that match the recipe you just traced:

- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) — class syntax, constructors, static members, and field declarations
- [new operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) — the exact steps that build a fresh instance
- [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) — the method that initializes each instance
- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) — what `this` refers to during an instance method call
- [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain) — the guide behind class syntax
- [Public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) — declaring state directly on the class body
- [instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) — the runtime check that an object is an instance

### TypeScript docs

- [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) — TypeScript's field declarations, modifiers, and constructor typing
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — `instanceof` narrowing for class instances

## Read the first example line by line

The first runnable example introduces **Classes and Instances — Blueprints and Objects**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `class ReadingProgress {` | Expression or data declaration: identify the values, operators, and names before running it. |
| 2 | `  constructor(title, completedLessons) {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 3 | `    this.title = title` | Expression or data declaration: identify the values, operators, and names before running it. |
| 4 | `    this.completedLessons = completedLessons` | Expression or data declaration: identify the values, operators, and names before running it. |
| 5 | `  }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 6 | `` | Blank line: it separates ideas for the reader. |
| 7 | `  completeNextLesson() {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 8 | `    this.completedLessons += 1` | Expression or data declaration: identify the values, operators, and names before running it. |
| 9 | `  }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 10 | `` | Blank line: it separates ideas for the reader. |
| 11 | `  summary() {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 12 | `    return this.title + ': ' + this.completedLessons + ' lessons complete'` | Return statement: the function sends a result back to its caller. |
| 13 | `  }` | Expression or data declaration: identify the values, operators, and names before running it. |
| 14 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Classes and Instances — Blueprints and Objects**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Classes and Instances — Blueprints and Objects**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. `new ReadingProgress('JavaScript', 18)` — what object does the variable refer to?
2. After `first.completeNextLesson()`, why is `second.completedLessons` unchanged?
3. `progress.summary()` — what does `this` refer to inside `summary`?
4. `const showSummary = progress.summary; showSummary()` — why is that not a safe call?
5. What is stored per-instance versus shared through the prototype?
6. `new ReadingProgress('X')` — what is `completedLessons` in this case (JavaScript)?
7. Run `npm.cmd run day19:js` and `npm.cmd run day19`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 2695 Array Wrapper — https://leetcode.com/problems/array-wrapper/ (hint: NeetCode roadmap) See [LEETCODE_GUIDE.md](../LEETCODE_GUIDE.md) for how to approach it.

### Level 2 — Applied mini-projects

1. Create a `Timer` class with a `label` and `elapsedSeconds`. Add `tick` and `reset` methods.
2. Create two `Timer` instances. Demonstrate that ticking one does not change the other.
3. Add a `summary` method that returns a readable string such as `'Study: 5 seconds'`.
4. TypeScript: explicitly type every field, parameter, and return type. Use `void` for state-changing methods.

### Level 3 — Creative synthesis

1. The counter: write a `CourseProgress` class with `title`, `totalLessons`, and `completedLessons`. Add `completeLesson()`, `percentComplete()` (a number from 0-100), and `status()` returning `'In progress'`, `'Complete'`, or `'Not started'`.
2. The clock: write a `Stopwatch` class with `elapsedSeconds`, `start()`, `tick()`, and `reset()`. Add a `label()` method. State the rule for what happens when `tick` runs before `start`.
3. The catalog: build an array of three `ReadingProgress` instances and log each `summary()`. Show that mapping over them works like any object array.
4. The decision memo: write a comment block comparing a class to a plain object-plus-function for the same `ReadingProgress` idea, and state when you would choose each.
5. **MDN lookup:** Open the [class reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), find `static` methods and public class fields, and add a `static create(title, completedLessons)` factory plus a static counter that tracks how many `ReadingProgress` instances were created. Comment on why the counter is shared across all instances rather than stored per-instance.

## Finish line

Day 19 is complete when you can do all of these **without notes**:

1. Write a class with a constructor, state fields, and methods.
2. Create multiple independent instances with `new`.
3. Call an instance method and read instance state.
4. Explain why state is per-instance while methods are shared.
5. Explain what `this` refers to inside an instance method.
6. Type a class's fields, constructor, and methods in TypeScript.

If any answer is a guess, revisit the matching section before Day 20.

## Prove it

Write, in your own words, a short answer to each:

1. What object does `this` refer to during `progress.summary()`?
2. Which data is unique to each instance?
3. Why can two instances use the same method without sharing changing state?
4. When might a plain object and a function be simpler than a class?
5. Why does detaching a method from its instance break `this`?
6. What does the type checker know that your tests must still verify about classes?

Your answers are today's evidence. If you can write them, move to [Day 20: Designing Classes — Contracts and Data Hiding](../20_day_classes_ii/20_day_classes_ii.md).

**Day 19 complete.** A class is now a readable recipe: `new` bakes an independent instance, the constructor stores its state, methods are shared through the prototype, and `this` is only safe when the call goes through the instance.