# Day 40 hints

Use only when you are stuck — the learning happens in the attempt.

1. Run `npm.cmd run check` after each strictness change so every fix is verified.
2. Treat external data as `unknown` and narrow it with a guard; prefer that to `any`.
3. Prefer an explicit boundary over a non-null assertion.
4. Keep the effect boundaries visible: domain logic in pure functions, effects at the edges.
5. The compiler proves structure, not runtime values — add a test for the behavior.