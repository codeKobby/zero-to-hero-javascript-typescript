<div align="center">
  <h1>Day 20: Classes II — Private Fields, Abstract, Getters/Setters</h1>
</div>

[<< Day 19](../19_day_classes_i/19_day_classes_i.md) | [Day 21 >>](../21_day_modules/21_day_modules.md)

---

## What You'll Learn

- Private fields with `#`
- Getters and setters with validation
- Abstract classes in TypeScript

---

## Private Fields (ES2019+)

```js
class BankAccount {
  #balance = 0

  get balance() { return this.#balance }

  deposit(amount) {
    if (amount <= 0) throw new Error('Must be positive')
    this.#balance += amount
  }
}

const acc = new BankAccount()
acc.deposit(100)
console.log(acc.balance)   // 100
// acc.#balance             // ❌ Private!
```

## TypeScript: Abstract Classes

```ts
abstract class Shape {
  abstract area(): number

  describe(): string {
    return `Area: ${this.area().toFixed(2)}`
  }
}

class Circle extends Shape {
  constructor(public radius: number) { super() }
  area(): number { return Math.PI * this.radius ** 2 }
}

// const s = new Shape()  // ❌ Can't instantiate abstract class
const c = new Circle(5)
console.log(c.describe())
```

---

## Exercises

### Level 1

1. Create a class with `#secret` and getter/setter that validates 8+ characters.
2. Create a `fullName` getter combining `firstName` and `lastName`.
3. In TypeScript, create a generic `Pair<T, U>` class.

### Level 2

1. Create an abstract `Vehicle` with abstract `start()` and `stop()`.
2. Implement a `Singleton` pattern.

### Level 3

1. Build an `EventEmitter` class with `on`, `emit`, `off`.

[<< Day 19](../19_day_classes_i/19_day_classes_i.md) | [Day 21 >>](../21_day_modules/21_day_modules.md)

🌕 **Day 20 Complete!** Certificate: JavaScript Core unlocked!
