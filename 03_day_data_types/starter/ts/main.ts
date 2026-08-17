export {}

// Day 3: Data Types & Type Guards
const itemLabel: string = 'Widget'
const itemCount: number = 42
const itemInStock: boolean = true

const prices: number[] = [10, 20, 30, 40, 50]
const tags: string[] = ['sale', 'new', 'popular']

interface Product {
  id: number
  name: string
  price: number
}

const widget: Product = { id: 1, name: 'Widget', price: 25 }

// Nullish coalescing
const displayName: string | null = null
console.log(displayName ?? 'Guest')

// Optional chaining
console.log(widget?.name ?? 'Unknown')

// Type guard
function printType(value: string | number): void {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())
  } else {
    console.log(value.toFixed(2))
  }
}

printType('hello')
printType(3.14159)
