<div align="center">
  <h1>Day 26: Events I — addEventListener, Event Types</h1>
</div>

[<< Day 25](../25_day_dom_manipulation/25_day_dom_manipulation.md) | [Day 27 >>](27_day_events_ii/27_day_events_ii.md)

---

## 🌐 This Lesson Runs in the Browser

**Use Live Server:**
1. Right-click `26_day_events_i/starter/index.html`
2. Select **Open with Live Server**
3. Browser opens at `http://localhost:5500` — auto-reloads on save!

> **Need Live Server?** See [`VS_CODE_SETUP.md`](../VS_CODE_SETUP.md)

---

## What You'll Learn

- Attach event listeners to elements
- Understand the event object and its properties
- Control event propagation (bubbling vs capturing)
- Remove event listeners properly
- Use TypeScript event types

---

## Adding Event Listeners

```js
const button = document.querySelector('button')
const input = document.querySelector('input')

// Click:
button.addEventListener('click', (event) => {
  console.log('Button clicked!', event.target)
})

// Input (fires on every keystroke):
input.addEventListener('input', (event) => {
  console.log('Value:', event.target.value)
})

// Keyboard:
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') console.log('Submitted!')
})
```

## The Event Object

Every event handler receives an event object with useful properties:

```js
button.addEventListener('click', (event) => {
  event.preventDefault()      // Stop default action (e.g. form submit)
  event.stopPropagation()     // Stop event from bubbling up

  console.log(event.target)          // The element that triggered the event
  console.log(event.currentTarget)   // The element the listener is on
  console.log(event.type)            // 'click'
  console.log(event.timeStamp)       // When it happened
})
```

## Event Propagation

Events travel in two phases:

```
Capturing (top → bottom):  Document → Body → div → button
Bubbling (bottom → top):   button → div → Body → Document
```

```js
// Bubbling (default) — listener fires when event bubbles up:
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer clicked')
})

document.getElementById('inner').addEventListener('click', () => {
  console.log('Inner clicked')
})
// Click inner → logs: "Inner clicked", then "Outer clicked"

// Capturing — listener fires during top-down phase:
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer capturing')
}, true)  // true = capturing phase
```

## Removing Event Listeners

You must pass the **same function reference** to remove it:

```js
function handleClick() {
  console.log('Clicked!')
}

// ✅ This works:
button.addEventListener('click', handleClick)
button.removeEventListener('click', handleClick)

// ❌ This does NOT work (creates a new function each time):
button.addEventListener('click', () => console.log('Clicked!'))
button.removeEventListener('click', () => console.log('Clicked!'))
```

### One-time listeners

```js
// Auto-removes after first call:
button.addEventListener('click', handler, { once: true })
```

---

## Common Event Types

| Category | Events |
|----------|--------|
| Mouse | `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove` |
| Keyboard | `keydown`, `keyup`, `keypress` (deprecated) |
| Form | `submit`, `reset`, `change`, `input` |
| Window | `load`, `resize`, `scroll`, `DOMContentLoaded` |
| Touch | `touchstart`, `touchmove`, `touchend` |
| Clipboard | `copy`, `cut`, `paste` |
| Drag | `drag`, `dragstart`, `dragover`, `drop` |

---

## TypeScript: Typed Event Handlers

```ts
const button = document.querySelector('button') as HTMLButtonElement
const input = document.querySelector('input') as HTMLInputElement

// TypeScript knows the event type:
button.addEventListener('click', (event: MouseEvent) => {
  event.preventDefault()
  console.log(`Clicked at: ${event.clientX}, ${event.clientY}`)
})

input.addEventListener('input', (event: Event) => {
  const target = event.target as HTMLInputElement
  console.log('Value:', target.value)
})

input.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') console.log('Submitted!')
})

// Type-safe event helper:
function on<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void
): void {
  el.addEventListener(type, handler as EventListener)
}

on(button, 'click', (e) => {
  console.log(e.clientX)  // TypeScript knows e is MouseEvent
})
```

---

## Exercises

### Level 1

1. Add a click handler to a button that changes its text to "Clicked!".
2. Log the current window size whenever the window is resized.
3. Prevent a form from submitting and log all field values.

### Level 2

1. Create a debounced search input that waits 300ms after typing before logging.
2. Add keyboard shortcuts: Ctrl+Enter to submit, Escape to cancel.
3. In TypeScript, create a typed `on<T>()` helper for event delegation.

### Level 3

1. Implement event delegation for a dynamic list (add/remove items dynamically).
2. Create a drag-and-drop sortable list using drag events.
3. Write a TypeScript `EventBus<Events>` class with typed `emit`, `on`, `off`.

<details>
<summary>🔍 View Solutions</summary>

**Level 2 — Debounced input:**
```js
function debounce(fn, ms) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

const log = debounce((val) => console.log(val), 300)
input.addEventListener('input', (e) => log(e.target.value))
```

**Level 3 — EventBus:**
```ts
type Handler<T> = (data: T) => void

class EventBus<Events extends Record<string, unknown>> {
  private handlers = new Map<string, Set<Handler<any>>>()

  on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void {
    if (!this.handlers.has(event as string)) {
      this.handlers.set(event as string, new Set())
    }
    this.handlers.get(event as string)!.add(handler)
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.handlers.get(event as string)?.forEach(h => h(data))
  }

  off<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void {
    this.handlers.get(event as string)?.delete(handler)
  }
}
```
</details>

---

**Stuck?** Check [`TROUBLESHOOTING.md`](../TROUBLESHOOTING.md)

[<< Day 25](../25_day_dom_manipulation/25_day_dom_manipulation.md) | [Day 27 >>](27_day_events_ii/27_day_events_ii.md)

🌕 **Day 26 Complete!** You now handle user interactions with event listeners, propagation, and TypeScript types.

🎉 **Progress**: 26/45 days complete
