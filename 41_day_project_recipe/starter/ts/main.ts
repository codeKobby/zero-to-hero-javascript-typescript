export {}

// Day 41 — Project: Recipe Book — TypeScript Starter

interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  steps: string[]
  prepTime: number
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert'
  isFavorite: boolean
  createdAt: number
}

const recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]') as Recipe[]

function addRecipe(recipe: Omit<Recipe, 'id' | 'createdAt'>): Recipe {
  const newRecipe: Recipe = {
    ...recipe,
    id: Date.now().toString(),
    createdAt: Date.now()
  }
  recipes.push(newRecipe)
  localStorage.setItem('recipes', JSON.stringify(recipes))
  return newRecipe
}

function searchRecipes(query: string): Recipe[] {
  return recipes.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase())
  )
}

console.log('Recipe Book — TypeScript Starter ready!')
