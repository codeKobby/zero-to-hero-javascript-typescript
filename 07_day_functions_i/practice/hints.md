# Day 7 hints

Use only when you are stuck — the learning happens in the attempt.

1. `square` has one parameter and returns that parameter multiplied by itself.
2. `fullName` needs two string parameters; put a space between them in the returned string.
3. A default parameter is written after the ordinary parameters, for example `type = 'animal'`.
4. Add TypeScript types after each parameter name and after the closing parenthesis: `(price: number): number`.
5. A function with no `return` always produces `undefined` — `console.log` prints, it does not return.
6. An arrow with braces needs an explicit `return`; an arrow without braces returns the expression automatically.
7. `lastChar` uses `text[text.length - 1]` because indexes start at zero.
8. Discounted price is `price - (price * percent / 100)`.
9. For the receipt object, return `{ subtotal: subtotal, tax: subtotal * 0.15, total: subtotal * 1.15 }`.