// Day 3 — JavaScript Starter: Data Types & Type Guards
const itemLabel = 'Widget'
const itemCount = 42
const itemInStock = true

const prices = [10, 20, 30, 40, 50]
const tags = ['sale', 'new', 'popular']

const widget = { id: 1, name: 'Widget', price: 25 }

// Nullish coalescing
const displayName = null
console.log(displayName ?? 'Guest')

// Optional chaining
console.log(widget?.name ?? 'Unknown')

// Type guard
function printType(value) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())
  } else {
    console.log(value.toFixed(2))
  }
}

printType('hello')
printType(3.14159)
