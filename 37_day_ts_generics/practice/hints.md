# Day 37 hints

Use only when you are stuck — the learning happens in the attempt.

1. Use a type parameter when the output should preserve the input type.
2. Add an `extends` constraint only when the implementation needs a known property.
3. `keyof T` limits a key parameter to keys that actually exist on `T`.
4. A generic is useful when a type relationship matters; a plain annotation is clearer when all callers use one fixed type.
5. JavaScript imitates a constraint with a runtime check that throws; TypeScript catches invalid calls while you edit.