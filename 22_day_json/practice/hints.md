# Day 22 hints

Use only when you are stuck — the learning happens in the attempt.

1. `JSON.parse` belongs in `try/catch`. Use one object shape for success and another for failure.
2. Check object and non-null before checking properties. Use `typeof` for each expected primitive property.
3. Return a new object containing only the intended public fields.
4. The return type has the shape `value is Product`. The check inside must be real JavaScript validation.
5. `Array.isArray` first, then `.every(isLearner)`.
6. A guard at the storage boundary means invalid stored data resolves to safe defaults instead of crashing the app.