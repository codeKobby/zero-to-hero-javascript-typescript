# Day 42 hints

Use only when you are stuck — the learning happens in the attempt.

1. Start with one `Post` and render it with `textContent`; add comments as a recursive `Comment` shape only after create, render, and like work.
2. Give recursion a base case and a depth or size limit for hostile data.
3. Keep `posts` as the single source of truth and derive sorted views at render time.
4. Identify posts and comments by stable id, not array index.
5. Validate loaded storage recursively before pushing values into state.