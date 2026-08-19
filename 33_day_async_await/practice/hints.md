# Day 33 hints

Use only when you are stuck — the learning happens in the attempt.

1. Put the operations in the same order inside an async function and use `await`.
2. Wrap the awaited operation in `try`/`catch` and return `null` in `catch`.
3. Start both independent calls in an array passed to `Promise.all`.
4. The function return type should be `Promise<T>`, not `T`.
5. An async function wraps its return value; do not add a second `Promise.resolve`.
6. For an async loop, choose `for...of` (sequential, ordered) or `map` plus `Promise.all` (concurrent) on purpose.