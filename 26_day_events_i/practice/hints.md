# Day 26 hints

Use only when you are stuck — the learning happens in the attempt.

1. Store the count outside the handler, then increment it inside the handler.
2. `currentTarget` is the element with the listener. Narrow it before reading `value`.
3. Keep the timer in the closure. `clearTimeout` before assigning a new timeout.
4. Name the handler function and pass that same variable to `removeEventListener`.
5. For a one-shot action, `{ once: true }` removes the listener automatically after the first call.
6. When `event.target.value` does not type-check, the browser reported a generic `EventTarget` — prove it with `instanceof` before reading the property.