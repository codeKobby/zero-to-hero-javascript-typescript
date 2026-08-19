# Day 32 hints

Use only when you are stuck — the learning happens in the attempt.

1. Pass an array of Promise values to `Promise.all` and destructure the returned array.
2. Inspect each `allSettled` result's `status` before reading `value` or `reason`.
3. `Promise.race` can reject from the timeout, but the original operation continues unless it supports `AbortSignal`.
4. `Promise.any` returns the first fulfilled value and `AggregateError` when all reject.
5. `Promise.all` preserves input order, not completion order.
6. Only `AbortController` cancels cooperative work; a rejection never cancels a loser.