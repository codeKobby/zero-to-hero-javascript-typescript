<div align="center">
  <h1>Day 9: Objects & Interfaces</h1>
</div>

[<< Day 8](../08_day_functions_ii/08_day_functions_ii.md) | [Day 10 >>](../10_day_arrays/10_day_arrays.md)

---

## What You'll Learn

- Create and access objects
- Getters and setters
- TypeScript interfaces

---

## Object Basics

```js
const person = { name: 'Alice', age: 25 }

// Access:
console.log(person.name)     // dot notation
console.log(person['age'])   // bracket notation

// Add:
person.email = 'alice@test.com'
```

## Getters and Setters

```js
const bankAccount = {
  _balance: 0,

  get balance() {
    return '$' + this._balance.toFixed(2)
  },

  set balance(amount) {
    if (amount < 0) throw new Error('Negative balance')
    this._balance = amount
  }
}

bankAccount.balance = 100
console.log(bankAccount.balance)  // '$100.00'
```

## TypeScript Interfaces

An interface defines the **shape** of an object:

```ts
interface User {
  id: number
  name: string
  email?: string     // optional
  readonly id: number  // can't change
}

const user: User = { id: 1, name: 'Alice' }
```

---

## Exercises

### Level 1

1. Create an object `book` with `title`, `author`, `year`.
2. Add a method `describe()` that returns `"Title by Author (Year)"`.
3. Use a getter for `description`.

### Level 2

1. In TypeScript, define an interface for `Product` and create an instance.
2. Add a getter/setter pair with validation.

### Level 3

1. Create a `BankAccount` class with private `#balance` and typed getters/setters.

<details>
<summary>🔍 View Solutions</summary>

```ts
interface Product {
  id: number
  name: string
  price: number
}

const widget: Product = { id: 1, name: 'Widget', price: 25 }
```
</details>

---

[<< Day 8](../08_day_functions_ii/08_day_functions_ii.md) | [Day 10 >>](../10_day_arrays/10_day_arrays.md)

🌕 **Day 9 Complete!**
