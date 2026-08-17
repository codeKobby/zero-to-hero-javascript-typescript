export {}

// Day 19: Classes & OOP I
class Animal {
  constructor(
    public name: string,
    public age: number
  ) {}

  speak(): string {
    return `${this.name} makes a sound`
  }

  toString(): string {
    return `${this.name} (age ${this.age})`
  }
}

class Dog extends Animal {
  constructor(
    name: string,
    age: number,
    public breed: string
  ) {
    super(name, age)
  }

  speak(): string {
    return `${this.name} barks!`
  }

  fetch(item: string): string {
    return `${this.name} fetches the ${item}`
  }
}

const rex = new Dog('Rex', 5, 'German Shepherd')
console.log(rex.toString())
console.log(rex.speak())
console.log(rex.fetch('ball'))
console.log(rex instanceof Animal)  // true
console.log(rex instanceof Dog)     // true

// Static methods
class MathHelper {
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

console.log(MathHelper.clamp(150, 0, 100))
console.log(MathHelper.random(1, 6))
