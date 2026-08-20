# Day 42: Project — Discussion Forum

[← Previous lesson](../41_day_project_recipe/41_day_project_recipe.md) · [README](../README.md) · [Setup](../VS_CODE_SETUP.md) · [Day index](../DAY_INDEX.md) · [Next lesson →](../43_day_project_ecommerce/43_day_project_ecommerce.md)



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
  - [Identifiers, not indexes](#identifiers-not-indexes)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The recursive shape](#the-recursive-shape)
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

Day 41 handled flat CRUD. Day 42 turns nested data and event delegation into a forum slice: posts hold recursive comments, likes update in place, and the state stays a single source of truth. The baseline supports creating posts and liking them; threaded replies, sorting, persistence, and portfolio evidence are deliberate extensions.

## Prerequisites

- Day 24-27: DOM selection, creation, events, and delegation.
- Day 39: recursive type definitions.
- Day 41: validated storage and derived views.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- run the paired JavaScript and TypeScript forum baseline;
- trace post creation and like updates through a delegated list listener;
- render user content with `textContent`, never raw `innerHTML`;
- add recursive comments and replies with a clear base case;
- add newest/most-liked/most-commented sorting as pure functions;
- add a current-user simulation, persistence, and malformed-storage recovery;
- run this course's check, links, and dev commands for Day 42.

And you will be able to **explain**:

- why recursion needs a base case and a size strategy;
- why storing both a sorted list and source posts causes stale views;
- why likes and replies must use stable ids, not array indexes;
- what the compiler documents and what it cannot validate.

## The problem this solves

A forum is nested data plus user actions: posts contain comments, comments contain replies, and every action mutates one tree. The app must like, sort, persist, and recover from bad storage without duplicating state or trusting user content.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **The runnable baseline** | The lesson explains the runnable baseline through runnable examples and practice. |
| **Identifiers, not indexes** | The lesson explains identifiers, not indexes through runnable examples and practice. |
| **Pitfalls table** | The lesson explains pitfalls table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [The runnable baseline](#the-runnable-baseline)
- [Identifiers, not indexes](#identifiers-not-indexes)
- [Pitfalls table](#pitfalls-table)

## JS runtime deep dive

### The runnable baseline

The baseline supports creating posts and liking them. The JavaScript page opens directly — double-click `42_day_project_forum/starter/index.html` (no server needed). The TypeScript page is served with Vite from the repository root:

```powershell
npm.cmd run dev
```

Then open `/42_day_project_forum/starter/index.ts.html`.

Creation pushes into the single `posts` array; a delegated click handler finds the post by stable id and increments likes:

```js
list.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const post = posts.find((item) => item.id === event.target.dataset.id)
  if (post !== undefined) post.likes += 1
  render()
})
```

The handler reads `event.target` before narrowing it; [MDN documents event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) including why the target can be any node inside the list, not only the button that was clicked.

### Identifiers, not indexes

The button records `dataset.id`, and the handler searches the state for that id. Indexes would break as soon as sorting reorders the array; stable ids survive reordering and persistence. The search is `find`, and [MDN documents Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) including the `undefined` it returns when no post matches.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Recursing without a base case | Incomplete shape | Return at depth 0 or on a size limit |
| Storing a sorted list alongside source posts | Stale views | Sort at render time |
| Rendering user content with `innerHTML` | Convenience | Use `textContent` or a trusted sanitizer |
| Indexing likes and replies by array position | Reorders after sorting | Use stable ids |
| Trusting localStorage shape | Parsing succeeds | Validate recursively before use |

Rendering user content with `textContent` is the habit the whole forum depends on; [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) and [Element.innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) read differently on MDN, and only the first is plain text.

## The TypeScript layer

### The recursive shape

```ts
type Comment = { id: string; content: string; replies: Comment[] }
type Post = { id: string; title: string; content: string; likes: number; comments: Comment[] }
type ForumState = { posts: Post[]; sortBy: 'newest' | 'most-liked' | 'most-commented' }
```

`Comment` references itself, so a reply is just another comment with its own replies. `sortBy` is a union, so the compiler restricts sort values and documents the choices.

### One boundary, walked through

Open `42_day_project_forum/starter/ts/main.ts`. The delegated like handler narrows its target before acting:

```ts
list.addEventListener('click', (event: MouseEvent) => {
  const target = event.target
  if (!(target instanceof HTMLButtonElement)) return
  const post = posts.find((item) => item.id === target.dataset.id)
  if (post !== undefined) post.likes += 1
  render()
})
```

Read it as: *"`event.target` is an `EventTarget`, not a post; the handler narrows it to a button and looks the post up by id before mutating."* TypeScript documents the shape and restricts sort values, but it does not validate data loaded from localStorage.

### What TypeScript cannot decide

The compiler cannot decide whether a comment has a safe depth, whether user content is safe to render, or whether storage really holds the promised shape. Recursion needs a runtime base case, content needs `textContent`, and storage needs a recursive guard.

## One-sentence mental model

A forum is one recursive state tree — posts contain comment trees, actions mutate by stable id, views are derived at render time, and user content is never trusted as HTML.

## Learn more on MDN

The forum is recursive state, delegated events, and storage recovery — each with a reference page worth returning to:

- [Array.prototype.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) — looking a post up by stable id, and the `undefined` it returns
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) and [event.target](https://developer.mozilla.org/en-US/docs/Web/API/Event/target) — the object a delegated handler reads before narrowing
- [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) — the `data-*` attributes behind like and reply actions
- [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — safe, plain-text rendering of posts and comments
- [Element.innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) — the alternative property and the cost that comes with it
- [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — the in-place mutator your pure sort functions copy first
- [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) — checking every node of a loaded tree before trusting it
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — the `Storage` object behind persistence and malformed-storage recovery

### TypeScript docs

- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the unions and array types behind `Comment[]` and `sortBy`
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — how `instanceof HTMLButtonElement` narrows the event target
- [Using Type Predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) — what a recursive storage guard tells the compiler

## Read the first example line by line

The first runnable example introduces **Project — Discussion Forum**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `list.addEventListener('click', (event) => {` | Function syntax: this line defines reusable behavior or an arrow function. |
| 2 | `  if (!(event.target instanceof HTMLButtonElement)) return` | Control-flow statement: the runtime decides whether or how this block runs. |
| 3 | `  const post = posts.find((item) => item.id === event.target.dataset.id)` | Declaration or assignment: the runtime creates or updates a named value. |
| 4 | `  if (post !== undefined) post.likes += 1` | Control-flow statement: the runtime decides whether or how this block runs. |
| 5 | `  render()` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 6 | `})` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Project — Discussion Forum**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Project — Discussion Forum**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Use the numbered exercises in this lesson first, then [practice/hints.md](practice/hints.md), and finally [practice/solutions.md](practice/solutions.md).

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).\n- When the project meets the Definition of done checklist, log it in [PORTFOLIO_TRACK.md](../PORTFOLIO_TRACK.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does recursion need a base case, and why does a hostile tree need a size strategy?
2. Why does storing both a sorted list and source posts cause stale views?
3. Why must likes and replies identify stable ids rather than array indexes?
4. Run `npm.cmd run check` and `npm.cmd run links`; then open the JavaScript starter directly (`starter/index.html`) and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`).

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Trace post creation and like updates through the delegated list listener.
2. Add recursive comments and replies without unsafe HTML rendering.
3. Add newest/most-liked/most-commented sorting as pure functions.
4. Add a current-user simulation, persistence, and malformed-storage recovery.
5. Add character counts, keyboard/focus behavior, and a README with evidence.
6. **MDN lookup:** Open the [Array.prototype.reduce reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), find the callback signature and the initial value, and use it to count the total comments across all posts in one pass. Comment on what the initial value accomplishes and why it is required here.

### Level 3 — Creative synthesis

1. The recursion case: write a function that renders a comment tree and stops at a depth limit; comment on why the limit matters for hostile data.
2. The derived view: keep `posts` as the single source of truth and compute each sort at render time; comment on what changes when the sort option changes.
3. The stable id: update a reply's likes by id through a recursive walk; comment on why indexes would break after sorting.
4. The storage guard: validate a loaded post tree recursively; comment on what a test proves that the compiler cannot.

## Finish line

Day 42 is complete when you can do all of these **without notes**:

1. Trace post creation and like updates through a delegated list listener.
2. Add recursive comments and replies with a clear base case.
3. Add newest/most-liked/most-commented sorting as pure functions.
4. Add a current-user simulation, persistence, and malformed-storage recovery.
5. Add character counts, keyboard/focus behavior, and a README with evidence.

If any answer is a guess, revisit the matching section before Day 43.

## Prove it

Write, in your own words, a short answer to each:

1. Why does recursion need a base case, and why does a hostile tree need a size strategy?
2. Why does storing both a sorted list and source posts cause stale views?
3. Why must likes and replies identify stable ids rather than array indexes?
4. What does the compiler document, and what must runtime validation still do?
5. Which features and tests did you actually ship, and where is the evidence?

Your answers are today's evidence. If you can write them, move to [Day 43: Project — E-commerce Product List](../43_day_project_ecommerce/43_day_project_ecommerce.md).

**Day 42 complete.** A forum is one recursive state tree — posts contain comment trees, actions mutate by stable id, views are derived at render time, and user content is never trusted as HTML.