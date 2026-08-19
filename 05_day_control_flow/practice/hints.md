# Day 5 hints

Use these only when you are stuck — the learning happens in the attempt.

1. In one `if` / `else if` / `else` chain, only the first true branch runs — after it matches, the rest are skipped.
2. Put the most specific condition first. Broad conditions before specific ones make the specific branch dead code.
3. A ternary is `condition ? valueIfTrue : valueIfFalse`. Use it only when both choices are short values.
4. Every `switch` case needs `break` after its work, unless it is deliberately sharing a body with the next case.
5. `switch` compares with strict equality (`===`) against named cases — it cannot do ranges like `score >= 80`. Use `if` for ranges.
6. `if (isLoggedIn)` is enough; never write `if (isLoggedIn === true)`.
7. `'0'` is a non-empty string, so it is truthy.
8. In TypeScript, a literal union lists exact values: `type Plan = 'free' | 'pro'`. Assigning anything else is a compile error.
9. TypeScript narrows types inside branches: after `if (plan === null) return`, TypeScript knows `plan` is a `Plan`.
