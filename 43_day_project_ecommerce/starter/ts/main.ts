export {}

// Day 43 — Project: E-commerce — TypeScript Starter

interface Product {
  id: string
  name: string
  price: number
  category: string
  rating: number
  inStock: boolean
}

interface CartItem {
  product: Product
  quantity: number
}

interface FilterState {
  search: string
  category: string | null
  priceRange: [number, number]
  minRating: number
  inStockOnly: boolean
}

const cart: CartItem[] = []

function addToCart(product: Product): void {
  const existing = cart.find(item => item.product.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ product, quantity: 1 })
  }
}

function getCartTotal(): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

console.log('E-commerce — TypeScript Starter ready!')
