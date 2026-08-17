<div align="center">
  <h1>Day 19: Classes & OOP I</h1>
</div>

[<< Day 18](../18_day_error_handling/18_day_error_handling.md) | [Day 20 >>](../20_day_classes_ii/20_day_classes_ii.md)

---

## What You'll Learn

- Create classes with constructors and methods
- Extend classes with inheritance
- Use `super`, `static`, and `instanceof`

---

```js
class Animal {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  speak() { return this.name + ' makes a sound' }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age)
    this.breed = breed
  }
  speak() { return this.name + ' barks!' }
}

const rex = new Dog('Rex', 5, 'Labrador')
rex instanceof Dog     // true
rex instanceof Animal  // true
```

---

## Exercises

### Level 1

1. Create a `Car` class with `make`, `model`, `year`. Add a `getAge()` method.
2. Create `ElectricCar` extending `Car` with `batteryCapacity`.
3. Add a static `compareYears(car1, car2)` method.

### Level 2

1. Create a `BankAccount` with private `#balance` and typed `deposit`/`withdraw`.
2. In TypeScript, define an `IBankAccount` interface.

### Level 3

1. Create a generic `LinkedList<T>` class.

[<< Day 18](../18_day_error_handling/18_day_error_handling.md) | [Day 20 >>](../20_day_classes_ii/20_day_classes_ii.md)

🌕 **Day 19 Complete!**
