# Day 43 practice reference

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. A second cart-product list duplicates data, so a price change or a cart edit drifts the two lists apart; ids and quantities joined to products stay consistent.
2. `sort` mutates the array it is called on; copying first (`.toSorted`, or spread-then-`sort`) preserves source order when it matters.
3. An interface is erased at compile time; it checks declared structure, never what `JSON.parse` actually returns at runtime.

## Level 2

Start with pure functions: `filterProducts(products, filters)`, `sortProducts(products, sort)`, and `cartTotal(products, cart)`. Test these with small arrays before connecting the DOM. Persist a versioned object such as `{ version: 1, items: [{ productId, quantity }] }`, then reject malformed data on load. The starter demonstrates the smallest safe slice; extend it feature by feature.

```ts
type Filters = { query: string; category: string; minRating: number; inStockOnly: boolean; maxPrice: number }

function filterProducts(products: Product[], filters: Filters): Product[] {
  const normalized = filters.query.trim().toLowerCase()
  return products.filter(product =>
    (!normalized || product.name.toLowerCase().includes(normalized)) &&
    (filters.category === 'all' || product.category === filters.category) &&
    product.rating >= filters.minRating &&
    (!filters.inStockOnly || product.inStock) &&
    product.price <= filters.maxPrice)
}

function sortProducts(products: Product[], sort: 'price' | 'rating'): Product[] {
  const copy = [...products]
  return sort === 'price'
    ? copy.sort((a, b) => a.price - b.price)
    : copy.sort((a, b) => b.rating - a.rating)
}
```

## Level 3

1. Filters as data compose: each control contributes one predicate, and `filterProducts` applies them together, so adding a control never changes the pipeline shape.
2. The version field lets a loader reject stale cart formats; a future format bump is a one-line migration instead of silent corruption.
3. Totals join cart rows to the product array at render time, so the price shown and the price totaled always come from the same source.
4. The acceptance audit confirms filters compose, cart actions persist across refresh, data renders with `textContent`, and the JS and TS pages behave the same with a clean `npm.cmd run check`.

An e-commerce list keeps products immutable, stores the cart as ids and quantities, derives every visible list and total at render time, and renders data with `textContent` so filters compose without synchronization bugs.