# Day 43: Project — E-commerce Product List

[Day 42 <<](../42_day_project_forum/42_day_project_forum.md) | [Day 44 >>](../44_day_project_countries/44_day_project_countries.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
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
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
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

## JS runtime deep dive

### The runnable baseline

Run the starter with:

```powershell
npm.cmd run dev
```

Then open `/43_day_project_ecommerce/starter/index.html` for JavaScript or `/43_day_project_ecommerce/starter/index.ts.html` for TypeScript.

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

### Cart by id, not by copy

```js
const cart = new Map()
function addToCart(id) { cart.set(id, (cart.get(id) ?? 0) + 1) }
function cartTotal(items) {
  return [...cart].reduce((total, [id, quantity]) =>
    total + (items.find(item => item.id === id)?.price ?? 0) * quantity, 0)
}
```

The cart stores ids and quantities only. Totals are computed by joining the cart rows to the product array, so product prices never drift from their source.

### Sorting without mutation

`sort` mutates the array it is called on. The baseline copies before sorting (`.toSorted` in JavaScript, the spread-then-`sort` pattern in TypeScript) so the source order of `products` is never lost.

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

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does a second cart-product list invite synchronization bugs?
2. Why does `sort` mutate its input, and when does copying matter?
3. Why does a TypeScript interface not validate products loaded from localStorage?
4. Run `npm.cmd run check` and `npm.cmd run links`; then `npm.cmd run dev` and open both starters.

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Read the JS starter and trace `visibleProducts`, `addToCart`, and `cartTotal` with a five-item array.
2. Add rating, stock, price-range, and sort controls as pure functions before changing the DOM.
3. Persist a versioned cart in localStorage; reject malformed or stale data.
4. Add accessible empty states, quantity controls, and keyboard-friendly focus.
5. Make the TS version meet the same acceptance criteria, then test both pages.

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