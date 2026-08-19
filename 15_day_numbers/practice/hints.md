# Day 15 hints

Use only when you are stuck — the learning happens in the attempt.

1. `readPercentage`: start with the same trim, `Number`, and `Number.isFinite` checks as `readQuantity`. Add a range check before returning.
2. `formatCents`: a cents value of `1234` represents `12.34`. Divide by 100 before passing the number to `toLocaleString`.
3. The range has `maximum - minimum + 1` possible whole numbers. Validate the argument order before generating a result.
4. `randomInteger`: `Math.floor(Math.random() * count) + minimum`.
5. For money math, every step stays in integer cents; convert to a decimal number only when formatting.
6. A parse function has an uncertain result, so its return type should include `null`.