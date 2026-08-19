# Day 26: Events — Responding to the User

[Day 25 <<](../25_day_dom_manipulation/25_day_dom_manipulation.md) | [Day 27 >>](../27_day_events_ii/27_day_events_ii.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [An event is a report from the browser](#an-event-is-a-report-from-the-browser)
  - [target and currentTarget are different](#target-and-currenttarget-are-different)
  - [Common handler flow](#common-handler-flow)
  - [Listener identity and cleanup](#listener-identity-and-cleanup)
  - [Debounce means wait for quiet](#debounce-means-wait-for-quiet)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [Mapped event types, unproven targets](#mapped-event-types-unproven-targets)
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

A page becomes an application when it reacts — a click counts, a keystroke searches, a form submits. Events are the browser's report channel, and the way you register, read, and remove handlers decides how predictable those reactions are.

This lesson teaches the event-driven mindset: pass a function reference, read `currentTarget` with proof, prevent default deliberately, and clean up listeners with the same reference.

## Prerequisites

- Day 24: selecting elements.
- Day 25: creating and changing elements from a handler.
- Day 13: passing functions as values.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- register and remove event listeners;
- increment and display state from a click handler;
- read an input's live value from `currentTarget`;
- call `preventDefault()` on a form submit;
- write a debounce wrapper for noisy events;
- narrow `EventTarget` with `instanceof` in TypeScript;
- run this course's Day 26 JavaScript and TypeScript starter pages and the type check.

And you will be able to **explain**:

- why `handleClick` differs from `handleClick()` in `addEventListener`;
- when `target` and `currentTarget` can differ;
- what `preventDefault` stops, and what it does not stop;
- why listener removal requires the same function reference.

## The problem this solves

A button click must update a count, and a keystroke must search — but only after the user pauses:

```js
button.addEventListener('click', () => {
  count += 1
  output.textContent = 'Clicks: ' + count
})
```

The rest of this lesson hardens that pattern: correct registration, correct event object, deliberate defaults, and clean removal.

## JS runtime deep dive

### An event is a report from the browser

An event-driven program does not run only top to bottom. It registers a handler, returns control to the browser, and responds when the user clicks, types, submits, or resizes:

```js
button.addEventListener('click', handleClick)

function handleClick(event) {
  console.log('The browser called me after a click.')
}
```

The function is passed, not called. `addEventListener` needs a function reference to call later. Writing `handleClick()` would run it immediately and pass its return value instead.

### target and currentTarget are different

`event.target` is the deepest element that initiated the event. `event.currentTarget` is the element whose listener is currently running. For a listener directly on a button they may match; for nested elements or bubbling they may not:

```js
button.addEventListener('click', (event) => {
  console.log(event.target)
  console.log(event.currentTarget)
})
```

Use `currentTarget` when the handler belongs to the element you registered. Treat `target` as `EventTarget` until you prove it is an `HTMLElement`.

### Common handler flow

```js
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const input = form.querySelector('input')
  if (input instanceof HTMLInputElement) {
    output.textContent = input.value
  }
})
```

`preventDefault` stops the browser's default action, such as navigation for a form. It does **not** stop the event from bubbling. `stopPropagation` is a separate choice and should not be used reflexively.

### Listener identity and cleanup

```js
function handleResize() {
  console.log(window.innerWidth)
}

window.addEventListener('resize', handleResize)
window.removeEventListener('resize', handleResize)
```

Removing requires the same function reference. Two visually identical arrow functions are two different objects. Use `AbortController` when a group of listeners should share a lifetime:

```js
const controller = new AbortController()
button.addEventListener('click', handleClick, { signal: controller.signal })
controller.abort()
```

### Debounce means wait for quiet

Typing fires many `input` events. A debounce wrapper cancels the previous timer and runs only after the user pauses:

```js
function debounce(callback, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}
```

This is a timing tool, not a validation tool. The next lesson will handle dynamic lists and forms.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Passing `handleClick()` | Calling instead of passing | Pass the reference, no parentheses |
| Reading `event.target.value` unchecked | Forgetting target is generic | Narrow with `instanceof` |
| `stopPropagation()` reflexively | Copy-paste | Decide per event; avoid by default |
| Removing with a fresh arrow function | Misreading identity | Reuse the named reference |
| Debouncing validation | Misunderstanding debounce | Debounce timing, validate each input |

## The TypeScript layer

### Mapped event types, unproven targets

TypeScript gives `addEventListener` a mapped event type. It still cannot magically prove that `event.target` is your input:

```ts
input.addEventListener('input', (event: Event) => {
  if (event.currentTarget instanceof HTMLInputElement) {
    console.log(event.currentTarget.value)
  }
})
```

The runtime `instanceof` check is the evidence. Do not copy an unchecked `event.target.value` expression into strict TypeScript.

### What TypeScript cannot decide

TypeScript cannot decide which element actually fired the event at runtime, or whether a handler is still attached. It types the event object and the listener's parameters, but the `instanceof` proof and the `removeEventListener` bookkeeping are runtime behavior your code must own.

### One compiler error, walked through

Open `26_day_events_i/starter/ts/main.ts`. The last section is commented out and deliberately broken:

```ts
input.addEventListener('input', (event: Event) => {
  console.log(event.target.value)
})
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the reason:

```
Property 'value' does not exist on type 'EventTarget | null'.
```

Read it as: *"`event.target` can be null and is a generic `EventTarget` — the browser reports *where* the event happened, not a type guarantee that it is an input."* The fix is the `instanceof` narrow from the lesson:

```ts
input.addEventListener('input', (event: Event) => {
  if (event.currentTarget instanceof HTMLInputElement) {
    console.log(event.currentTarget.value)
  }
})
```

Comment the broken section back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

An event is a report from the browser — pass a function reference, not a call; read `currentTarget` with runtime proof; prevent defaults deliberately; and remove listeners with the same reference that added them.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact result before running.

1. Why is `handleClick` different from `handleClick()` when passed to `addEventListener`?
2. When can `target` and `currentTarget` differ?
3. What does `preventDefault` stop, and what does it not stop?
4. Why does listener removal require the same function reference?
5. What does `debounce` actually postpone — and what does it not do?
6. Start `npm.cmd run dev`, open both starter pages, and confirm a click and a pause after typing both update the output; then run `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Add a click handler that increments a visible count.
2. Add an input handler that displays the current value.
3. Write `debounce` and use it to update a status after 300 milliseconds of quiet.
4. Remove a named listener and explain why an inline replacement does not work.

### Level 3 — Creative synthesis

1. The one-shot: register a listener with `{ once: true }` for a first-click action, and comment on when a one-shot listener beats manual removal.
2. The form owner: write a submit handler that reads values from `form.elements`, prevents the default navigation, and renders a safe summary with `textContent`. State where `preventDefault` belongs.
3. The grouped lifecycle: register three listeners with one `AbortController` signal and abort them together, with a comment on when the group should be aborted.
4. The event memo: write a comment block listing `target` vs `currentTarget`, `preventDefault` vs `stopPropagation`, and the same-reference rule for removal.

## Finish line

Day 26 is complete when you can do all of these **without notes**:

1. Register and remove event listeners.
2. Increment and display state from a click handler.
3. Read an input's live value from `currentTarget`.
4. Call `preventDefault()` on a form submit.
5. Write a debounce wrapper for noisy events.

If any answer is a guess, revisit the matching section before Day 27.

## Prove it

Write, in your own words, a short answer to each:

1. Why is `handleClick` different from `handleClick()` when passed to `addEventListener`?
2. When can `target` and `currentTarget` differ?
3. What does `preventDefault` stop, and what does it not stop?
4. Why does listener removal require the same function reference?
5. What does the type checker know that the running page must still prove about `event.target`?

Your answers are today's evidence. If you can write them, move to [Day 27: Event Delegation and Forms — One Listener, Many Elements](../27_day_events_ii/27_day_events_ii.md).

**Day 26 complete.** Events are now a deliberate channel — register by reference, read `currentTarget` with proof, prevent defaults on purpose, remove with the same reference, and debounce noisy input until the user pauses.