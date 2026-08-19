# Day 9: Objects — Related Data and Methods

[Day 8 <<](../08_day_functions_ii/08_day_functions_ii.md) | [Day 10 >>](../10_day_arrays/10_day_arrays.md)

## Table of Contents

- [Why this lesson exists](#why-this-lesson-exists)
- [Prerequisites](#prerequisites)
- [What you'll be able to explain and do](#what-youll-be-able-to-explain-and-do)
- [The problem this solves](#the-problem-this-solves)
- [JS runtime deep dive](#js-runtime-deep-dive)
  - [An object keeps related facts together](#an-object-keeps-related-facts-together)
  - [Read with dot or bracket notation](#read-with-dot-or-bracket-notation)
  - [Add and update properties](#add-and-update-properties)
  - [A const object can still change](#a-const-object-can-still-change)
  - [Copy before changing when the original matters](#copy-before-changing-when-the-original-matters)
  - [Methods: a property whose value is a function](#methods-a-property-whose-value-is-a-function)
  - [The this connection, traced](#the-this-connection-traced)
  - [Getters: computed reads](#getters-computed-reads)
  - [Common mistakes table](#common-mistakes-table)
- [The TypeScript layer](#the-typescript-layer)
  - [An interface describes the object's shape](#an-interface-describes-the-objects-shape)
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

So far every variable holds one value: one number, one string, one function. Real data is not one value — a book has a title, an author, a year. An **object** groups those related values under one name, so you can move one book around instead of three loose strings. Objects are also the shape behind the scenes: arrays, functions, and most of what you call "a value" in JavaScript is object-like under the surface.

Objects have two classic silent traps. First, `const` does **not** freeze an object — `const` only stops reassignment, so you can accidentally edit shared data. Second, methods use `this`, and `this` is decided by *how you call* the method, not where you wrote it — pulling a method off an object breaks its connection. This lesson gives you a precise model of both.

## Prerequisites

- Day 3: primitive values (object is a distinct value type).
- Day 7: functions, parameters, `return`.
- Day 8: function values.

## What you'll be able to explain and do

By the end of this lesson you will be able to **do**:

- create an object literal and read properties with dot and bracket notation;
- add and update properties;
- copy an object before changing it, keeping the original intact;
- write methods that use `this` correctly;
- define a TypeScript interface and type an object against it;
- run this course's Day 9 JavaScript and TypeScript starters and the type check.

And you will be able to **explain**:

- when bracket notation is required;
- why `const` does not prevent an object's property from changing;
- what the spread operator creates;
- what object `this` refers to inside a method call;
- the difference between a TypeScript interface and a runtime object.

## The problem this solves

You could describe a book with three separate variables:

```js
let bookTitle = 'Dune'
let bookAuthor = 'Frank Herbert'
let bookYear = 1965
```

That works until you need a list of books, or a function that takes a book. Three values means three parameters, and nothing keeps them together — `bookYear` and `bookAuthor` can get mixed up. Worse, the only "fix" people reach for is more variables: `book2Title`, `book2Author`...

The object fixes this by making **one value** that holds related facts:

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965
}
```

Now one book can be passed to a function, stored in an array, or returned from a function. Objects are how real programs represent the entities they work with — a user, an order, a score — as single values with structure.

## JS runtime deep dive

### An object keeps related facts together

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965
}
```

The braces create one object. Inside, each line is a **property**: a **key** (the name) and a **value**. The value can be any value type — a number, a string, a boolean, a function, or even another object.

Think of the object as a labelled box with slots:

```text
book
  title  -> 'Dune'
  author -> 'Frank Herbert'
  year   -> 1965
```

### Read with dot or bracket notation

Use **dot notation** for a property name you know:

```js
console.log(book.title) // Dune
console.log(book.year)  // 1965
```

Use **bracket notation** when the property name is held in a variable:

```js
const propertyName = 'author'
console.log(book[propertyName]) // Frank Herbert
```

The expression inside the brackets must produce a string. This is a classic difference:

```js
console.log(book[propertyName]) // Frank Herbert  (uses the variable)
console.log(book.propertyName)  // undefined      (looks for a key literally named 'propertyName')
```

Rule: if the property name is *dynamic* (from a variable or an expression), use brackets. If it is a *literal* name you typed, use a dot.

### Add and update properties

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965
}

book.pages = 412      // add a new property
book.year = 1966      // update an existing property

console.log(book.pages) // 412
console.log(book.year)  // 1966
```

There is no "lock" on the object — you can add keys and overwrite values freely.

### A const object can still change

```js
const book = { title: 'Dune' }

book.title = 'Foundation'   // works: changes the object's property
// book = { title: 'Other' } // Error: const forbids reassigning the variable
```

`const` prevents *reassigning the variable* — pointing `book` at a different object. It does **not** prevent *mutating the object* — changing a property inside the object the variable already points to. The two lines above behave differently on purpose.

### Copy before changing when the original matters

Because objects are shared, mutating a copy can accidentally mutate the original. Copy first when the original still matters:

```js
const originalBook = {
  title: 'Dune',
  isAvailable: true
}

const checkedOutBook = {
  ...originalBook,      // spread: copy top-level properties into a new object
  isAvailable: false    // then override the copied value
}

console.log(originalBook.isAvailable)   // true  (original untouched)
console.log(checkedOutBook.isAvailable) // false
```

The spread operator creates a **new** object. `originalBook` and `checkedOutBook` are separate objects. This is a **shallow** copy: nested objects are shared, not duplicated — you will meet nested copying again in later days.

### Methods: a property whose value is a function

A **method** is a property whose value is a function:

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  describe() {
    return this.title + ' by ' + this.author
  }
}

console.log(book.describe()) // Dune by Frank Herbert
```

`describe()` is called through the object, and inside it `this` refers to that object. Method syntax is the clean way to write it — the same as `describe: function () { ... }`.

### The this connection, traced

`this` is not fixed when you write the object. It is decided **when the method runs**, by how you call it:

| Expression | `this` inside `describe` |
| --- | --- |
| `book.describe()` | `book` |
| `const describe = book.describe; describe()` | `undefined` (in module/strict code) |

The second form copied the function out of the object and called it alone — the object connection is lost, so `this` is gone. This is why methods that need `this` use method syntax or a regular function:

```js
const wrongBook = {
  title: 'Dune',
  describe: () => this.title // arrow: no own this, captures the surrounding scope
}
```

An arrow function does not create its own `this`. It captures the `this` of where it was *written*, not the object it lives in. For methods that read the object's data, use method syntax.

### Getters: computed reads

A **getter** runs code when you read a property:

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  get description() {
    return this.title + ' by ' + this.author
  }
}

console.log(book.description) // Dune by Frank Herbert
```

`description` is read like a property — no parentheses — but its value is computed on read. Use getters sparingly; a plain method is often clearer for non-trivial work.

### Common mistakes table

| Mistake | Why it happens | The fix |
| --- | --- | --- |
| `object.key` when `key` is a variable | Dot requires a literal name | Use `object[key]` |
| Expecting `const` to freeze properties | `const` only blocks reassignment | Copy before mutating if the original matters |
| Mutating a shared object accidentally | Two names point to the same object | Spread into a new object first |
| Arrow method expecting `this` | Arrows capture outer `this` | Use method syntax |
| Copying nested objects with spread only | Spread is shallow | Copy nested objects explicitly when needed |
| Forgetting the object connection when extracting a method | `this` is set by the call site | Call through the object: `book.describe()` |

## The TypeScript layer

### An interface describes the object's shape

```js
const book = {
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965
}
```

JavaScript will accept `book.year = '1965'` without complaint — the object just stores whatever you put in.

```ts
interface Book {
  readonly id: number
  title: string
  author: string
  year: number
  genre?: string
}

const book: Book = {
  id: 1,
  title: 'Dune',
  author: 'Frank Herbert',
  year: 1965
}
```

The interface lists the property names and their types:

- `title: string` — the property must exist and hold a string;
- `readonly id: number` — the property cannot be reassigned through a `Book` reference;
- `genre?: string` — the property is optional; it may be absent.

TypeScript then catches shape errors before the program runs:

```ts
// book.year = '1965'
// Error: year must be a number.

// book.id = 2
// Error: id is readonly.
```

The interface exists only for the compiler and the editor. It creates **no** object at runtime — the runtime value is still an ordinary JavaScript object.

### What TypeScript cannot decide

Types describe the shape your code intends. They cannot protect you from data that arrives from an untrusted place — an API response or a text file — which could be missing properties or hold strings where you expect numbers. Validate outside data at runtime:

```ts
interface IncomingUser {
  name: string
  age: number
}

// data from a network request: TypeScript cannot prove it matches IncomingUser
// const user: IncomingUser = JSON.parse(response)
```

| Question | JavaScript | TypeScript |
| --- | --- | --- |
| Does an object exist at runtime? | Yes | Yes (same object) |
| Can it reject `book.year = '1965'` before running? | No | Yes |
| Can it prove data from an API matches the shape? | No | No |
| Does an interface create a runtime object? | — | No |

### One compiler error, walked through

Open `09_day_objects/starter/ts/main.ts`. The starter defines a `Book` interface with `readonly id`. The last line is commented out and deliberately broken:

```ts
originalBook.id = 2
```

Uncomment it and run the type check:

```powershell
npm.cmd run check
```

TypeScript reports the line and the reason:

```
Cannot assign to 'id' because it is a read-only property.
```

Read it as: *"`Book.id` is declared `readonly`, so assigning to it through a `Book` reference is rejected before the program runs."* The fix is not to remove `readonly`; the fix is that the code was changing a value that was declared fixed. Comment the broken line back out when done so the starter keeps passing `npm run check`.

## One-sentence mental model

An object groups related facts as named properties; read literal names with a dot and dynamic names with brackets, copy before mutating shared objects, and remember that `this` inside a method is whatever object stood before the dot — while TypeScript checks the object's shape, not the trustworthiness of outside data.

## Practice

Attempt the exercises before opening [hints](practice/hints.md) or [solutions](practice/solutions.md).

### Level 1 — Mechanical (10-15 min)

For each snippet, write down the exact output before running.

1. `const book = { title: 'Dune', author: 'Frank Herbert' }` — what does `book.title` produce?
2. `const key = 'author'` — what do `book[key]` and `book.key` produce, and why are they different?
3. `book.pages = 412` on a `const` book — does this work? Why?
4. `book = { title: 'Other' }` on a `const` book — does this work? Why?
5. What do the two objects in `const copy = { ...original, isAvailable: false }` print for `original.isAvailable` and `copy.isAvailable`?
6. In `book.describe()`, what does `this` refer to? What happens if you extract the method and call it alone?
7. What does an arrow method capture for `this`, and why is that a problem for methods that need the object?
8. `const movie = { title: 'Arrival' }` then `movie.title` — what is stored in `movie.title` after assignment?
9. What does `book.description` produce when `description` is a getter, and why is there no `()`?
10. Run `npm.cmd run day9:js` and `npm.cmd run day9`; then `npm.cmd run check` and confirm it passes.

**LeetCode:** 242 Valid Anagram — https://leetcode.com/problems/valid-anagram/ (hint: https://neetcode.io/problems/is-anagram/question)

### Level 2 — Applied mini-projects

1. Create a `movie` object with `title`, `director`, and `year`.
2. Read one property with dot notation and one through a dynamic key (a variable holding the property name).
3. Add a `watched` property **without changing the original** — copy first, then set `watched: true` on the copy.
4. Add a `describe()` method that uses `this` to return `'TITLE by DIRECTOR'`.
5. Define a `Movie` interface in the TS starter matching your object, then intentionally give `year` a string value and read the error.

### Level 3 — Creative synthesis

1. A to-do item: build `createTodo(text)` that returns `{ id, text, done }` where `id` increments each call (closure from Day 8) and `done` starts `false`. Add a `toggle()` method that flips `done` and returns the updated item.
2. A product display: build a `product` object with `name`, `price`, and a `describe()` method; then write `formatPrice(product)` that reads `product.price` with dot notation and returns it as a string with a currency symbol.
3. The checkout queue: write `checkout(cart)` that returns a **new** cart with `total` added, using spread to avoid mutating the original — and in a comment explain what would have happened without the spread.
4. The key swap: write code that reads a property whose name is stored in a variable `key`, then in a comment predict what `object.key` would do instead and why.
5. The this-mystery: write an object with a method that uses `this`, call it correctly, then in a comment write the line that extracts the method and breaks the connection — and explain the output change using the call-site rule from this lesson.

## Finish line

Day 9 is complete when you can do all of these **without notes**:

1. Read a property with dot and with bracket notation, and say when each is required.
2. Explain why `const` does not freeze an object's properties.
3. Copy an object with spread before changing it.
4. Write a method that uses `this` through the object.
5. Define a TypeScript interface and catch a shape error before running.
6. Say what happens if you extract a method and call it alone.

If any answer is a guess, revisit the matching section before Day 10.

## Prove it

Write, in your own words, a short answer to each:

1. When is bracket notation required, and what happens if you use a dot in that situation?
2. Why can a `const` object's property change?
3. What does `...originalBook` create, and why does the original stay intact?
4. What object becomes `this` in `book.describe()`? What happens when the method is extracted and called alone?
5. What is the difference between a TypeScript interface and a JavaScript object?
6. What can TypeScript check about an object, and what can it never prove about outside data?

Your answers are today's evidence. If you can write them, move to [Day 10: Arrays — Ordered Data and Array Methods](../10_day_arrays/10_day_arrays.md).

**Day 9 complete.** Objects are now exact: you can group related facts, read them with the right notation, copy before mutating, and keep methods connected to their object — with TypeScript checking the whole shape.