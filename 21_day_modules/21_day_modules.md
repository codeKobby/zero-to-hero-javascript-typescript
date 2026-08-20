# Day 21: Modules — Imports and Exports

[← Previous lesson](../20_day_classes_ii/20_day_classes_ii.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../22_day_json/22_day_json.md)



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
  - [One program can be many files](#one-program-can-be-many-files)
  - [Follow the actual starter files](#follow-the-actual-starter-files)
  - [Named exports are the default choice here](#named-exports-are-the-default-choice-here)
  - [Imports run before the rest of the module body](#imports-run-before-the-rest-of-the-module-body)
  - [Imported bindings are read-only](#imported-bindings-are-read-only)
  - [Browser modules need module scripts](#browser-modules-need-module-scripts)
  - [Dynamic import is a later-loading tool](#dynamic-import-is-a-later-loading-tool)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Types cross module boundaries too](#types-cross-module-boundaries-too)
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

As a program grows, one enormous file makes names collide and responsibilities blur. A **module** is a file with an explicit public surface: `export` makes a value available to another module, `import` receives it, and values not exported stay private to their file.

This is not just organization. A small public surface makes code easier to test, change, and explain — and it is the foundation for every real-world codebase you will read.

## Prerequisites

- Day 6-10: variables, functions, arrays, objects.
- Day 19-20: classes and design instincts.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- split a program across multiple files with `export` and `import`;
- read a relative module path like `./formatters.js`;
- use named exports and keep a helper private to its file;
- export and import a TypeScript type across a module boundary;
- run this course's Day 21 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- what code can import a value that is not exported;
- why the starter uses `./formatters.js` rather than `formatters.js`;
- the runtime difference between exporting a type and exporting a function;
- when dynamic import is worth its asynchronous complexity.

## The problem this solves

A formatter grows. Instead of one file holding learner logic, formatting, and the entry point, split the work by responsibility:

```
starter/js/
  formatters.js
  main.js
```

`formatters.js` owns text formatting. `main.js` imports only the public functions it needs. Each file is smaller, each name is scoped, and the boundary is explicit.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **One program can be many files** | The lesson explains one program can be many files through runnable examples and practice. |
| **Follow the actual starter files** | The lesson explains follow the actual starter files through runnable examples and practice. |
| **Named exports are the default choice here** | The lesson explains named exports are the default choice here through runnable examples and practice. |
| **Imports run before the rest of the module body** | The lesson explains imports run before the rest of the module body through runnable examples and practice. |
| **Imported bindings are read-only** | The lesson explains imported bindings are read-only through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [One program can be many files](#one-program-can-be-many-files)
- [Follow the actual starter files](#follow-the-actual-starter-files)
- [Named exports are the default choice here](#named-exports-are-the-default-choice-here)
- [Imports run before the rest of the module body](#imports-run-before-the-rest-of-the-module-body)
- [Imported bindings are read-only](#imported-bindings-are-read-only)

## JS runtime deep dive

### One program can be many files

- `export` makes a value available to another module;
- `import` receives an exported value;
- values not exported remain private to their file.

### Follow the actual starter files

`formatters.js` owns text formatting:

```js
export function formatLearner(learner) {
  return learner.name + ' has completed ' + learner.completedLessons + ' lessons.'
}
```

`main.js` imports that one public function:

```js
import { formatLearner } from './formatters.js'

const learner = { name: 'Mina', completedLessons: 21 }
console.log(formatLearner(learner))
```

Read the path from `main.js`: dot means the current folder; slash enters a path; `.js` is required by browser and Node ESM module resolution in this course.

### Named exports are the default choice here

Named exports make the imported name explicit:

```js
export const courseName = 'JavaScript'
export function formatLearner(learner) { /* ... */ }

import { courseName, formatLearner } from './formatters.js'
```

Use named exports for a module with several meaningful public values. A default export can be appropriate when a file has one clear main value, but it allows the importer to rename it freely. This course prefers named exports while learners are building a mental map of where names come from. The [MDN import statement reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) covers named, default, and namespace import forms side by side.

### Imports run before the rest of the module body

Modules are loaded, linked, and evaluated before your main file's ordinary top-level statements execute. That means imported bindings are available when the module runs. Keep module top-level code small and unsurprising; a file that fetches data or changes storage merely by being imported is hard to reason about. MDN's [JavaScript modules guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) walks through this exact load sequence — parsing, linking, and evaluating — and what differs from standard scripts.

### Imported bindings are read-only

An imported binding is read-only in the importing module. If an exported object is mutable, its properties can still change. Prefer functions that return new values or make mutation explicit.

### Browser modules need module scripts

In a browser, the entry script must be marked as a module:

```html
<script type="module" src="./js/main.js"></script>
```

Module scripts are deferred by default and follow the import graph, and a module page must be served — opening it directly from disk can cause browser security problems. In this course, module-based and TypeScript browser pages are served with Vite, while the plain JavaScript starter pages open directly from disk. The setup guide explains the workflow, and the [MDN script element reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) documents `type="module"`, deferral behavior, and the CORS and file-URL restrictions behind that rule.

### Dynamic import is a later-loading tool

`import()` returns a Promise and loads a module when you need it:

```js
const { formatLearner } = await import('./formatters.js')
```

Use it for genuine lazy loading. It is asynchronous, so it belongs with the promises and async/await lessons rather than replacing ordinary imports. The [MDN `import()` reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) documents the call form, how it differs from the static `import` statement, and the `import.meta` object available inside modules.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Missing `.js` extension | Copying other ecosystems' habits | Keep ESM's `.js` for browser/Node resolution |
| Trying to import a private helper | Assuming all code in a file is public | Only `export` what other modules need |
| Side effects at module top level | Convenience | Keep top-level code small and predictable |
| Mutating an imported object | Forgetting bindings are read-only, not deep-frozen | Prefer returning new values |
| A default export for several values | One main value habit | Prefer named exports |

## The TypeScript layer

### Types cross module boundaries too

TypeScript adds a type at the boundary:

```ts
export type Learner = {
  name: string
  completedLessons: number
}

export function formatLearner(learner: Learner): string {
  return learner.name + ' has completed ' + learner.completedLessons + ' lessons.'
}
```

The type export disappears at runtime. The function export remains JavaScript. This is a key distinction: TypeScript checks module contracts **before running**; it does not create runtime validation for data from an API.

### What TypeScript cannot decide

TypeScript cannot decide which helpers deserve to be private to a file — that is a design choice about the public surface. It cannot create runtime validation for API data, and it cannot know whether a mutable exported object will be mutated by another module.

### One compiler error, walked through

Open `21_day_modules/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
import { pluralizeLesson } from './formatters.js'
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Module '"./formatters.js"' has no exported member 'pluralizeLesson'.
```

Read it as: *"`pluralizeLesson` lives in `formatters.ts` but was not exported — the module boundary keeps it private, and no import can reach it."* The fix is to use only the exported functions, `formatLearner` and `formatProgress`:

```ts
import { formatLearner, formatProgress, type Learner } from './formatters.js'
```

Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A module is a file with an explicit public surface — `export` opens names to other files, `import` receives them, unexported values stay private, and TypeScript types cross the same boundary but vanish at runtime.

## Learn more on MDN

Modules have several forms beyond the named exports you used — bookmark the references that match the boundaries you just built:

- [JavaScript modules guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — the full tour of import, export, and loading behavior
- [import statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) — named, default, and namespace import forms
- [export statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) — named, default, and re-export syntax
- [import() operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) — the asynchronous, lazy-loading form
- [import.meta](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta) — module metadata such as the current URL
- [script element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) — `type="module"` and deferral in the browser
- [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) — why module code is automatically strict

### TypeScript docs

- [Modules](https://www.typescriptlang.org/docs/handbook/modules.html) — how `export`, `import`, and `export type` map to TypeScript
- [Modules Reference](https://www.typescriptlang.org/docs/handbook/modules-reference.html) — the import and export forms and resolution rules in detail

## Read the first example line by line

The first runnable example introduces **Modules — Imports and Exports**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `export function formatLearner(learner) {` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 2 | `  return learner.name + ' has completed ' + learner.completedLessons + ' lessons.'` | Return statement: the function sends a result back to its caller. |
| 3 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Modules — Imports and Exports**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Modules — Imports and Exports**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. What code can import a value that is not exported?
2. Why does the starter use `./formatters.js` rather than `formatters.js`?
3. What is the runtime difference between exporting a type and exporting a function?
4. When do imported bindings become available relative to the module body?
5. Can an importing module reassign an imported binding?
6. What does `<script type="module">` change about the entry script?
7. Run `npm.cmd run day21:js` and `npm.cmd run day21`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Create a math module that named-exports `add` and `subtract`.
2. Import both functions into a main file and call them.
3. Add one non-exported helper. Confirm another module cannot import it.
4. TypeScript: export a `Product` type and a `formatProduct` function that accepts it.
5. **MDN lookup:** Open the [export statement reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), find default exports, and convert one named export in your math module to a default export. Update the import in the main file, then comment on when a default export is clearer and when it hides where a name came from.

### Level 3 — Creative synthesis

1. The string utils module: create `strings.ts` exporting `capitalize`, `slugify`, and a `type StringCase` type; keep one private helper; import them from a main file.
2. The counter module: create `counter.ts` exporting `createCounter` that returns an object with `increment` and `read`; import and use two counters from a main file.
3. The config boundary: create `config.ts` that exports a frozen object `CONFIG` and a `getConfig()` function; in a comment, state why the function is the safer public surface.
4. The module memo: write a comment block listing what belongs in a module's public surface versus what should stay private, for a module you would actually build.

## Finish line

Day 21 is complete when you can do all of these **without notes**:

1. Split a program across multiple files with `export` and `import`.
2. Read a relative module path like `./formatters.js`.
3. Use named exports and keep a helper private to its file.
4. Export and import a TypeScript type across a module boundary.
5. Explain when dynamic import is worth its complexity.

If any answer is a guess, revisit the matching section before Day 22.

## Prove it

Write, in your own words, a short answer to each:

1. What code can import a value that is not exported?
2. Why does the starter use `./formatters.js` rather than `formatters.js`?
3. What is the runtime difference between exporting a type and exporting a function?
4. When is dynamic import worth its asynchronous complexity?
5. Why should module top-level code stay small and unsurprising?
6. What does the type checker know that your tests must still verify about modules?

Your answers are today's evidence. If you can write them, move to [Day 22: JSON and External Data — Shaping Untrusted Input](../22_day_json/22_day_json.md).

**Day 21 complete.** A program is now many files with explicit boundaries — `export` opens names, `import` receives them, private helpers stay put, and TypeScript types cross the same edges while vanishing at runtime.