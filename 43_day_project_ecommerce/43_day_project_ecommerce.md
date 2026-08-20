# Day 43: Project — E-commerce Product List

[← Previous lesson](../42_day_project_forum/42_day_project_forum.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../44_day_project_countries/44_day_project_countries.md)



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
  - [The runnable baseline](#the-runnable-baseline)
  - [Cart by id, not by copy](#cart-by-id-not-by-copy)
  - [Sorting without mutation](#sorting-without-mutation)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The product contract](#the-product-contract)
  - [One boundary, walked through](#one-boundary-walked-through)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
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

Day 43 turns array transformations into a stateful product experience. The starter is intentionally offline and small: search, category filtering, price sorting, and a cart total. Extend it without losing the single source of truth.

## Prerequisites

- Day 12-13: higher-order functions.
- Day 27: event delegation.
- Day 41: derived views and validated storage.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- keep products immutable and derive visible products from filter state;
- model cart quantities by product id, then join them to products for totals;
- use event delegation for controls created during rendering;
- port the same design to TypeScript and validate persisted data at runtime;
- run this course's check, links, and dev commands for Day 43.

And you will be able to **explain**:

- why a second cart-product list invites synchronization bugs;
- why `sort` mutates its input and when copying matters;
- why a TypeScript interface does not validate products loaded from localStorage;
- why an out-of-stock product still needs a clear, keyboard-accessible explanation.

## The problem this solves

A product list composes search, category, stock, rating, and price filters, and pairs them with a cart that survives a refresh. The product array is immutable source data; the cart stores only ids and quantities; every view derives from those two sources at render time.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **The runnable baseline** | The lesson explains the runnable baseline through runnable examples and practice. |
| **Cart by id, not by copy** | The lesson explains cart by id, not by copy through runnable examples and practice. |
| **Sorting without mutation** | The lesson explains sorting without mutation through runnable examples and practice. |
| **Pitfalls table** | The lesson explains pitfalls table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [The runnable baseline](#the-runnable-baseline)
- [Cart by id, not by copy](#cart-by-id-not-by-copy)
- [Sorting without mutation](#sorting-without-mutation)
- [Pitfalls table](#pitfalls-table)

## JS runtime deep dive

### The runnable baseline

Run the starter. The JavaScript page opens directly — double-click `43_day_project_ecommerce/starter/index.html` (no server needed). The TypeScript page is served with Vite from the repository root:

```powershell
npm.cmd run dev
```

Then open `/43_day_project_ecommerce/starter/index.ts.html`.

The baseline derives the visible list from the product array and the current controls, then renders with `textContent` for every data value:

```js
function visibleProducts(items, query, category) {
  const normalized = query.trim().toLowerCase()
  return items.filter(product =>
    (!normalized || product.name.toLowerCase().includes(normalized)) &&
    (category === 'all' || product.category === category))
    .toSorted((a, b) => a.price - b.price)
}
```

Most of the filtering happens inside one callback passed to `filter`; [MDN documents Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) including the `thisArg` and skipped-holes behavior you can safely ignore.

### Cart by id, not by copy

```js
const cart = new Map()
function addToCart(id) { cart.set(id, (cart.get(id) ?? 0) + 1) }
function cartTotal(items) {
  return [...cart].reduce((total, [id, quantity]) =>
    total + (items.find(item => item.id === id)?.price ?? 0) * quantity, 0)
}
```

The cart stores ids and quantities only. Totals are computed by joining the cart rows to the product array, so product prices never drift from their source. The cart is a `Map` keyed by id, and [MDN documents Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) including why `get` returns `undefined` for a missing key — the `?? 0` fallback you rely on.

### Sorting without mutation

`sort` mutates the array it is called on. The baseline copies before sorting (`.toSorted` in JavaScript, the spread-then-`sort` pattern in TypeScript) so the source order of `products` is never lost. Both are worth reading side by side — [Array.prototype.toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) returns a new array while [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) sorts in place.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Keeping a second cart-product list | Convenience | Store ids and quantities only |
| Calling `sort` on the source array | Forgetting mutation | Copy before sorting |
| Trusting a TypeScript interface for stored data | Parsing succeeds | Validate at runtime |
| Hiding out-of-stock products | Simplification | Show a clear, keyboard-accessible reason |
| Rendering data with `innerHTML` | Convenience | Use `textContent` |

## The TypeScript layer

### The product contract

```ts
type Product = { id: string; name: string; price: number; category: string; rating: number; inStock: boolean }
```

The same user flow and acceptance criteria as JavaScript, with types so invalid product data and cart state are easier to catch before runtime. Both versions should feel like the same app with different safety rails.

### One boundary, walked through

Open `43_day_project_ecommerce/starter/ts/main.ts`. The delegated click handler narrows its target and reads a verified id:

```ts
ui.list.addEventListener('click', event => {
  const target = event.target
  if (target instanceof HTMLButtonElement && target.dataset.id) {
    addToCart(target.dataset.id)
    render()
  }
})
```

Read it as: *"`event.target` is unknown until narrowed; only a button with an id triggers a cart mutation, so stray clicks cannot corrupt state."* The interface documents the product shape; the guard decides what actually counts as a product at runtime.

### What TypeScript cannot decide

An interface does not validate products loaded from localStorage, and the compiler cannot decide whether a button's dataset value is trustworthy. Runtime validation of persisted data and a guard on delegated clicks remain the real checks.

## One-sentence mental model

An e-commerce list keeps products immutable, stores the cart as ids and quantities, derives every visible list and total at render time, and renders data with `textContent` so filters compose without synchronization bugs.

## Learn more on MDN

The product list composes array transforms, a Map-backed cart, and a locale-aware total — each with a reference page worth returning to:

- [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — composing search and category into the visible list
- [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — joining cart rows into the running total
- [Array.prototype.toSorted](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) — sorting without mutating the source array
- [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — the in-place mutator to copy before using
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) — the id-to-quantity store behind the cart
- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) — locale-aware formatting of product prices and totals
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — the `Storage` object behind the versioned cart
- [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — safe rendering of product data

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the `Product` type and the literal strings behind it
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how `instanceof HTMLButtonElement` narrows the delegated event target
- [Using Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — validating the cart data loaded from storage

## Read the first example line by line

The first runnable example introduces **Project — E-commerce Product List**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `function visibleProducts(items, query, category) {` | Function syntax: this line defines reusable behavior or an arrow function. |
| 2 | `  const normalized = query.trim().toLowerCase()` | Declaration or assignment: the runtime creates or updates a named value. |
| 3 | `  return items.filter(product =>` | Function syntax: this line defines reusable behavior or an arrow function. |
| 4 | `    (!normalized \|\| product.name.toLowerCase().includes(normalized)) &&` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 5 | `    (category === 'all' \|\| product.category === category))` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 6 | `    .toSorted((a, b) => a.price - b.price)` | Function syntax: this line defines reusable behavior or an arrow function. |
| 7 | `}` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Project — E-commerce Product List**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Project — E-commerce Product List**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).\n- When the project meets the Definition of done checklist, log it in [PORTFOLIO_TRACK.md](../PORTFOLIO_TRACK.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does a second cart-product list invite synchronization bugs?
2. Why does `sort` mutate its input, and when does copying matter?
3. Why does a TypeScript interface not validate products loaded from localStorage?
4. Run `npm.cmd run check` and `npm.cmd run links`; then open the JavaScript starter directly (`starter/index.html`) and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`).

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Read the JS starter and trace `visibleProducts`, `addToCart`, and `cartTotal` with a five-item array.
2. Add rating, stock, price-range, and sort controls as pure functions before changing the DOM.
3. Persist a versioned cart in localStorage; reject malformed or stale data.
4. Add accessible empty states, quantity controls, and keyboard-friendly focus.
5. Make the TS version meet the same acceptance criteria, then test both pages.
6. **MDN lookup:** Open the [Intl.NumberFormat reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat), find `formatToParts`, and add a price display that uses it to render each product price and the cart total with a currency symbol. Comment on why `format()` alone hides the parts that `formatToParts` exposes.

### Level 3 — Creative synthesis

1. The composed filter: write `filterProducts(products, filters)` where filters are data; comment on how search, category, stock, rating, and price compose.
2. The versioned cart: persist `{ version: 1, items: [{ productId, quantity }] }` and reject malformed or stale data on load; comment on why the version field matters.
3. The joined total: render cart totals by joining cart rows to products; comment on why product prices never drift.
4. The acceptance audit: confirm search, category, stock, rating, price, and sort compose; confirm add, remove, quantity, total, and refresh persistence; confirm JS and TS behave the same with a clean `npm.cmd run check`.

## Finish line

Day 43 is complete when you can do all of these **without notes**:

1. Keep products immutable and derive visible products from filter state.
2. Model cart quantities by product id, then join them to products for totals.
3. Use event delegation for controls created during rendering.
4. Port the same design to TypeScript and validate persisted data at runtime.
5. Meet every acceptance criterion with JS and TS pages that behave the same.

If any answer is a guess, revisit the matching section before Day 44.

## Prove it

Write, in your own words, a short answer to each:

1. Why does a second cart-product list invite synchronization bugs?
2. Why does `sort` mutate its input, and when does copying matter?
3. Why does a TypeScript interface not validate products loaded from localStorage?
4. Why does an out-of-stock product still need a clear, keyboard-accessible explanation?
5. Which acceptance criteria did you meet, and where is the evidence?

Your answers are today's evidence. If you can write them, move to [Day 44: Project — Country Explorer](../44_day_project_countries/44_day_project_countries.md).

**Day 43 complete.** An e-commerce list keeps products immutable, stores the cart as ids and quantities, derives every visible list and total at render time, and renders data with `textContent` so filters compose without synchronization bugs.