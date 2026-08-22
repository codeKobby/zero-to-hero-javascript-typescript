# Day 24: Selecting DOM Elements — Querying the Page

[← Previous lesson](../23_day_web_storage/23_day_web_storage.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../25_day_dom_manipulation/25_day_dom_manipulation.md)



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
  - [The DOM is the browser's object model of HTML](#the-dom-is-the-browsers-object-model-of-html)
  - [Run JavaScript and TypeScript deliberately](#run-javascript-and-typescript-deliberately)
  - [Query methods answer different questions](#query-methods-answer-different-questions)
  - [Handle a missing match intentionally](#handle-a-missing-match-intentionally)
  - [NodeLists are collections, not arrays](#nodelists-are-collections-not-arrays)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Preserve the uncertainty](#preserve-the-uncertainty)
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

A web page is a live object model. Before you can change anything — a title, an input, a list — you must reliably find the exact element you mean, and decide what happens when it is not there.

This lesson teaches the three query methods and the intentional handling of a missing match: optional elements get a guard, required elements throw a clear error.

## Prerequisites

- Day 18: throwing errors for impossible conditions.
- Day 23: how a page runs in a browser rather than Node.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- select an element by ID, by selector, and as a collection;
- guard an optional element before reading it;
- throw a clear error when a required element is missing;
- iterate a `NodeList` without converting it to an array;
- narrow a generic `Element` with `instanceof` in TypeScript;
- run both starter pages in the browser through Vite and pass the type check.

And you will be able to **explain**:

- which selection methods can return `null`;
- when a missing selector should throw rather than quietly do nothing;
- why `querySelectorAll` is never tested against `null`;
- why an `HTMLInputElement` check is stronger than a type assertion.

## The problem this solves

A page needs its title, its email input, and every lesson card:

```js
const title = document.getElementById('page-title')
const emailInput = document.querySelector('input[type="email"]')
const cards = document.querySelectorAll('.lesson-card')
```

Each method answers a different question, and each answer comes with its own null or emptiness rules. Today you learn to ask the right question and to handle "not found" on purpose.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **The DOM is the browser's object model of HTML** | The lesson explains the dom is the browser's object model of html through runnable examples and practice. |
| **Run JavaScript and TypeScript deliberately** | The lesson explains run javascript and typescript deliberately through runnable examples and practice. |
| **Query methods answer different questions** | The lesson explains query methods answer different questions through runnable examples and practice. |
| **Handle a missing match intentionally** | The lesson explains handle a missing match intentionally through runnable examples and practice. |
| **NodeLists are collections, not arrays** | The lesson explains nodelists are collections, not arrays through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [The DOM is the browser's object model of HTML](#the-dom-is-the-browsers-object-model-of-html)
- [Run JavaScript and TypeScript deliberately](#run-javascript-and-typescript-deliberately)
- [Query methods answer different questions](#query-methods-answer-different-questions)
- [Handle a missing match intentionally](#handle-a-missing-match-intentionally)
- [NodeLists are collections, not arrays](#nodelists-are-collections-not-arrays)

## JS runtime deep dive

### The DOM is the browser's object model of HTML

When the browser reads HTML, it creates objects representing the document and its elements. JavaScript uses `document` to find and work with those objects. The screen is not the DOM; it is the browser's rendering of the DOM.

Today is only about finding the exact element you intend to use. Tomorrow you will change it.

### Run JavaScript and TypeScript deliberately

The JavaScript page needs no server: open `24_day_dom_selection/starter/index.html` directly in your browser (double-click the file).

The TypeScript page imports a `.ts` entry file, so it must be served. From the repository root:

```powershell
npm.cmd run dev
```

Then open `/24_day_dom_selection/starter/index.ts.html` and keep the Vite terminal running. Vite compiles the `.ts` file for the browser.

### Query methods answer different questions

```js
const title = document.getElementById('page-title')
const emailInput = document.querySelector('input[type="email"]')
const cards = document.querySelectorAll('.lesson-card')
```

`getElementById` returns an element or `null`. `querySelector` returns the first matching element or `null`. `querySelectorAll` returns a `NodeList` that may be empty but is never `null`.

Each method is fully documented on MDN — [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById), [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), and [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll). The selector strings themselves are the full CSS selector grammar — [the CSS selectors reference on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) shows every selector you can pass, from attributes to `:nth-child`.

Choose the most specific, stable selector you control. An ID is good for one named page landmark. A class is good for a repeated group. Avoid selecting based on fragile styling or deep document structure when a meaningful data attribute would express intent.

### Handle a missing match intentionally

Use a guard when an element is optional:

```js
const notice = document.querySelector('[data-notice]')
if (notice !== null) {
  console.log(notice.textContent)
}
```

Use a small helper when an element is required for the page to work:

```js
function requireElement(selector) {
  const element = document.querySelector(selector)
  if (element === null) {
    throw new Error('Required element not found: ' + selector)
  }
  return element
}
```

Optional chaining avoids a crash but can also hide an incorrectly spelled required selector. Choose based on the page contract, not convenience. [MDN documents optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and exactly when it returns `undefined` instead of throwing.

### NodeLists are collections, not arrays

`querySelectorAll` returns a `NodeList`. It supports `for...of` and `forEach`:

```js
const cards = document.querySelectorAll('.lesson-card')
for (const card of cards) {
  console.log(card.textContent)
}
```

It is a static snapshot for `querySelectorAll`. If you later create another matching card, run the query again when you need the new set.

The [NodeList reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) shows the full family: `forEach`, `entries`, `keys`, `values`, and how a `NodeList` differs from a real array.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Reading a property on a possibly-null element | Forgetting queries can miss | Guard with `!== null` |
| Quietly ignoring a missing required element | Optional chaining everywhere | `requireElement` helper that throws |
| `Array.from` on every NodeList | Habit | Use `for...of` and `forEach` |
| Reusing a stale NodeList after adding elements | It is a snapshot | Re-run the query |
| Asserting `as HTMLInputElement` | Impatience | Narrow with `instanceof` |

## The TypeScript layer

### Preserve the uncertainty

JavaScript knows `querySelector` returns `Element` or `null`. TypeScript preserves that uncertainty and can give more precise types for tag-name selectors:

```ts
const emailInput = document.querySelector('input[type="email"]')
if (emailInput instanceof HTMLInputElement) {
  console.log(emailInput.value)
}
```

Avoid generic assertions such as `as HTMLInputElement` when the HTML might change. `instanceof` is a runtime check and gives TypeScript evidence. A generic helper is appropriate only when its caller genuinely provides the type evidence.

### What TypeScript cannot decide

TypeScript cannot know whether the HTML actually contains the element you expect at runtime, or whether the page structure will change later. It cannot turn `as HTMLInputElement` into proof. The `instanceof` check and the `requireElement` throw are runtime behavior your tests and the real page must verify.

### One compiler error, walked through

Open `24_day_dom_selection/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const email = document.querySelector('input[type="email"]')
console.log(email.value)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'value' does not exist on type 'Element | null'.
```

Read it as: *"`querySelector` can miss and returns a generic `Element`, so neither `null` nor `value` is safe without proof."* The fix is the `instanceof` narrow from the lesson:

```ts
if (email instanceof HTMLInputElement) {
  console.log(email.value)
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

The DOM is the browser's object model of HTML — select the exact element with the right query, guard an optional miss, throw on a required miss, and narrow generic elements with runtime checks before reading their properties.

## Learn more on MDN

Querying the page is a small slice of the DOM's surface. Bookmark these pages and return as you grow:

- [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) — the fast, specific ID lookup
- [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) — the first match for any CSS selector
- [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) — every match as a `NodeList`
- [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) — `forEach`, `entries`, `keys`, `values`, and how it differs from an array
- [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors) — the full selector grammar you can pass to the query methods
- [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) — the generic element type and its properties
- [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) — when `?.` returns `undefined` instead of throwing
- [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) — the concrete element type behind the `instanceof` check
- [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) — the object behind `document`, plus `getElementsByClassName` and `getElementsByTagName`

### TypeScript docs

- [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html) — how the compiler types `Element`, `NodeList`, and the narrowing you used today

## Read the first example line by line

The first runnable example introduces **Selecting DOM Elements — Querying the Page**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `const title = document.getElementById('page-title')` | Declaration or assignment: the runtime creates or updates a named value. |
| 2 | `const emailInput = document.querySelector('input[type="email"]')` | Declaration or assignment: the runtime creates or updates a named value. |
| 3 | `const cards = document.querySelectorAll('.lesson-card')` | Declaration or assignment: the runtime creates or updates a named value. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Selecting DOM Elements — Querying the Page**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Selecting DOM Elements — Querying the Page**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Which selection methods can return `null`?
2. Which selection method is never `null` and may be empty?
3. Why does optional chaining risk hiding an incorrect required selector?
4. Why is `querySelectorAll` not tested against `null`?
5. Is a `NodeList` an array? What does it support?
6. Why is an `HTMLInputElement` check stronger than a type assertion?
7. Open the JavaScript starter and run it. Serve the TypeScript page. Check one click and one pause. Run `npm.cmd run check`.

### Level 2 — Applied mini-projects

1. Select `#page-title` and log its text.
2. Count all elements with the `lesson-card` class.
3. Select the email input and read its value only after proving it is an `HTMLInputElement`.
4. Add a required-element helper that throws a clear error for a missing required selector.
5. Read the [NodeList reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList). Copy one small example into the starter. Run it and write down what it does.

### Level 3 — Creative synthesis

1. Write the batch helper: write `requireElements(selector)` that returns a `NodeList` and throws if it is empty. State when an empty group should throw versus log.
2. Write the all-or-nothing loader: write `requireAll(selectors)` that checks every required selector in one pass and throws a single error listing every missing one.
3. Write the data-attribute contract: rewrite a selector that relies on a fragile class or deep path using a meaningful `data-*` attribute, and comment on why that is more stable.
4. Write the DOM memo: write a comment block listing the three query methods and the exact null/emptiness rule for each.

## Finish line

Day 24 is complete when you can do all of these **without notes**:

1. Select an element by ID, by selector, and as a collection.
2. Guard an optional element before reading it.
3. Throw a clear error when a required element is missing.
4. Iterate a `NodeList` without converting it to an array.
5. Narrow a generic `Element` with `instanceof` in TypeScript.

If any answer is a guess, revisit the matching section before Day 25.

## Prove it

Write, in your own words, a short answer to each:

1. Which selection methods can return `null`?
2. When should a missing selector throw rather than quietly do nothing?
3. Why is `querySelectorAll` not tested against `null`?
4. Why is an `HTMLInputElement` check stronger than a type assertion?
5. What does the type checker know that the real page must still verify?

Your answers are today's evidence. If you can write them, move to [Day 25: Changing DOM Elements — Updating the Page](../25_day_dom_manipulation/25_day_dom_manipulation.md).

**Day 24 complete.** Selecting is now deliberate — the right query for the right question, a guard for an optional miss, a throwing helper for a required miss, and `instanceof` proof before reading element properties.