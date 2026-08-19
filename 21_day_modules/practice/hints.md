# Day 21 hints

Use only when you are stuck — the learning happens in the attempt.

1. Put `export` directly before each public function declaration.
2. Import named exports with braces and a relative path beginning with `./`.
3. Omit `export` from the helper declaration. Attempting to import it should be a module error.
4. Types can be exported with `export type`. Functions can use the imported type in their parameter annotation.
5. `slugify` can chain `toLowerCase`, `trim`, and `replace`.
6. A frozen exported object still blocks reassignment of the whole object; prefer a function when callers may need a fresh copy.