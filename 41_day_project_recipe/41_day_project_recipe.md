# Day 41: Project — Recipe Book

[Day 40 <<](../40_day_ts_best_practices/40_day_ts_best_practices.md) | [Day 42 >>](../42_day_project_forum/42_day_project_forum.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The runnable slice](#the-runnable-slice)
  - [Validation, not assumptions](#validation-not-assumptions)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [One boundary, walked through](#one-boundary-walked-through)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Day 40 argued for boundaries. Day 41 proves them in a small CRUD application that stores recipes locally. The starter gives you a runnable create/read/search slice; your work is to extend it without mixing domain logic, storage, and DOM concerns.

## Prerequisites

- Day 24-27: DOM selection, creation, events, and delegation.
- Day 23: Web Storage.
- Day 40: strict discipline and the `unknown` boundary.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- run the paired JavaScript and TypeScript starters for this project;
- validate form input before creating a recipe;
- render an empty state and each recipe with `textContent`;
- persist recipes to localStorage and validate what comes back;
- add delete and edit paths through delegated events;
- add debounced search and JSON export/import;
- extract pure functions and add tests;
- run this course's check, links, and dev commands for Day 41.

And you will be able to **explain**:

- why `JSON.parse` returning an object does not make it a `Recipe[]`;
- why search should be derived from source state, not stored as a second list;
- why a delete button needs an accessible name and must not trust arbitrary dataset values;
- what the compiler proves and what runtime validation must still do.

## The problem this solves

A recipes app needs create, read, update, delete, and search — and it must survive a page reload. The domain model is small, but every path touches the DOM, storage, and form input. Keeping domain logic pure and the effects at the edges makes each path testable and the project portfolio-ready.

## JS runtime deep dive

### The runnable slice

The starter is a runnable create/read/search baseline. The JavaScript page opens directly — double-click `41_day_project_recipe/starter/index.html` (no server needed). The TypeScript page is served with Vite from the repository root:

```powershell
npm.cmd run dev
```

Then open `/41_day_project_recipe/starter/index.ts.html`.

The slice defines the recipe contract, guards storage, renders with `textContent`, and derives search from source state:

```js
const visible = recipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(query) ||
  recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)))
```

Search leans on `filter` and `some`, and both are worth reading on MDN — [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) shows how `some` returns as soon as one ingredient matches, while `filter` builds the surviving list.

### Validation, not assumptions

```js
function isRecipe(value) {
  return typeof value === 'object' && value !== null &&
    typeof value.id === 'string' && typeof value.title === 'string' &&
    Array.isArray(value.ingredients) && value.ingredients.every((item) => typeof item === 'string') &&
    typeof value.createdAt === 'number'
}
```

An object that came back from `JSON.parse` only looks like a recipe; the guard checks each field before state accepts it. The `Array.isArray` and `every` calls are the shape checks doing that work, and [MDN documents Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) including why `typeof []` alone would not be enough.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Trusting `JSON.parse` output as `Recipe[]` | Parsing succeeds | Validate each item before use |
| Splitting ingredients on commas blindly | Extra whitespace and empties | Trim and filter empty items |
| Storing a filtered recipe list | Second source of truth | Derive search from source state |
| Trusting dataset values in a delete handler | Inline data is arbitrary | Verify with a guard |
| Building HTML with strings | Injection risk | Build nodes and use `textContent` |

The delete and edit paths read their target id from `data-*` attributes; [MDN's HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) explains how `dataset` maps attribute names to camelCase properties.

## The TypeScript layer

### One boundary, walked through

Open `41_day_project_recipe/starter/ts/main.ts`. The `isRecipe` function is a type guard:

```ts
function isRecipe(value: unknown): value is Recipe {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'title' in value && typeof value.title === 'string' &&
    'ingredients' in value && Array.isArray(value.ingredients) &&
    value.ingredients.every((item): item is string => typeof item === 'string') &&
    'createdAt' in value && typeof value.createdAt === 'number'
}
```

Read it as: *"This function narrows `unknown` to `Recipe`, but the narrowing is earned field by field at runtime — TypeScript accepts the result only because the guard checked it."* Functions such as `createRecipe` and `renderRecipes` then agree about the shape; storage still requires this guard after parsing.

### What TypeScript cannot decide

The compiler cannot decide what a user typed, what `localStorage` returned, or whether a dataset value came in well-formed. It narrows what the code accepts; the runtime guard and the tests decide what actually runs.

## One-sentence mental model

A recipe app is a small domain model with DOM, storage, and form effects at the edges — validate at every boundary, derive search from source state, and render with `textContent` so the app stays testable and safe.

## Learn more on MDN

The recipe app reads storage, validates shapes, searches the list, and renders with safe DOM APIs — each with a reference page worth returning to:

- [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — the search's core, which builds a new list without touching source state
- [Array.prototype.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) — how one matching ingredient keeps a recipe in the results
- [String.prototype.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) — the case-sensitive substring check behind the query
- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) — the parse step that can throw and return the wrong shape
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) — serializing recipes for save and for export
- [Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) — the check that decides a parsed value is a list
- [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) — the `data-*` attributes that route delete and edit clicks
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — the `Storage` object behind persistence
- [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — safe, plain-text rendering of recipe text

### TypeScript docs

- [Using Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — what `value is Recipe` tells the compiler, and what it still does not prove
- [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html) — how the compiler types the DOM reads in the starter

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).\n- When the project meets the Definition of done checklist, log it in [PORTFOLIO_TRACK.md](../PORTFOLIO_TRACK.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does `JSON.parse` returning an object not make it a `Recipe[]`?
2. Why should search be derived from source state instead of stored as a second list?
3. Why must a delete button have an accessible name and not trust arbitrary dataset values?
4. Run `npm.cmd run check` and `npm.cmd run links`; then open the JavaScript starter directly (`starter/index.html`) and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`).

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Reject empty title and ingredient input.
2. Render an empty state and each recipe with `textContent`.
3. Persist and validate localStorage data.
4. Add delete and edit paths through delegated events.
5. Add debounced search and JSON export/import.
6. Extract pure functions and add tests before calling the project portfolio-ready.
7. **MDN lookup:** Open the [JSON.stringify reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), find the `replacer` and `space` arguments, and add a JSON export feature that uses both to pretty-print the saved recipes. Comment on what `space` does and why the exported text is safe to paste into another app.

### Level 3 — Creative synthesis

1. The storage audit: write a `loadRecipes` function that returns `Recipe[]` only after every item passes `isRecipe`; comment on what happens to malformed items.
2. The delegated case: handle delete and edit in one delegated listener; comment on how the handler learns which recipe to act on.
3. The derive case: keep the stored list as the single source of truth; comment on how a debounced input reads from it.
4. The effect split: separate parse, filter, and sort into pure functions; comment on what a test proves that the compiler cannot.

## Finish line

Day 41 is complete when you can do all of these **without notes**:

1. Validate form input before creating a recipe.
2. Render an empty state and each recipe with `textContent`.
3. Persist and validate localStorage data.
4. Add delete and edit paths through delegated events.
5. Add debounced search and JSON export/import.
6. Extract pure functions and add tests.

If any answer is a guess, revisit the matching section before Day 42.

## Prove it

Write, in your own words, a short answer to each:

1. Why does `JSON.parse` returning an object not make it a `Recipe[]`?
2. Why should search be derived from source state instead of stored as a second list?
3. Why must a delete button have an accessible name and not trust arbitrary dataset values?
4. What does the compiler prove, and what must runtime validation still do?
5. Which milestone did you complete, and what evidence is in your project README?

Your answers are today's evidence. If you can write them, move to [Day 42: Project — Discussion Forum](../42_day_project_forum/42_day_project_forum.md).

**Day 41 complete.** A recipe app is a small domain model with DOM, storage, and form effects at the edges — validate at every boundary, derive search from source state, and render with `textContent` so the app stays testable and safe.