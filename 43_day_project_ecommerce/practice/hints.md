# Day 43 practice hints

Use only when you are stuck — the learning happens in the attempt.

1. Keep filters as data. Derive the visible list from `products` and the current filter state.
2. Store only `{ productId, quantity }` in the cart. Join cart rows to products when rendering totals.
3. Use event delegation on the product container so newly rendered buttons work automatically.
4. In TypeScript, model the filter as a small interface and validate localStorage data at runtime.
5. Copy the product array before sorting so source order is never lost.

The reference approach is in `solutions.md`; open it only after attempting the work.