# Day 29 hints

Use only when you are stuck — the learning happens in the attempt.

1. Start with the current render function and add one form submit path at a time.
2. A todo is valid only when every expected property has the expected runtime type; `null` fails because `typeof null === 'object'`.
3. Use spread and map/filter to return new arrays instead of mutating state in place.
4. Test the empty text, malformed storage, completion toggle, delete, and refresh paths manually.
5. `localStorage.getItem` returns `null` when a key is missing; handle that before calling `JSON.parse`.
6. Route both edit and delete through the delegated click handler with a `data-action` attribute.