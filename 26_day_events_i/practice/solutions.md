# Day 26 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `addEventListener` needs a function reference to call later. `handleClick` passes the function; `handleClick()` calls it immediately and passes its return value instead.
2. `target` is the deepest element that initiated the event; `currentTarget` is the element whose listener is running. For nested elements or bubbling, they differ.
3. `preventDefault` stops the browser's default action (like form navigation). It does not stop the event from bubbling — `stopPropagation` is a separate, deliberate choice.
4. Removal identifies the listener by reference; a freshly written arrow function is a different object even if it looks identical.
5. Debounce postpones the callback until input goes quiet; it does not validate values.
6. Both starter pages update the output on click and after a typing pause; `npm run check` passes.

## Level 2

```ts
let count = 0
button.addEventListener('click', () => {
  count += 1
  output.textContent = 'Clicks: ' + count
})

function handleInput(event: Event): void {
  if (event.currentTarget instanceof HTMLInputElement) {
    output.textContent = event.currentTarget.value
  }
}

input.addEventListener('input', handleInput)
input.removeEventListener('input', handleInput)
```

The same handler reference is passed to both calls. An inline arrow expression created separately during removal would not identify the original listener.

## Level 3

```ts
// 1. The one-shot
button.addEventListener('click', handleFirstClick, { once: true })
// { once: true } removes the listener after the first call — the right tool for
// a one-time action, because there is no removeEventListener bookkeeping to
// forget. Manual removal still wins when the decision is conditional.

// 2. The form owner
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const nameField = form.elements.namedItem('name')
  if (nameField instanceof HTMLInputElement) {
    output.textContent = 'Hello, ' + nameField.value
  }
})
// preventDefault belongs at the top of the submit handler, before any render,
// so the page never navigates away from the summary it is about to show.

// 3. The grouped lifecycle
const controller = new AbortController()

button.addEventListener('click', handleClick, { signal: controller.signal })
input.addEventListener('input', handleInput, { signal: controller.signal })
window.addEventListener('resize', handleResize, { signal: controller.signal })

// controller.abort() removes all three at once — ideal when a whole view
// is being torn down and its listeners should share the same lifetime.

// 4. The event memo
// target         the deepest element that initiated the event (generic)
// currentTarget  the element whose listener is currently running (narrowable)
// preventDefault stops the default action only, not bubbling
// stopPropagation stops bubbling only — use deliberately, not reflexively
// removeEventListener needs the exact same function reference that was added
```

Events are now a deliberate channel: pass references, prove targets, prevent defaults on purpose, and clean up with the same reference.