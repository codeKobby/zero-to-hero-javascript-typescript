# Day 27: Event Delegation and Forms — One Listener, Many Elements

[Day 26 <<](../26_day_events_i/26_day_events_i.md) | [Day 28 >>](../28_day_functional_programming/28_day_functional_programming.md)



## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [Keywords and terms](#keywords-and-terms)
- [Topics](#topics)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [Event delegation solves dynamic lists](#event-delegation-solves-dynamic-lists)
  - [Form submission is a browser default](#form-submission-is-a-browser-default)
  - [Keyboard shortcuts must respect context](#keyboard-shortcuts-must-respect-context)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Model the values you expect after conversion](#model-the-values-you-expect-after-conversion)
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

A static handler per item stops scaling the moment items are created dynamically, and a form that navigates away on submit loses the user's data. This lesson solves both: one delegated listener on a stable parent, and one submit handler that reads validated values before anything renders.

## Prerequisites

- Day 26: events, `target` vs `currentTarget`, `preventDefault`.
- Day 25: creating elements safely.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- delegate one listener to a stable parent for dynamic items;
- handle form submit, prevent navigation, and read `FormData`;
- add a `Cmd/Ctrl+S` shortcut that respects context;
- convert `FormData` entries into a validated typed object;
- run this course's Day 27 JavaScript and TypeScript starter pages and the type check.

And you will be able to **explain**:

- why delegation continues to work for items created later;
- why every submitted form control needs a `name`;
- why `preventDefault` is separate from `stopPropagation`;
- why `FormData` can contain `File` values.

## The problem this solves

A list that gains new items cannot attach a new listener for every item forever. One listener on the list handles all clicks, now and later:

```js
list.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('.task')
  if (!(item instanceof HTMLLIElement)) return
  item.remove()
})
```

And a form must never navigate away before its data is read.

## Keywords and terms

| Keyword or term | Plain-English meaning |
| --- | --- |
| **Event delegation solves dynamic lists** | The lesson explains event delegation solves dynamic lists through runnable examples and practice. |
| **Form submission is a browser default** | The lesson explains form submission is a browser default through runnable examples and practice. |
| **Keyboard shortcuts must respect context** | The lesson explains keyboard shortcuts must respect context through runnable examples and practice. |
| **Common mistakes table** | The lesson explains common mistakes table through runnable examples and practice. |

## Topics

Read the topics in order: first understand the idea, then study the syntax, then compare a normal case with a boundary case, and finally complete the practice.

The existing deep-dive sections are the main topic sequence for this lesson:

- [Event delegation solves dynamic lists](#event-delegation-solves-dynamic-lists)
- [Form submission is a browser default](#form-submission-is-a-browser-default)
- [Keyboard shortcuts must respect context](#keyboard-shortcuts-must-respect-context)
- [Common mistakes table](#common-mistakes-table)

## JS runtime deep dive

### Event delegation solves dynamic lists

Suppose a list can gain new items. Adding one listener to every item means remembering to add another listener each time you create an item. Delegation puts one listener on the stable parent:

```js
list.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return
  const item = event.target.closest('.task')
  if (!(item instanceof HTMLLIElement)) return
  item.remove()
})
```

The click begins at the button, bubbles to the list, and `closest` finds the task that owns that button. The guards matter: a list can contain other elements and `EventTarget` is not automatically an element.

`closest` walks up the ancestors from the target — [MDN's `Element.closest` reference](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) documents the selector matching rules and that it returns `null` when no ancestor matches.

### Form submission is a browser default

```js
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const values = new FormData(form)
})
```

The `submit` event is the correct place to handle a form, including pressing Enter. HTML `required` and `type` attributes provide baseline browser validation; your code can add product rules after `preventDefault`. Server-side validation remains necessary.

`FormData` uses each control's `name` as its key:

```html
<input name="email" type="email">
```

Without a `name`, the control is not included in the submitted data.

[The `FormData` reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData) documents `get`, `getAll`, `has`, `append`, and `set`, and how file inputs arrive as `File` values.

### Keyboard shortcuts must respect context

```js
document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
    event.preventDefault()
    saveDraft()
  }
})
```

Do not steal ordinary browser or assistive-technology shortcuts without a clear reason. Escape is often useful for closing a dialog, but only if your page has a dialog to close.

[MDN's `KeyboardEvent` reference](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) documents `key`, `ctrlKey`, `metaKey`, and `repeat` — the properties that distinguish a real shortcut from an accidental one.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| A listener per dynamic item | Following the one-element habit | One delegated listener on the parent |
| Using `event.target` without a guard | Forgetting it is generic | Check `instanceof` before `closest` |
| Controls without `name` | Missing the FormData contract | Name every submitted control |
| Asserting `FormData` is a typed object | Impatience | Validate each entry deliberately |
| Stealing browser shortcuts | Copy-paste | Respect context; only override with reason |

## The TypeScript layer

### Model the values you expect after conversion

TypeScript can model the values your application expects after `FormData` conversion:

```ts
type FormValues = {
  name: string
  email: string
}
```

`FormData` values can also be `File` objects. Convert or validate each entry deliberately instead of asserting the entire object has your type:

```ts
function readFormValues(form: HTMLFormElement): FormValues | null {
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  if (typeof name !== 'string' || typeof email !== 'string' || name.trim() === '') {
    return null
  }
  return { name: name.trim(), email: email.trim() }
}
```

### What TypeScript cannot decide

TypeScript cannot decide which controls the user actually submitted, or whether a `FormData` entry is text or a file. The `typeof` checks and the `null` return are runtime behavior your tests must prove — no assertion makes the incoming form typed.

### One compiler error, walked through

Open `27_day_events_ii/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
const data = new FormData(form)
const name: string = data.get('name')
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Type 'FormDataEntryValue | null' is not assignable to type 'string'.
```

Read it as: *"`data.get('name')` may be missing (`null`) or a `File` — `FormDataEntryValue` is `string | File` — so a bare assignment cannot claim it is text."* The fix is the deliberate narrow from the lesson:

```ts
const name = data.get('name')
if (typeof name !== 'string' || name.trim() === '') {
  return null
}
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Delegation puts one listener on the stable parent and finds the owning element with `closest`; a form is read at submit after `preventDefault`, with every `FormData` entry narrowed before it enters typed state.

## Learn more on MDN

Delegation and forms hang off a few foundational pages. Bookmark these and return as you grow:

- [Element.closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) — finding the owning ancestor from any bubbled target
- [Element.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) — the selector check behind delegation guards
- [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) — reading submitted controls by their `name`
- [FormData.get](https://developer.mozilla.org/en-US/docs/Web/API/FormData/get) — the single-entry accessor and its `File` cases
- [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement) — the element behind `form` and its `elements` collection
- [Event.preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) — stopping navigation before the data is read
- [Document: keydown event](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event) — the event behind keyboard shortcuts
- [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) — `key`, `ctrlKey`, `metaKey`, and `repeat`
- [HTMLFormElement: submit event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event) — the submit event you read today

### TypeScript docs

- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) — the `typeof` checks that prove a `FormDataEntryValue` is text
- [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — the annotations behind the typed form object

## Read the first example line by line

The first runnable example introduces **Event Delegation and Forms — One Listener, Many Elements**. Run it unchanged before editing it. Then read it line by line and write down what value exists after each declaration, which condition is tested, and what appears in the console.

| Line | Code | What the runtime is doing |
| ---: | --- | --- |
| 1 | `list.addEventListener('click', (event) => {` | Function syntax: this line defines reusable behavior or an arrow function. |
| 2 | `  if (!(event.target instanceof HTMLButtonElement)) return` | Control-flow statement: the runtime decides whether or how this block runs. |
| 3 | `  const item = event.target.closest('.task')` | Declaration or assignment: the runtime creates or updates a named value. |
| 4 | `  if (!(item instanceof HTMLLIElement)) return` | Control-flow statement: the runtime decides whether or how this block runs. |
| 5 | `  item.remove()` | Function call: the runtime evaluates the arguments and invokes the operation. |
| 6 | `})` | Expression or data declaration: identify the values, operators, and names before running it. |

The table is a starting point, not a substitute for running the example. Change one value only, predict the output, run it, and explain the difference.

## Prediction experiment

Before changing the example, write a prediction. Test one normal input, one empty or missing input, and one boundary input relevant to **Event Delegation and Forms — One Listener, Many Elements**. Record the input, your prediction, the observed output or error, and the rule you learned. Keep the failed prediction; it shows which mental model needs repair.

## Broken example and repair

Make one controlled mistake related to **Event Delegation and Forms — One Listener, Many Elements**: misspell a name, use the wrong type, omit a return, call a function too early, or change one condition. Run it and capture the useful error or incorrect output. Explain the assumption that failed, then make the smallest repair and rerun the normal and boundary cases. Do not hide the error with a broad catch or delete the failing experiment.

## Guided practice before independent work

Start with the nearest worked example. Change one value, predict the result, and run it. Next, change one rule while keeping the input the same. Finally, write a small variation from a blank file and compare it with the example. Only after these three checkpoints should you begin the numbered or level-based practice below.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why does delegation continue to work for items created later?
2. Why does every submitted form control need a `name`?
3. Why is `preventDefault` separate from `stopPropagation`?
4. Why can `FormData` contain `File` values?
5. Why must the delegated handler guard `event.target` before `closest`?
6. Open the JavaScript starter (`starter/index.html`) directly in your browser and serve the TypeScript page (`npm.cmd run dev`, then `starter/index.ts.html`); confirm a delegated task removal, a form submit, and the shortcut all update the page on both; then run `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Add a task button inside each dynamic list item and remove the item through one parent listener.
2. Handle form submit, prevent navigation, and display the submitted name.
3. Add a `Cmd/Ctrl+S` shortcut that updates a status message.
4. TypeScript: convert `FormData` entries into a validated `FormValues` object.
5. **MDN lookup:** Open the [FormData reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData), find the `getAll()` method, and add two checkboxes with the same `name` to a form; read them back with `getAll('tags')` and render each selected value. Comment on why `get` would only return the first one.

### Level 3 — Creative synthesis

1. The selective delegate: one listener handles both a remove button and an edit button using `closest` and a `data-action` attribute, with a comment on why the action marker belongs in the markup.
2. The validated form: read `name` and `email`, return `null` when either is missing or trimmed-empty, and render a message for each failure case instead of a single generic one.
3. The scoped shortcut: register `keydown` only while a dialog is open, and remove the listener when it closes — with a comment on why a global, always-on shortcut is a hazard.
4. The file-aware entry: write `readTextEntry(data, key)` that returns a string or `null`, handling the `File` case deliberately, and comment on why the `File` case cannot be assigned to a string.

## Finish line

Day 27 is complete when you can do all of these **without notes**:

1. Delegate one listener to a stable parent for dynamic items.
2. Handle form submit, prevent navigation, and read `FormData`.
3. Add a `Cmd/Ctrl+S` shortcut that respects context.
4. Convert `FormData` entries into a validated typed object.

If any answer is a guess, revisit the matching section before Day 28.

## Prove it

Write, in your own words, a short answer to each:

1. Why does delegation continue to work for items created later?
2. Why does every submitted form control need a `name`?
3. Why is `preventDefault` separate from `stopPropagation`?
4. Why can `FormData` contain `File` values?
5. Why is a `FormData` entry not assignable to a string in TypeScript, and what does the fix require?

Your answers are today's evidence. If you can write them, move to [Day 28: Functional Programming — Composing Small Pure Functions](../28_day_functional_programming/28_day_functional_programming.md).

**Day 27 complete.** One listener now owns every dynamic item through delegation, forms are read at submit after `preventDefault`, shortcuts respect context, and `FormData` entries are narrowed before they enter typed state.