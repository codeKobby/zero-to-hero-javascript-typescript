# Day 44 practice hints

Use only when you are stuck — the learning happens in the attempt.

1. Treat the dataset as untrusted input: validate required fields before rendering.
2. Compose search, region, and sort as pure functions; test each with three countries.
3. A `Map<string, number>` is a natural accumulator for language counts.
4. Render text with `textContent`, not a string built from country data in `innerHTML`.
5. Statistics follow the filtered set; sort a copy, never the source array.

Use `solutions.md` only after you have a working first pass.