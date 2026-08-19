# Day 4 hints

Use these only when you are stuck — the learning happens in the attempt.

1. `%` is remainder: `17 % 5` is 2 (5 goes into 17 three times, leaving 2).
2. `**` is power: `2 ** 3` is 8.
3. `===` requires same value *and* same type. `5 === '5'` is `false`; `5 == '5'` is `true` because `==` converts the string to a number first.
4. `0 == false` is `true` and `'' == 0` is `true` — both are `==` conversions. This is why you always use `===`.
5. Empty arrays and empty objects are *truthy*: `Boolean([])` is `true`, `Boolean({})` is `true`.
6. `&&` needs both sides truthy; `||` needs at least one. `!` reverses a boolean.
7. `n += 3` means `n = n + 3`.
8. `8 % 2 === 0` is `true` (even); `7 % 2 === 0` is `false` (odd).
9. In TypeScript, `number | null` needs an `if (value !== null)` check before using the value as a number — that narrowing is the feature.
10. `Boolean(' ')` (a space) is `true` — only the empty string is falsy.
