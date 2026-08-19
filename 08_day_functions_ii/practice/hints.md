# Day 8 hints

Use only when you are stuck — the learning happens in the attempt.

1. `runTwice` should receive a function value named `action`, then call `action()` on two separate lines.
2. `applyToNumber` returns `operation(number)`.
3. `createGreeting` / `makeAdder` return a new function; that inner function receives the argument.
4. In TypeScript, a callback type looks like `(input: Type) => ReturnType`.
5. Passing a callback means no parentheses: `runTask(washDishes)`, never `runTask(washDishes())`.
6. `chain(value, op1, op2)` = `op2(op1(value))`.
7. A closure keeps the variables of the specific call that created it — each `createCounter()` gets its own `count`.
8. For the score keeper, return an object literal: `{ add, getScore }`, and define both to read/write the closed-over `score`.