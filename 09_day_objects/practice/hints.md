# Day 9 hints

Use only when you are stuck — the learning happens in the attempt.

1. Bracket notation takes a variable: `movie[key]`. A dot looks for a literal key named `key`.
2. `const` blocks reassignment of the variable, not changes inside the object.
3. Copy first: `const copy = { ...movie, watched: true }`.
4. A method starts with `describe() {` and reads data with `this.title` inside.
5. An interface lists `propertyName: PropertyType` lines, e.g. `year: number`.
6. `this` is whatever object stood before the dot at the call site.
7. For `createTodo`, return `{ id, text, done, toggle }` where `toggle()` flips `done` via `this`.
8. For `checkout`, return a new object: `{ ...cart, total }` so the original is untouched.