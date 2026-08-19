# Day 41 hints

Use only when you are stuck — the learning happens in the attempt.

1. Validate form input before creating a `Recipe`; trim and filter ingredient items deliberately.
2. Keep filtering pure and render with `textContent`.
3. Validate storage before pushing values into state; do not trust `JSON.parse` output shape.
4. Handle delete and edit through one delegated listener.
5. Keep the stored list as the single source of truth and derive search from it.