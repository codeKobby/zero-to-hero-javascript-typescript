# Day 25: Changing DOM Elements — Updating the Page

[Day 24 <<](../24_day_dom_selection/24_day_dom_selection.md) | [Day 26 >>](../26_day_events_i/26_day_events_i.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [DOM changes are visible state changes](#dom-changes-are-visible-state-changes)
  - [Build text with textContent, not innerHTML](#build-text-with-textcontent-not-innerhtml)
  - [A readable element-building sequence](#a-readable-element-building-sequence)
  - [Attributes, properties, classes, and data](#attributes-properties-classes-and-data)
  - [Remove only the element you own](#remove-only-the-element-you-own)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The tag-name map preserves the element type](#the-tag-name-map-preserves-the-element-type)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Learn more on MDN](#learn-more-on-mdn)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

Finding an element (Day 24) is only half the work — a page is useful when you can create, configure, attach, and remove nodes. Every change is a visible state change, so the sequence must be readable, and text must never be treated as markup.

This lesson teaches the safe mutation path: build in memory first, assign text with `textContent`, configure classes and data attributes, attach, and remove only what you own.

## Prerequisites

- Day 24: selecting elements and handling missing matches.
- Day 22: untrusted text arrives as text, not as markup to run.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create an element, configure it, attach it, and remove it;
- assign user text with `textContent` instead of `innerHTML`;
- add classes with `classList` and markers with `dataset`;
- read a live form value with `input.value`;
- remove an element through the reference you hold;
- rely on `createElement`'s tag-name typing in TypeScript;
- run this course's Day 25 JavaScript and TypeScript starter pages and the type check.

And you will be able to **explain**:

- when a created element becomes visible;
- why `textContent` is safer than `innerHTML` for input text;
- when to use `input.value` rather than `getAttribute('value')`;
- why `classList.toggle` preserves other classes.

## The problem this solves

A task list needs a new item with a label, a status marker, and a class — without letting the label become markup:

```js
const item = document.createElement('li')
item.textContent = userProvidedText
item.dataset.status = 'open'
item.classList.add('task')
list.append(item)
```

The rest of this lesson turns that into a readable, repeatable sequence and shows what can go wrong.

## JS runtime deep dive

### DOM changes are visible state changes

Yesterday you found an existing element. Today you will create an element, configure it, attach it to the document, and remove it. Build an element in memory first; it becomes visible only after you append it to a node already in the document:

```js
const item = document.createElement('li')
item.textContent = 'Practice DOM manipulation'
document.querySelector('#task-list').append(item)
```

Before the `append`, the element exists only in JavaScript — the page does not show it.

### Build text with textContent, not innerHTML

`textContent` treats a value as text:

```js
const message = document.createElement('p')
message.textContent = userProvidedText
```

`innerHTML` parses a string as HTML. Never put untrusted text in `innerHTML`. That can turn user input into executable markup and create cross-site scripting vulnerabilities. If you have a genuine need to render trusted markup, document exactly where it comes from and use a security-reviewed sanitization strategy.

Both properties are worth reading side by side on MDN — [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) treats every value as plain text, while [Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) parses it as markup and explains exactly when that is dangerous.

### A readable element-building sequence

```js
function addTask(list, label) {
  const item = document.createElement('li')
  item.classList.add('task')
  item.dataset.status = 'open'
  item.textContent = label
  list.append(item)
  return item
}
```

Read that as a sequence: create an unattached element, give it presentation and data attributes, add safe visible text, attach it, return a reference. Keeping this sequence in one small function makes the mutation easy to locate.

`createElement` is only the start — [MDN's `createElement` reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) also shows the `options` parameter and how the tag-name map picks the concrete element type that the TypeScript walkthrough below relies on.

### Attributes, properties, classes, and data

An HTML attribute is written in markup. A DOM property is the JavaScript-facing value. For a live form value, read `input.value`; for a custom data marker, use `dataset`:

```js
input.value = 'mina@example.com'
item.dataset.status = 'done'
item.classList.toggle('is-complete')
```

Use `classList` rather than overwriting `className` when you are adding or removing one class among several. `classList` is a `DOMTokenList` with more than `add` and `toggle` — [MDN's `classList` reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) documents `replace`, `contains`, `remove`, and `item` too.

### Remove only the element you own

```js
item.remove()
```

Removal changes the page state. In a larger app, let one rendering or event-handling path own that decision so UI changes do not become scattered across unrelated functions.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Setting `innerHTML` from user text | Convenience | `textContent` treats it as text |
| Forgetting to attach a created node | Reading the creation line only | `append` before expecting visibility |
| Overwriting `className` | Treating classes as one string | `classList.add` / `toggle` |
| Reading `getAttribute('value')` for a live value | Confusing markup and property | Use `input.value` |
| Removing nodes from unrelated code | Scattered state changes | One owning path per UI change |

## The TypeScript layer

### The tag-name map preserves the element type

The DOM API returns broad element types. TypeScript's tag-name map preserves a more useful type when you create an element:

```ts
const button = document.createElement('button')
button.disabled = true
```

`createElement('button')` returns `HTMLButtonElement`, so `disabled` is known and type-checked. Avoid an over-general `createElement` helper before you understand the native API — the native method is already strongly typed and easy to read.

### What TypeScript cannot decide

TypeScript cannot decide whether your `innerHTML` string is safe, or whether a node is attached to the document yet. `innerHTML` accepts any string. The safety rules — text stays text, markup only when trusted — are runtime decisions your code and its review must enforce.

### One compiler error, walked through

Open `25_day_dom_manipulation/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const generic = document.createElement('div')
generic.disabled = true
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'disabled' does not exist on type 'HTMLDivElement'.
```

Read it as: *"`createElement` reads the tag name and returns the matching element type — a div has no `disabled` property, so the mistake fails before the browser runs."* The fix is to create the element whose type owns the property:

```ts
const button = document.createElement('button')
button.disabled = true
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

DOM changes are visible state changes — build in memory, assign text with `textContent`, configure classes and data attributes, attach, remove only what you own, and let `createElement`'s tag-name typing catch wrong element types before the browser runs.

## Learn more on MDN

Creating and changing elements is a small slice of the DOM's mutation surface. Bookmark these pages and return as you grow:

- [Document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) — creating a node in memory before it is attached
- [Element.append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) — attaching a node so it becomes visible
- [Element.remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) — removing the element you own a reference to
- [Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) — safe, plain-text assignment for user input
- [Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) — markup parsing, and why it is dangerous for user text
- [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) — the `DOMTokenList` with `add`, `toggle`, `replace`, and `contains`
- [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) — the `data-*` attribute mapping behind `item.dataset.status`
- [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) — the concrete element type behind `input.value`
- [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) — the object behind `document` and the methods that create and find nodes

### TypeScript docs

- [DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html) — how the compiler types `createElement` by tag name
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind the typed DOM values you read today

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. When does a created element become visible?
2. Why is `textContent` safer than `innerHTML` for input text?
3. When should you use `input.value` rather than `getAttribute('value')`?
4. Why does `classList.toggle` preserve other classes?
5. What does `document.createElement('li')` return before it is appended?
6. Open the JavaScript starter (`starter/index.html`) directly in your browser and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`); confirm the output line appears on both; then run `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Create a list item whose text comes from an input value using `textContent`.
2. Add a `data-priority` attribute and a priority class.
3. Toggle an `is-complete` class without deleting the other classes.
4. Remove the list item only after you hold a direct reference to it.
5. **MDN lookup:** Open the [classList reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), find the `replace()` method on `DOMTokenList`, and swap a `pending` class for a `done` class on a list item using `classList.replace()`. Comment on why `replace` is safer than removing one class and adding another in two separate calls.

### Level 3 — Creative synthesis

1. The builder: write `createTaskItem(label, status)` returning a fully configured but unattached `li`, and a separate `appendTask(list, item)` that attaches it. State why separating build and attach makes the flow testable.
2. The status badge: write `setBadge(item, status)` that swaps the visible class and the `data-status` marker together using `classList` — never touching the label's `textContent`.
3. The safe text audit: write a comment block listing every place a value from `input.value`, storage, or an API must be assigned with `textContent`, and why `innerHTML` is never acceptable there.
4. The counter: write `incrementCounter(output, by)` that updates `output.textContent` from a number stored in memory (not from re-reading the text), and comment on why the memory value is the source of truth.

## Finish line

Day 25 is complete when you can do all of these **without notes**:

1. Create an element, configure it, attach it, and remove it.
2. Assign user text with `textContent` instead of `innerHTML`.
3. Add classes with `classList` and markers with `dataset`.
4. Read a live form value with `input.value`.
5. Remove an element through the reference you hold.

If any answer is a guess, revisit the matching section before Day 26.

## Prove it

Write, in your own words, a short answer to each:

1. When does a created element become visible?
2. Why is `textContent` safer than `innerHTML` for input text?
3. When should you use `input.value` rather than `getAttribute('value')`?
4. Why does `classList.toggle` preserve other classes?
5. What does `createElement`'s tag-name typing catch before the browser runs?

Your answers are today's evidence. If you can write them, move to [Day 26: Events — Responding to the User](../26_day_events_i/26_day_events_i.md).

**Day 25 complete.** Creating and changing the page is now a deliberate sequence — build in memory, safe text, configured classes and data, attach, remove only what you own — with element types checked before the browser even runs.