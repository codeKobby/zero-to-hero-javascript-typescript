# Day 20 hints

Use only when you are stuck — the learning happens in the attempt.

1. Validate the amount before comparing it with the private balance. Over-balance is a separate rule.
2. The stored amount is cents. Divide by 100 only inside the formatting getter.
3. Make the custom error extend `Error` and set its name. Then use `instanceof` in `catch`.
4. `owner` should not change after construction, while the balance should be inaccessible outside the class.
5. A daily limit is another guard that can throw a distinct error class before the over-balance check.
6. `Number.isFinite` rejects values like `NaN` and `Infinity` before they reach the private reading.