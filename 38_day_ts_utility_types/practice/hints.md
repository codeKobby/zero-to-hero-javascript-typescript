# Day 38 hints

Use only when you are stuck — the learning happens in the attempt.

1. Use `Partial` for updates, `Pick` for a smaller public view, `Omit` for removing sensitive fields, and `Record` for a fixed dictionary shape.
2. Utility types change what the compiler permits; they do not clone, freeze, or validate anything at runtime.
3. `Readonly` blocks assignment through the type view only; nested objects still mutate.
4. A type assertion can make an unsafe implementation compile. Prefer a guard or a tested helper.
5. Reimplement each operation in JavaScript with `pick`, `omit`, and `Object.freeze`, and note which guarantees exist only in the editor.