# Day 25 hints

Use only when you are stuck — the learning happens in the attempt.

1. Create the `li`, assign `textContent`, then append it to the selected list.
2. Custom data attributes are available through `element.dataset` using camelCase names (`data-priority` becomes `dataset.priority`).
3. `classList.toggle` adds a missing class and removes a present one without touching the other classes.
4. Store the created `li` in a variable; call `remove` on that same reference.
5. For a badge, swap the class and the `data-status` together; the label text never changes.
6. When `createElement` reports a missing property, ask whether you created the element type that owns it.