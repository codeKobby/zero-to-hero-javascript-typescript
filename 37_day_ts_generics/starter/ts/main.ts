export {}

// Day 37 — TypeScript Generics — Starter

function identity<T>(value: T): T {
  return value
}

console.log(identity<number>(42))
console.log(identity<string>('hello'))

// Generic constraint
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(value: T): void {
  console.log(`Length: ${value.length}`)
}

logLength('hello')
logLength([1, 2, 3])

// Generic interface
interface Repository<T> {
  getAll(): T[]
  getById(id: string): T | undefined
  create(item: T): T
}

interface Product {
  id: string
  name: string
  price: number
}

class ProductRepo implements Repository<Product> {
  private items: Product[] = []

  getAll(): Product[] { return this.items }
  getById(id: string): Product | undefined {
    return this.items.find(p => p.id === id)
  }
  create(item: Product): Product {
    this.items.push(item)
    return item
  }
}

const repo = new ProductRepo()
repo.create({ id: '1', name: 'Widget', price: 25 })
console.log(repo.getAll())

// Keys and repositories
function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key]
}

const product = { id: 'p1', price: 20 }
console.log(getProperty(product, 'price'))

// Try this, read the error, then restore the comment:
// console.log(getProperty(product, 'name'))
