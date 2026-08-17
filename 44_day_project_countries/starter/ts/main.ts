export {}

// Day 44 — Project: Country Explorer — TypeScript Starter

interface Country {
  name: string
  capital: string
  population: number
  languages: string[]
  region: string
  area: number
}

// Load from data/countries_data.js
const countries: Country[] = []

function searchCountries(query: string): Country[] {
  const q = query.toLowerCase()
  return countries.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.capital.toLowerCase().includes(q) ||
    c.languages.some(l => l.toLowerCase().includes(q))
  )
}

function getMostSpokenLanguages(countries: Country[], topN: number): { language: string; count: number }[] {
  const counts: Record<string, number> = {}
  for (const country of countries) {
    for (const lang of country.languages) {
      counts[lang] = (counts[lang] || 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)
}

console.log('Country Explorer — TypeScript Starter ready!')
