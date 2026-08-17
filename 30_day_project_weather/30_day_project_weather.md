<div align="center">
  <h1>Day 30: Project — Weather Dashboard</h1>
</div>

[<< Day 29](../29_day_project_todo/29_day_project_todo.md) | [Day 31 >>](31_day_promises_i/31_day_promises_i.md)

---

## 🎯 Project Goal

Build a **Weather Dashboard** that fetches weather data from an API, displays current conditions, and stores favorites in localStorage. This project integrates async patterns (introduced next week) with DOM manipulation.

---

## Requirements

1. Enter a city name → fetch weather data
2. Display: temperature, humidity, conditions, icon
3. Save favorite cities to localStorage
4. Show favorites list with one-click access
5. Handle loading states and errors gracefully

---

## Data Model (for local mock data)

Since this must work offline, we'll use a local JSON file as our "API":

```json
[
  { "city": "New York", "temp": 72, "humidity": 60, "condition": "Sunny", "icon": "☀️" },
  { "city": "London", "temp": 55, "humidity": 75, "condition": "Cloudy", "icon": "☁️" },
  { "city": "Tokyo", "temp": 68, "humidity": 65, "condition": "Rainy", "icon": "🌧️" },
  { "city": "Sydney", "temp": 80, "humidity": 50, "condition": "Clear", "icon": "🌤️" },
  { "city": "Paris", "temp": 60, "humidity": 70, "condition": "Windy", "icon": "💨" }
]
```

### TypeScript Types

```ts
interface WeatherData {
  city: string
  temp: number
  humidity: number
  condition: string
  icon: string
}

interface DashboardState {
  current: WeatherData | null
  favorites: string[]
  searchHistory: string[]
}
```

### Suggested Architecture

```
starter/
├── js/main.js
├── ts/main.ts
├── index.html
├── style.css
└── ../data/weather.json    # Local mock data (reuse from ../data/)
```

---

## Exercises

### Level 1 — Basic

Load weather data from a local JSON file and display it.

### Level 2 — Full Dashboard

Add search, favorites, localStorage persistence. Use TypeScript.

### Level 3 — Enhanced

Add 5-day forecast display, charts (using Canvas), weather animations.

---

[<< Day 29](../29_day_project_todo/29_day_project_todo.md) | [Day 31 >>](31_day_promises_i/31_day_promises_i.md)

🎉 **Day 30 Complete!**

🎉 **🎉 Certificate Milestone: Full-Stack Ready!** Complete Days 1-30
