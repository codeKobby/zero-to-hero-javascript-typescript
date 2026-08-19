# Day 11 hints

Use only when you are stuck — the learning happens in the attempt.

1. Array destructuring follows positions. Leave an empty position between commas to skip the middle value: `[first, , last]`.
2. Object renaming has the shape `{ sourceProperty: localVariable }`.
3. Build the new object with spread first, then put `done: true` after it so the later property wins.
4. Mark the property optional with `?`, then give it a default while destructuring.
5. Rest comes last: `[winner, ...others]` or `{ name, ...rest }`.
6. The swap trick: `[a, b] = [b, a]` — the right side builds a new array, the left assigns back.
7. A default fires only on `undefined` — never on a supplied `0` or `''`.