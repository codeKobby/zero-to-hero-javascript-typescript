# Day 31 hints

Use only when you are stuck — the learning happens in the attempt.

1. Return `new Promise` and call `resolve` inside `setTimeout`.
2. Return the Promise from the first `then` so the next `then` waits for it.
3. Call `reject` with an `Error` and attach `catch`.
4. `Promise<T>` describes fulfillment. Catch values still need runtime narrowing.
5. A `then` without `return` passes `undefined` to the next step.
6. A settled promise cannot change outcome; only the first settlement wins.