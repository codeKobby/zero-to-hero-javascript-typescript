# Day 29: The Todo Project — Bringing It Together

[Day 28 <<](../28_day_functional_programming/28_day_functional_programming.md) | [Day 30 >>](../30_day_project_weather/30_day_project_weather.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The data flow](#the-data-flow)
  - [Every todo passes a runtime check](#every-todo-passes-a-runtime-check)
  - [Rendering from one source of truth](#rendering-from-one-source-of-truth)
  - [Persistence is a boundary, not a promise](#persistence-is-a-boundary-not-a-promise)
  - [Derived filters, not duplicated state](#derived-filters-not-duplicated-state)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Types describe the todo; runtime still validates it](#types-describe-the-todo-runtime-still-validates-it)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

All the pieces so far — state, DOM rendering, events, persistence — come together in one small application. The todo app is the smallest honest example of a real pattern: a single source of truth, derived views, and side effects pushed to boundaries. This lesson builds that app and shows where each habit from Days 22-28 lands.

## Prerequisites

- Days 22-28: JSON, storage, DOM, events, delegation, functional habits.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- keep todo data in one source of truth and render from it;
- trim and reject empty text before a todo is created;
- toggle and delete through delegated events;
- derive all/active/completed filters instead of duplicating data;
- persist a versioned array and fall back safely when JSON is malformed;
- add labels, focus return, and an accessible empty state;
- run this course's Day 29 starter pages in both languages and the type check.

And you will be able to **explain**:

- why user text must be assigned with `textContent`, never `innerHTML`;
- why filters are derived, not stored;
- why `JSON.parse` needs both a catch and a shape check;
- why a browser refresh is part of the acceptance test.

## The problem this solves

A todo app is a loop: the user submits text, the app turns it into a validated `Todo`, state changes, the list re-renders, and the change is persisted. Without one source of truth, the DOM and the data drift apart. Without validation, stored JSON from an older version can crash the render.

```ts
type Todo = { id: string; text: string; completed: boolean; createdAt: number }
type Filter = 'all' | 'active' | 'completed'
```

## JS runtime deep dive

### The data flow

```text
form input -> validated Todo -> state array -> render -> user event -> state update
                                      \-> localStorage
```

Keep add, toggle, delete, and filter operations separate from DOM and storage effects. This gives you one source of truth and makes the logic testable in Node.

### Every todo passes a runtime check

```js
function isTodo(value) {
  return typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'string' &&
    typeof value.text === 'string' &&
    typeof value.completed === 'boolean' &&
    typeof value.createdAt === 'number'
}
```

The todo is valid only when every expected property has the expected runtime type. `null` fails because `typeof null === 'object'`.

### Rendering from one source of truth

The list is rebuilt from state on every change:

```js
list.replaceChildren()
for (const todo of visibleTodos()) {
  const item = document.createElement('li')
  item.dataset.id = todo.id
  const label = document.createElement('span')
  label.textContent = todo.text
  // ...
  list.append(item)
}
```

Rendering user text with `innerHTML` can create a markup injection bug; `textContent` assigns plain text instead of parsing it.

### Persistence is a boundary, not a promise

```js
function load() {
  try {
    const raw = localStorage.getItem('day29-todos')
    if (raw === null) return
    const value = JSON.parse(raw)
    if (Array.isArray(value) && value.every(isTodo)) state.todos = value
  } catch {
    state.todos = []
  }
}
```

`JSON.parse` can throw and can return the wrong shape. The `try/catch` covers the throw; the `Array.isArray` and `every(isTodo)` checks cover the shape. The app remains usable when storage is blocked.

### Derived filters, not duplicated state

```js
function visibleTodos() {
  if (state.filter === 'active') return state.todos.filter((todo) => !todo.completed)
  if (state.filter === 'completed') return state.todos.filter((todo) => todo.completed)
  return state.todos
}
```

Keeping a second filtered array in state creates synchronization bugs; deriving it from `state.todos` means one change propagates everywhere.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Rendering user text with `innerHTML` | Convenience | Assign with `textContent` |
| A second filtered array in state | Optimizing too early | Derive it with `filter` |
| `JSON.parse` without catch or shape check | Trusting storage | Catch and validate |
| Mutating `state.todos` in place | Speed or habit | Return new arrays with map/filter |
| Skipping the refresh test | Testing happy path | A refresh is part of acceptance |

## The TypeScript layer

### Types describe the todo; runtime still validates it

The TypeScript starter adds `Todo` and `Filter` types, but it still validates `localStorage`, because TypeScript is erased before the browser runs:

```ts
function isTodo(value: unknown): value is Todo {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'string' &&
    'text' in value && typeof value.text === 'string' &&
    'completed' in value && typeof value.completed === 'boolean' &&
    'createdAt' in value && typeof value.createdAt === 'number'
}
```

Compare the same form handler in both files and identify what the compiler catches versus what only a test can catch.

### What TypeScript cannot decide

TypeScript cannot decide whether the value read from `localStorage` is a valid `Todo`, or whether the DOM matches the HTML in the page. The runtime guards are the actual safety net; the types describe the shape the guards enforce.

### One compiler error, walked through

Open `29_day_project_todo/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const raw = localStorage.getItem('day29-todos')
const todos: Todo[] = JSON.parse(raw)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Argument of type 'string | null' is not assignable to parameter of type 'string'.
```

Read it as: *"`localStorage.getItem` returns `null` when the key is missing, and `JSON.parse` only accepts a string — so the missing-key case must be handled before parsing."* The fix is the guarded load from the lesson:

```ts
const raw = localStorage.getItem('day29-todos')
if (raw === null) return
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

A todo app is a loop — validate input into a typed todo, update one source of truth, derive the visible list, render with `textContent`, persist at the boundary, and guard everything read from storage because the browser can return `null` or the wrong shape.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why is a todo valid only when every expected property has the expected runtime type?
2. Why is `textContent` safer than `innerHTML` for user text?
3. Why are filters derived, not stored?
4. Why does `JSON.parse` need both a catch and a shape check?
5. Why is a browser refresh part of the acceptance test?
6. Open the JavaScript starter (`starter/index.html`) directly in your browser and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`); confirm add, toggle, delete, filter, and refresh all work on both; then run `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Extend the render: add an edit action beside each delete button and route both through the delegated click handler with a `data-action` attribute.
2. Add a filter row of three buttons (All, Active, Completed) that sets `state.filter` and re-renders without duplicating todo data.
3. Extend the save/load boundary: version the storage key as `day29-todos-v2` and migrate an old array when present.
4. TypeScript: extend `isTodo` with a `note?: string` field and keep the type predicate honest.

### Level 3 — Creative synthesis

1. The undo trail: keep the last three snapshots of `state.todos` and add an Undo button that restores the most recent one, with a comment on why snapshots must be copies.
2. The testable core: extract add/toggle/delete/filter into pure functions that take state and return new state, then verify the same functions drive both the DOM and the TypeScript starter.
3. The empty state: when `visibleTodos()` is empty, render a heading and message instead of a bare list, and comment on why the empty state is data-driven, not markup-driven.
4. The health check: write a checklist of the four pitfalls (injection, duplicated filter state, unvalidated JSON, refresh) and mark where each is prevented in the starter files.

## Finish line

Day 29 is complete when you can do all of these **without notes**:

1. Keep todo data in one source of truth and render from it.
2. Trim and reject empty text before a todo is created.
3. Toggle and delete through delegated events.
4. Derive all/active/completed filters instead of duplicating data.
5. Persist a versioned array and fall back safely when JSON is malformed.

If any answer is a guess, revisit the matching section before Day 30.

## Prove it

Write, in your own words, a short answer to each:

1. Why is user text assigned with `textContent`, never `innerHTML`?
2. Why are filters derived, not stored?
3. Why does `JSON.parse` need both a catch and a shape check?
4. Why is a browser refresh part of the acceptance test?
5. Why must the missing-key `null` case be handled before parsing in TypeScript?

Your answers are today's evidence. If you can write them, move to [Day 30: The Weather Project — Fetching and Rendering](../30_day_project_weather/30_day_project_weather.md).

**Day 29 complete.** The todo loop now runs end to end — validated input into a typed todo, one source of truth, derived visible lists, `textContent` rendering, persistence at the boundary, and every stored value guarded because the browser can return `null` or the wrong shape.