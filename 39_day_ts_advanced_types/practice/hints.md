# Day 39 hints

Use only when you are stuck — the learning happens in the attempt.

1. Build advanced types in small steps. Test each resulting type with a valid and invalid example in an editor before composing it.
2. `infer` names a piece the compiler can discover; the false branch of a conditional is often `never`.
3. Mapped types iterate keys at compile time; JavaScript uses `Object.keys`/`entries` at runtime.
4. Template literal types combine string literals at compile time; `Capitalize` helps build `onClick`-style names.
5. Type-level route safety is a compile-time contract; a real application still validates `URL.pathname` at runtime.