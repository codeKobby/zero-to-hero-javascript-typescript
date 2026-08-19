# Day 6 hints

Use only when you are stuck — the learning happens in the attempt.

1. A counting `for` loop needs a start, a condition that stays true for the last number, and a change of one.
2. In `for...of`, the variable after `const` is already the current array item — no index needed.
3. In a `while` loop, name the line that changes the counter before you run it.
4. Start a passing counter at 0. Add one only inside an `if` whose condition is `value >= 10`.
5. `break` exits the whole loop; `continue` skips only this round and moves to the next.
6. The last valid array index is `length - 1`, so use `< length`, never `<= length`.
7. To find the first item that matches, check the condition with `if` and use `break` inside it.
8. `score / scores.length` is a decimal; use `.toFixed(1)` when printing an average.
9. To skip evens, `continue` when `number % 2 === 0`.
10. TypeScript catches using the wrong *kind* of value (a string in a `number[]`); it never catches a wrong condition or a missing change line — you trace for those.