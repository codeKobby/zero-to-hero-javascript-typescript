export {}

// Day 20: Classes II — Private Fields, Getters/Setters, Abstract
interface IShape {
  area(): number
  perimeter(): number
}

abstract class Shape implements IShape {
  constructor(public readonly color: string) {}
  abstract area(): number
  abstract perimeter(): number

  describe(): string {
    return `${this.color} shape — area: ${this.area().toFixed(2)}`
  }
}

class CircleShape extends Shape {
  constructor(
    color: string,
    public readonly radius: number
  ) {
    super(color)
  }

  area(): number {
    return Math.PI * this.radius ** 2
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius
  }
}

class RectShape extends Shape {
  constructor(
    color: string,
    public readonly width: number,
    public readonly height: number
  ) {
    super(color)
  }

  area(): number {
    return this.width * this.height
  }

  perimeter(): number {
    return 2 * (this.width + this.height)
  }
}

const shapes: Shape[] = [
  new CircleShape('red', 5),
  new RectShape('blue', 3, 4)
]

shapes.forEach(s => console.log(s.describe()))

// Stack with generics
class Stack<T> {
  private items: T[] = []

  push(item: T): void { this.items.push(item) }
  pop(): T | undefined { return this.items.pop() }
  peek(): T | undefined { return this.items[this.items.length - 1] }
  get size(): number { return this.items.length }
}

const numberStack = new Stack<number>()
numberStack.push(10)
numberStack.push(20)
console.log(`Stack size: ${numberStack.size}, top: ${numberStack.peek()}`)
