# Day 3 hints

Use these only when you are stuck — the learning happens in the attempt.

1. A symbol is created with `Symbol('description')`; the description is only for humans. A bigint needs an `n` suffix: `10n`.
2. `typeof null` returns `"object"` — a historic bug. To test for null, compare directly: `value === null`.
3. To test for an array, use `Array.isArray(value)`, never `typeof`.
4. `'5' + 5` is `'55'` because `+` joins when either side is a string. Use `Number('5') + 5` for arithmetic.
5. `NaN === NaN` is `false`. Use `Number.isNaN(value)` instead.
6. Assigning one array to another shares the same array; both names see the same changes. Use `[...list]` to copy.
7. In TypeScript, `let x: string | null = null` forces you to check `x !== null` before using string methods like `.toUpperCase()`.
8. A `let` variable with no initial value is `undefined` until you assign to it.
