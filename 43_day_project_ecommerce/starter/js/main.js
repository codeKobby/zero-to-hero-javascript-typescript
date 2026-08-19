// Day 43 - Project: E-commerce product list (JavaScript baseline)
const products = [
  { id: 'p1', name: 'Canvas backpack', price: 48, category: 'Bags', rating: 4.7, inStock: true },
  { id: 'p2', name: 'Desk lamp', price: 32, category: 'Home', rating: 4.3, inStock: true },
  { id: 'p3', name: 'Running shoes', price: 86, category: 'Clothing', rating: 4.8, inStock: false },
  { id: 'p4', name: 'Ceramic mug', price: 18, category: 'Home', rating: 4.1, inStock: true },
  { id: 'p5', name: 'Travel bottle', price: 22, category: 'Bags', rating: 4.5, inStock: true },
]
const cart = new Map()
const money = value => `$${value.toFixed(2)}`
function visibleProducts(items, query, category) {
  const normalized = query.trim().toLowerCase()
  return items.filter(product => (!normalized || product.name.toLowerCase().includes(normalized)) && (category === 'all' || product.category === category)).toSorted((a, b) => a.price - b.price)
}
function addToCart(id) { cart.set(id, (cart.get(id) ?? 0) + 1) }
function cartTotal(items) { return [...cart].reduce((total, [id, quantity]) => total + (items.find(item => item.id === id)?.price ?? 0) * quantity, 0) }
const root = document.querySelector('#app')
if (!(root instanceof HTMLElement)) throw new Error('Missing #app')
root.innerHTML = '<h1>Product list</h1><label>Search <input id="search" type="search"></label> <label>Category <select id="category"><option>all</option><option>Bags</option><option>Home</option><option>Clothing</option></select></label><p id="summary"></p><div id="products"></div>'
const search = document.querySelector('#search')
const category = document.querySelector('#category')
const list = document.querySelector('#products')
const summary = document.querySelector('#summary')
if (!(search instanceof HTMLInputElement) || !(category instanceof HTMLSelectElement) || !(list instanceof HTMLElement) || !(summary instanceof HTMLElement)) throw new Error('Missing product controls')
function render() {
  const visible = visibleProducts(products, search.value, category.value)
  list.replaceChildren(...visible.map(product => {
    const card = document.createElement('article')
    card.innerHTML = `<h2></h2><p></p><button data-id="${product.id}">Add</button>`
    card.querySelector('h2').textContent = product.name
    card.querySelector('p').textContent = `${product.category} - ${money(product.price)} - ${product.rating}/5${product.inStock ? '' : ' (out of stock)'}`
    return card
  }))
  summary.textContent = `${visible.length} shown - cart total ${money(cartTotal(products))}`
}
search.addEventListener('input', render)
category.addEventListener('change', render)
list.addEventListener('click', event => { const target = event.target; if (target instanceof HTMLButtonElement && target.dataset.id) { addToCart(target.dataset.id); render() } })
render()
