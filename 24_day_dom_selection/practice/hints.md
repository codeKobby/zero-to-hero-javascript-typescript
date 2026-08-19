# Day 24 hints

Use only when you are stuck — the learning happens in the attempt.

1. `getElementById` returns an element or `null`. Guard before reading `textContent`.
2. `querySelectorAll` returns a `NodeList` with a `length` property.
3. `querySelector` may find a generic `Element`. Use `instanceof HTMLInputElement` before accessing `value`.
4. A required helper should test for `null` and throw an `Error` naming the selector.
5. For a group that must exist, check `.length` and throw when it is `0` — but only when an empty group genuinely means the page is broken.
6. Prefer `data-*` attributes over fragile class names or deep structural paths when you control the HTML.