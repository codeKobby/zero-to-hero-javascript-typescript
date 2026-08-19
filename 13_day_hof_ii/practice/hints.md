# Day 13 hints

Use only when you are stuck — the learning happens in the attempt.

1. `includes` checks one exact value; it does not receive a callback.
2. `some` returns `true` as soon as one callback result is `true`.
3. `every` returns `false` as soon as one callback result is `false`.
4. `find` returns an item or `undefined`. Handle `undefined` before using a property.
5. `findIndex` returns `-1` for "not found"; check `index >= 0` first.
6. Use `[...values]` before `sort` so the original is unchanged.
7. The comparator returns negative / positive / zero to say which item comes first.