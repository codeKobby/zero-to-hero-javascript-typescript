# Day 34 hints

Use only when you are stuck — the learning happens in the attempt.

1. Await `fetch`, check `ok`, then await `response.json`.
2. Create an `AbortController`, pass `signal`, and `abort` from a timeout.
3. Set `method`, `Content-Type`, and `JSON.stringify` the body.
4. Parse as `unknown` and narrow with object, non-null, property, and `typeof` checks.
5. A 404 or 500 still resolves; only the network failure rejects.
6. `response.json()` is async — await it before reading fields.