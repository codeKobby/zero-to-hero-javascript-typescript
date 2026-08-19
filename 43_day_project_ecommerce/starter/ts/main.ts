// Day 43 - Project: E-commerce product list (TypeScript baseline)
export {}
type Product = { id: string; name: string; price: number; category: string; rating: number; inStock: boolean }
const products: Product[] = [
  { id: 'p1', name: 'Canvas backpack', price: 48, category: 'Bags', rating: 4.7, inStock: true },
  { id: 'p2', name: 'Desk lamp', price: 32, category: 'Home', rating: 4.3, inStock: true },
  { id: 'p3', name: 'Running shoes', price: 86, category: 'Clothing', rating: 4.8, inStock: false },
  { id: 'p4', name: 'Ceramic mug', price: 18, category: 'Home', rating: 4.1, inStock: true },
  { id: 'p5', name: 'Travel bottle', price: 22, category: 'Bags', rating: 4.5, inStock: true },
]
const cart = new Map<string, number>()
const money = (value: number): string => `$${value.toFixed(2)}`
const visibleProducts = (items: Product[], query: string, category: string): Product[] => {
  const normalized = query.trim().toLowerCase()
  return [...items.filter(product => (!normalized || product.name.toLowerCase().includes(normalized)) && (category === 'all' || product.category === category))].sort((a: Product, b: Product) => a.price - b.price)
}
const addToCart = (id: string): void => { cart.set(id, (cart.get(id) ?? 0) + 1) }
const cartTotal = (items: Product[]): number => [...cart].reduce((total, [id, quantity]) => total + (items.find(item => item.id === id)?.price ?? 0) * quantity, 0)
const root = document.querySelector('#app')
if (!(root instanceof HTMLElement)) throw new Error('Missing #app')
root.innerHTML = '<h1>Product list</h1><label>Search <input id="search" type="search"></label> <label>Category <select id="category"><option>all</option><option>Bags</option><option>Home</option><option>Clothing</option></select></label><p id="summary"></p><div id="products"></div>'
const search = document.querySelector('#search')
const category = document.querySelector('#category')
const list = document.querySelector('#products')
const summary = document.querySelector('#summary')
if (!(search instanceof HTMLInputElement) || !(category instanceof HTMLSelectElement) || !(list instanceof HTMLElement) || !(summary instanceof HTMLElement)) throw new Error('Missing product controls')
const ui = { search, category, list, summary }
function render(): void {
  const visible = visibleProducts(products, ui.search.value, ui.category.value)
  ui.list.replaceChildren(...visible.map(product => {
    const card = document.createElement('article')
    card.innerHTML = `<h2></h2><p></p><button data-id="${product.id}">Add</button>`
    card.querySelector('h2')!.textContent = product.name
    card.querySelector('p')!.textContent = `${product.category} - ${money(product.price)} - ${product.rating}/5${product.inStock ? '' : ' (out of stock)'}`
    return card
  }))
  ui.summary.textContent = `${visible.length} shown - cart total ${money(cartTotal(products))}`
}
ui.search.addEventListener('input', render)
ui.category.addEventListener('change', render)
ui.list.addEventListener('click', event => { const target = event.target; if (target instanceof HTMLButtonElement && target.dataset.id) { addToCart(target.dataset.id); render() } })
render()
