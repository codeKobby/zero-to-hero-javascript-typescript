// Day 41 — Project: Recipe Book — Starter
// Full CRUD with localStorage

var recipes = JSON.parse(localStorage.getItem('recipes') || '[]')

function addRecipe(recipe) {
  recipe.id = Date.now().toString()
  recipes.push(recipe)
  save()
}

function deleteRecipe(id) {
  recipes = recipes.filter(function (r) { return r.id !== id })
  save()
}

function searchRecipes(query) {
  return recipes.filter(function (r) {
    return r.title.toLowerCase().includes(query.toLowerCase())
  })
}

function save() {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

console.log('Recipe Book ready — add your implementation!')
