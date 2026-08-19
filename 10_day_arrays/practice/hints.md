# Day 10 hints

Use only when you are stuck — the learning happens in the attempt.

1. The first item is `items[0]`; the last item is `items.at(-1)`.
2. `push` adds to the end and returns the new length. `pop` removes the final item and returns it.
3. Spread inside brackets makes a new top-level array: `const copy = [...items]`.
4. A tuple type lists each position inside square brackets: `type Point = [number, number]`.
5. For `pushIfUnique`, check `items.includes(value)` before pushing.
6. `average` should handle an empty array before dividing.
7. `pop` on an empty array returns `undefined` — that is expected, not an error.