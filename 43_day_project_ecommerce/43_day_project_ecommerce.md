<div align="center">
  <h1>Day 43: Project — E-commerce Product List</h1>
</div>

[<< Day 42](../42_day_project_forum/42_day_project_forum.md) | [Day 44 >>](44_day_project_countries/44_day_project_countries.md)

---

## 🎯 Project Goal

Build an **E-commerce Product List** with advanced filtering, sorting, shopping cart, and TypeScript generics.

---

## Features

1. Display product grid with images, prices, ratings
2. Filter by category, price range, rating
3. Sort by price, rating, name
4. Search by product name
5. Shopping cart with add/remove/update quantity
6. Persist cart in localStorage
7. Responsive grid layout

---

## Data Model

```ts
interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  rating: number
  reviewCount: number
  image: string
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

interface SortOption {
  field: 'price' | 'rating' | 'name'
  direction: 'asc' | 'desc'
}
```

---

## Offline Resources

📁 Create local `data/products.json` with 20+ sample products.

---

## Exercises

### Level 1

Display a product list with filter-by-category.

### Level 2

Add full filtering, sorting, search, and shopping cart with localStorage.

### Level 3

Add product comparison, wishlist, price history tracking.

---

🎉 **Day 43 Complete!**

🎉 **Progress**: 43/45 days complete
