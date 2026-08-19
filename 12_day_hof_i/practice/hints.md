# Day 12 hints

Use only when you are stuck — the learning happens in the attempt.

1. `map` returns one output per input. Write the expression that should become each new value.
2. `filter` needs a true-or-false test. Do not return the item itself unless that is clearly intentional.
3. `reduce` starts with its second argument (the initial value). Return the next running total from the callback.
4. `forEach` is for actions — it returns `undefined`, not an array.
5. A chain reads left to right: `scores.filter(...).map(...)` filters first, then maps the survivors.
6. `myMap` needs an empty result array, a `for...of` loop, and `result.push(transform(item))`.
7. Building a sentence with `reduce` needs initial value `''`; think about when the separator should appear.