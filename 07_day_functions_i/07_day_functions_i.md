# Day 7: Functions I — Inputs, Work, and Results

[Day 6 <<](../06_day_loops/06_day_loops.md) | [Day 8 >>](../08_day_functions_ii/08_day_functions_ii.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [The function machine](#the-function-machine)
  - [Define versus call](#define-versus-call)
  - [Parameters and arguments, traced step by step](#parameters-and-arguments-traced-step-by-step)
  - [Return versus console.log](#return-versus-consolelog)
  - [More than one input](#more-than-one-input)
  - [Default parameters](#default-parameters)
  - [Local scope: variables inside stay inside](#local-scope-variables-inside-stay-inside)
  - [Two useful ways to write a function](#two-useful-ways-to-write-a-function)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [The same function, extra checking](#the-same-function-extra-checking)
  - [What TypeScript cannot decide](#what-typescript-cannot-decide)
  - [One compiler error, walked through](#one-compiler-error-walked-through)
- [One-sentence mental model](#one-sentence-mental-model)
- [Practice](#practice)
  - [Level 1 — Mechanical (10-15 min)](#level-1--mechanical-10-15-min)
  - [Level 2 — Applied mini-projects](#level-2--applied-mini-projects)
  - [Level 3 — Creative synthesis](#level-3--creative-synthesis)
- [Finish line](#finish-line)
- [Prove it](#prove-it)

## Why this lesson exists

You can repeat work with loops, but repetition still means rewriting a recipe every time you need it. Real programs need a different kind of reuse: a piece of work with a *name*, a defined *input*, and a *result* — the same recipe run over and over with different values. That is the **function**, and it is the single most used abstraction in JavaScript. Every array method, every DOM event handler, every library call you will meet is a function.

This lesson builds the essential model: what it means to define a function, to call it, to move a value into a parameter and a result back out through `return`. The traps are silent — forgetting `return` turns a function into a black box that hands back `undefined`; forgetting parentheses hands back the recipe instead of the meal. By the end you will trace any call exactly and know which of the two classic mistakes you are making just by reading the output.

## Prerequisites

- Day 3: primitive values.
- Day 6: loops, variables, `const`/`let`.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- define a function declaration and an arrow function;
- call a function with arguments and capture its return value;
- trace an argument into a parameter and a result back out;
- use `return` vs `console.log` deliberately;
- write functions with multiple parameters and default parameters;
- add TypeScript parameter and return types without changing behavior;
- run this course's Day 7 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- the difference between defining and calling;
- why `console.log` inside a function is not the same as returning a value;
- what a local variable is and where it exists;
- when an arrow function's `return` is implicit;
- what TypeScript checks about a function and what it cannot prove.

## The problem this solves

Here is a function that runs perfectly and produces `undefined`:

```js
function calculateTax(price) {
  console.log(price * 0.15)
}

const taxOnBook = calculateTax(20)
console.log(taxOnBook) // undefined
```

The developer used `console.log` where they needed `return`. Nothing errored — the function printed `3` to the terminal, and then assigned `undefined` to the variable that was supposed to hold the tax. Every downstream line silently treats the tax as "not a number."

This is the classic invisible function bug: the code is exactly as written, and the only clue is the output. This lesson gives you a precise model of what a call does — what goes in, what comes out — so you can tell from the result which step broke.

## JS runtime deep dive

### The function machine

Think of a function as a labelled machine with one input slot and one output chute:

```js
function calculateTax(price) {
  return price * 0.15
}
```

```text
calculateTax(20)
       |
       v
price receives 20
       |
       v
price * 0.15 becomes 3
       |
       v
return sends 3 to the caller
```

Names matter:

- **Function name:** `calculateTax`.
- **Parameter:** `price`. A named input slot *in the definition*.
- **Argument:** `20`. The actual value supplied *in a particular call*.
- **Return value:** `3`. The result sent back to the calling code.

### Define versus call

These two lines look similar and do very different things:

```js
calculateTax     // the function itself — do not run it
calculateTax(20) // call the function now
```

You call a function by writing its name followed by parentheses. Forgetting the parentheses is a classic beginner bug: the code does not error, it just assigns a function value where you meant the result.

### Parameters and arguments, traced step by step

```js
function makeGreeting(name) {
  const message = 'Hello, ' + name + '!'
  return message
}

const greeting = makeGreeting('Ada')
console.log(greeting)
```

Trace the call:

| Step | What happens |
| --- | --- |
| 1 | JavaScript reaches `makeGreeting('Ada')`. |
| 2 | The argument `'Ada'` is assigned to the parameter `name`. |
| 3 | The function creates a local variable `message`. |
| 4 | `message` becomes `'Hello, Ada!'`. |
| 5 | `return` sends that text back to the call site. |
| 6 | `greeting` receives the returned text. |
| 7 | `console.log` prints `Hello, Ada!`. |

Call the same function again with another argument:

```js
console.log(makeGreeting('Grace')) // Hello, Grace!
```

The recipe is the same. Only the input changes.

### Return versus console.log

`console.log` shows information to a person. `return` gives a value back to *code*. They are not interchangeable:

```js
function logDouble(number) {
  console.log(number * 2)
}

function getDouble(number) {
  return number * 2
}

const first = logDouble(4)   // prints 8; first receives undefined
const second = getDouble(4)  // second receives 8
```

The rule: **use `return` when another line needs the result.** A function may log for debugging, but a reusable function returns data.

### More than one input

Parameters are positional — order matters:

```js
function calculateTotal(price, quantity) {
  return price * quantity
}

const total = calculateTotal(12, 3)
console.log(total) // 36
```

```text
calculateTotal(12, 3)
                |   |
                v   v
             price quantity
               12     3
```

The first argument goes to the first parameter, the second argument to the second parameter.

### Default parameters

A default value is used only when the caller does not supply that argument (or supplies `undefined`):

```js
function makeGreeting(name, greeting = 'Hello') {
  return greeting + ', ' + name + '!'
}

console.log(makeGreeting('Ada'))             // Hello, Ada!
console.log(makeGreeting('Ada', 'Welcome'))  // Welcome, Ada!
```

Do not treat a default as validation. An empty string `''` is a supplied value, so it does not trigger the default.

### Local scope: variables inside stay inside

Variables created inside a function are local to that function:

```js
function calculateArea(width, height) {
  const area = width * height
  return area
}

console.log(calculateArea(4, 5)) // 20
// console.log(area)             // Error: area only exists inside the function
```

Local variables prevent unrelated parts of a program from accidentally changing each other's work.

### Two useful ways to write a function

Both forms below make a callable function. Use the clearest form for the context.

**Function declaration:**

```js
function add(left, right) {
  return left + right
}
```

**Arrow function:**

```js
const add = (left, right) => {
  return left + right
}

const multiplyByTwo = number => number * 2
```

The short arrow form has an **implicit return**: the expression after the arrow becomes the result. Once you add braces, you must write `return` yourself:

```js
const good = number => number * 2

const alsoGood = number => {
  return number * 2
}

const bug = number => {
  number * 2 // no return; result is undefined
}
```

For now, do not choose based on fashion. Function declarations are readable and useful everywhere. Arrow functions become especially useful in Day 8, when you pass a function into another function.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| Writing the function but never calling it | Definition and call look similar | Add parentheses at the call site |
| Forgetting `return` | Logging looked like returning | Decide whether the caller needs a value |
| Arguments in the wrong order | Parameters are positional | Name parameters clearly and trace the call |
| Using a local variable outside the function | Scope is not visible yet | `return` the value instead |
| Braces with an arrow but no `return` | Implicit return works only without braces | Add `return` |
| Forgetting parentheses when calling | `calculateTax` ≠ `calculateTax(20)` | Call with parentheses when you want the result |

## The TypeScript layer

### The same function, extra checking

```js
function calculateTotal(price, quantity) {
  return price * quantity
}

console.log(calculateTotal(12, 3)) // 36
```

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

console.log(calculateTotal(12, 3)) // 36
```

The annotations say:

- `price` must be a number;
- `quantity` must be a number;
- this function returns a number.

That lets TypeScript catch a mismatch before you run the code:

```ts
// calculateTotal('12', 3)
// Error: a string cannot be used where a number is required.
```

The runtime behavior is identical in both files — the annotations exist for the compiler and the editor, not for the runtime.

### What TypeScript cannot decide

Types check value *shapes*, not business rules. TypeScript cannot tell you whether 15 percent is the correct tax rate for your shop, or whether `price * quantity` is the right formula:

```ts
function calculateTotal(price: number, quantity: number): number {
  return price * quantity // correct math? TypeScript cannot say
}
```

| Question | JavaScript | TypeScript |
| --- | --- | --- |
| Does the function run? | Yes | Yes, after conversion to JavaScript |
| Can it reject a string where a number is expected before running? | No | Yes |
| Can it prove the formula is logically correct? | No | No |
| Does it change the function's runtime result? | No | No |

### One compiler error, walked through

Open `07_day_functions_i/starter/ts/main.ts`. The starter defines `calculateTotal(price: number, quantity: number): number`. The last line is commented out and deliberately broken:

```ts
calculateTotal('12', 3)
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

Read it as: *"`calculateTotal` promised to accept numbers — `'12'` is a string."* The fix is not to widen the parameter so strings fit; the fix is that the *argument* was wrong. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

Define a function once, call it with arguments, let parameters receive those values, and use `return` to send a result back — and TypeScript checks that every argument and every result matches the shapes you declared.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the value each variable receives, before running.

1. `function square(n) { return n * n }` — what does `square(4)` produce?
2. `function noReturn(n) { const x = n + 1 }` — what does `noReturn(5)` produce, and why?
3. `function fullName(first, last) { return first + ' ' + last }` — what does `fullName('Ada', 'Lovelace')` produce?
4. `function add(a, b, c) { return a + b + c }` — what does `add(1, 2, 3)` produce?
5. What does `console.log(add)` print — a value or the function itself?
6. `const double = n => n * 2` — what does `double(7)` produce?
7. `const triple = n => { n * 3 }` — what does `triple(7)` produce, and why?
8. `function greet(name = 'friend') { return 'Hi, ' + name }` — what do `greet()` and `greet('Ada')` produce?
9. For `function area(w, h) { return w * h }`, which parameter receives which value in `area(3, 4)`?
10. Run `npm.cmd run day7:js` and `npm.cmd run day7`; then `npm.cmd run check` and confirm it passes.

### Level 2 — Applied mini-projects

1. Write `square(number)` that returns the number squared. Test `square(4)`; expected 16.
2. Write `fullName(firstName, lastName)` that returns one string with a space between. Call it twice.
3. Write `describePet(name, type = 'animal')` that returns `'NAME is a TYPE'`. Call it with and without the second argument.
4. Write `calculateDiscount(price, percent)` that returns the discounted price. Test with `(80, 25)`; expected 60.
5. Write `lastChar(text)` that returns the final character of a string. Test `lastChar('Ada')`; expected `'a'`. (Hint: `text[text.length - 1]`.)
6. Convert `calculateDiscount` to an arrow function and confirm the same result.

### Level 3 — Creative synthesis

1. A receipt: write `calculateReceipt(subtotal)` that returns an object `{ subtotal, tax, total }` where `tax` is 15% of the subtotal. (Objects arrive in Day 9 — the syntax is `{ key: value }`.)
2. A temperature converter: write `toCelsius(fahrenheit)` and `toFahrenheit(celsius)` using the real formulas. Then write `describeTemperature(celsius)` that returns `'cold'`, `'warm'`, or `'hot'` using the Day 5 rules.
3. A validator with a default: write `createMessage(name, greeting = 'Hello')` that returns a message, then in a comment explain what happens if a caller passes `''` as the greeting and why the default does not apply.
4. The scope story: write a function with a local variable, call it, then in a comment predict what happens if you try to `console.log` that local variable outside the function — then prove it with a commented-out line.
5. The `undefined` hunt: write three short functions, one of which returns `undefined` on purpose (no `return`), and in a comment explain how you would spot the mistake from the caller's output — using the Day 7 model, not trial and error.

## Finish line

Day 7 is complete when you can do all of these **without notes**:

1. Tell the difference between defining a function and calling it.
2. Trace an argument into a parameter and a returned value back out.
3. Choose between `console.log` and `return` and explain why.
4. Explain local scope in one sentence.
5. Write both a function declaration and an arrow function.
6. Say when an arrow's `return` is implicit.
7. Add TypeScript parameter and return types without changing runtime behavior.

If any answer is a guess, revisit the matching section before Day 8.

## Prove it

Write, in your own words, a short answer to each:

1. What is the difference between a parameter and an argument?
2. Why does `logDouble` return `undefined` while `getDouble` returns a number?
3. Where does a local variable exist, and why does that matter?
4. When is an arrow function's return implicit, and what happens if you add braces?
5. What does `calculateTotal('12', 3)` produce in JavaScript, and why does TypeScript reject it?
6. What can TypeScript check about a function, and what can it never decide?

Your answers are today's evidence. If you can write them, move to [Day 8: Functions II — Function Values, Callbacks, and Closures](../08_day_functions_ii/08_day_functions_ii.md).

**Day 7 complete.** Functions are now exact: you can define a recipe, call it with inputs, receive a result, and know precisely what TypeScript checks about the contract.