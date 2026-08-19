# Day 18 hints

Use only when you are stuck — the learning happens in the attempt.

1. Use `trim`, `Number`, and `Number.isFinite` inside a function. Return the same two shapes every time (`{ ok: true, value }` or `{ ok: false, value: null }`).
2. `Number.isInteger` checks the whole-number part. Test the positive rule separately or in the same condition.
3. Put only the call that can throw inside `try`. In `catch`, use a safe message that does not repeat user input.
4. For `readConfig`, wrap `JSON.parse` in `try/catch` and return a user-safe reason for the `ok: false` path.
5. Start the `catch` block with `if (error instanceof Error)`.