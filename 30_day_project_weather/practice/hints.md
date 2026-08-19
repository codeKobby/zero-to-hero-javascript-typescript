# Day 30 hints

Use only when you are stuck — the learning happens in the attempt.

1. Start with a static records array and return a matching record from a Promise.
2. Set status to loading before awaiting the API function. Set success or error in separate paths.
3. Validate a parsed favorites value as an array of strings before assigning it.
4. Keep rendering responsible for DOM only; keep searching and persistence in separate functions.
5. `state.current` is `Weather | null`; read its fields only after a null check.
6. For retry, remember the last failed query and re-run the same search function.