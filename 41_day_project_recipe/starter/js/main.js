// Day 41 - JavaScript: recipe CRUD baseline
const recipes = []
const form = document.querySelector('#recipe-form')
const titleInput = document.querySelector('#title')
const ingredientsInput = document.querySelector('#ingredients')
const searchInput = document.querySelector('#search')
const list = document.querySelector('#recipe-list')
const message = document.querySelector('#message')

if (!(form instanceof HTMLFormElement) ||
    !(titleInput instanceof HTMLInputElement) ||
    !(ingredientsInput instanceof HTMLInputElement) ||
    !(searchInput instanceof HTMLInputElement) ||
    !(list instanceof HTMLUListElement) ||
    !(message instanceof HTMLElement)) {
  throw new Error('Recipe starter HTML is incomplete.')
}

function isRecipe(value) {
  return typeof value === 'object' && value !== null &&
    typeof value.id === 'string' && typeof value.title === 'string' &&
    Array.isArray(value.ingredients) && value.ingredients.every((item) => typeof item === 'string') &&
    typeof value.createdAt === 'number'
}

function render() {
  const query = searchInput.value.trim().toLowerCase()
  list.replaceChildren()
  const visible = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query) ||
    recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query)))
  if (visible.length === 0) {
    message.textContent = 'No recipes yet.'
    return
  }
  message.textContent = ''
  for (const recipe of visible) {
    const item = document.createElement('li')
    item.textContent = recipe.title + ': ' + recipe.ingredients.join(', ')
    list.append(item)
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = titleInput.value.trim()
  const ingredients = ingredientsInput.value.split(',').map((item) => item.trim()).filter(Boolean)
  if (title === '' || ingredients.length === 0) {
    message.textContent = 'Enter a title and at least one ingredient.'
    return
  }
  recipes.push({ id: crypto.randomUUID(), title, ingredients, createdAt: Date.now() })
  titleInput.value = ''
  ingredientsInput.value = ''
  render()
})
searchInput.addEventListener('input', render)

try {
  const saved = JSON.parse(localStorage.getItem('day41-recipes') ?? '[]')
  if (Array.isArray(saved) && saved.every(isRecipe)) recipes.push(...saved)
} catch {}
render()
