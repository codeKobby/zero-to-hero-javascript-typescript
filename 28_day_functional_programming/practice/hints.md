# Day 28 hints

Use only when you are stuck — the learning happens in the attempt.

1. Use `filter` to return every item except the one to remove.
2. Spread the original object first, then spread `changes` after it.
3. Each function in the pipe receives the previous function's returned string.
4. Generic `T` represents the same object type before and after the immutable update.
5. For `pipe`, every step must accept and return the same type.
6. A shallow copy does not copy nested objects; copy them only when the update actually changes them.