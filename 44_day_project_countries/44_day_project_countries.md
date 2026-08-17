<div align="center">
  <h1>Day 44: Project — Country Explorer</h1>
</div>

[<< Day 43](../43_day_project_ecommerce/43_day_project_ecommerce.md) | [Day 45 >>](45_day_capstone/45_day_capstone.md)

---

## 🎯 Project Goal

Build a **Country Explorer** using the local `data/countries.js` file. This is the biggest project — it requires data processing, sorting, searching, statistics, and beautiful display.

---

## Features

1. Display countries with flag, name, population, capital, languages
2. Search by name, capital, or language
3. Filter by region, language, population range
4. Sort by name, population, area
5. Show statistics: most spoken languages, most populous countries
6. Country detail view
7. Compare two countries side by side
8. Persist favorites in localStorage

---

## Data

Use the existing data files:
- `data/countries_data.js` — main dataset
- `data/countries.js` — alternative format

```ts
interface Country {
  name: string
  capital: string
  population: number
  languages: string[]
  region: string
  area: number
  flag: string
  currency: string
}
```

---

## Key Challenges

1. **Data processing**: Parse languages and count occurrences (Day 12 — `reduce`)
2. **Filtering**: Multiple filters combined (Day 13 — `every`, `filter`)
3. **Sorting**: Custom comparators (Day 13 — `sort`)
4. **Search**: Case-insensitive multi-field search (Day 14 — string methods)
5. **Statistics**: `mostSpokenLanguages()` and `mostPopulousCountries()` (Day 12-13)
6. **TypeScript**: Full type safety throughout (Days 36-40)

---

## Exercises

### Level 1

Display a searchable list of countries with name and capital.

### Level 2

Add filtering by region/language, sorting, statistics, and favorites.

### Level 3

Add country comparison, population density calculation, area rankings, and world map visualization.

---

🎉 **Day 44 Complete!**

🎉 **Progress**: 44/45 days complete
