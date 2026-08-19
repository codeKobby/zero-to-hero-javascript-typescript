# Day 42: Project — Discussion Forum

[Day 41 <<](../41_day_project_recipe/41_day_project_recipe.md) | [Day 43 >>](../43_day_project_ecommerce/43_day_project_ecommerce.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The runnable baseline](#the-runnable-baseline)
  - [Identifiers, not indexes](#identifiers-not-indexes)
  - [Pitfalls table](#pitfalls-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The recursive shape](#the-recursive-shape)
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

## JS runtime deep dive

### The runnable baseline

The baseline supports creating posts and liking them. Run it with:

```powershell
npm.cmd run dev
```

Then open `/42_day_project_forum/starter/index.html` for JavaScript and `/42_day_project_forum/starter/index.ts.html` for TypeScript.

Creation pushes into the single `posts` array; a delegated click handler finds the post by stable id and increments likes:

```js
list.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const post = posts.find((item) => item.id === event.target.dataset.id)
  if (post !== undefined) post.likes += 1
  render()
})
```

### Identifiers, not indexes

The button records `dataset.id`, and the handler searches the state for that id. Indexes would break as soon as sorting reorders the array; stable ids survive reordering and persistence.

### Pitfalls table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Recursing without a base case | Incomplete shape | Return at depth 0 or on a size limit |
| Storing a sorted list alongside source posts | Stale views | Sort at render time |
| Rendering user content with `innerHTML` | Convenience | Use `textContent` or a trusted sanitizer |
| Indexing likes and replies by array position | Reorders after sorting | Use stable ids |
| Trusting localStorage shape | Parsing succeeds | Validate recursively before use |

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

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does recursion need a base case, and why does a hostile tree need a size strategy?
2. Why does storing both a sorted list and source posts cause stale views?
3. Why must likes and replies identify stable ids rather than array indexes?
4. Run `npm.cmd run check` and `npm.cmd run links`; then `npm.cmd run dev` and open both starters.

### Level 2 — Applied mini-projects

Build the project in order, recording evidence for each milestone in your project README:

1. Trace post creation and like updates through the delegated list listener.
2. Add recursive comments and replies without unsafe HTML rendering.
3. Add newest/most-liked/most-commented sorting as pure functions.
4. Add a current-user simulation, persistence, and malformed-storage recovery.
5. Add character counts, keyboard/focus behavior, and a README with evidence.

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