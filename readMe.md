<div align="center">
  <h1> 45 Days Of JavaScript & TypeScript</h1>
  <a class="header-badge" target="_blank" href="https://www.linkedin.com/in/asabeneh/">
  <img src="https://img.shields.io/badge/style--5eba00.svg?label=LinkedIn&logo=linkedin&style=social">
  </a>
  <a class="header-badge" target="_blank" href="https://twitter.com/Asabeneh">
  <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/asabeneh?style=social">
  </a>
</div>

<sub>Author:
<a href="https://www.linkedin.com/in/asabeneh/" target="_blank">Asabeneh Yetayeh</a><br>
<small> Updated: August 2026</small>
</sub>

---

## 📔 45 Days Of JavaScript & TypeScript

This curriculum has been completely redesigned to teach **JavaScript and TypeScript simultaneously**. Every lesson covers both languages side-by-side, showing you the differences, the benefits of TypeScript, and how to migrate from JS to TS.

The curriculum has been expanded from 30 days to 45 days to include:
- Modern ES2020+ features (optional chaining, nullish coalescing, etc.)
- Comprehensive TypeScript integration in every lesson
- Advanced array methods that were missing (`every`, `find`, `findIndex`, `some`)
- More capstone projects that build on previous concepts
- Exercises that chain knowledge from earlier days

---

### 🎯 Who is this for?

This curriculum is for developers who want to become **solid in both JavaScript and TypeScript**. You'll learn modern JavaScript first, then see how TypeScript adds safety and tooling on top of the same concepts.

### 📚 How to use this curriculum

Each day has:
1. A **lesson markdown file** (`/XX_day_title/XX_day_title.md`) — teaches both JS and TS
2. **Starter code** in `/XX_day_title/starter/js/` and `/XX_day_title/starter/ts/`
3. **Exercises** that build on previous days and introduce new concepts
4. A **solution guide** reference

---

## Curriculum Table

| Day | Topic | Key Concepts |
|-----|-------|-------------|
| **Phase 1: Foundations** |
| Day 1 | Setup & Tooling | Node.js, TypeScript, tsconfig, VS Code |
| Day 2 | Variables & Constants | `let`, `const`, type annotations, `noImplicitAny` |
| Day 3 | Data Types | Primitives, objects, typeof, type guards |
| Day 4 | Operators & Type Coercion | `== vs ===`, nullish coalescing, type assertions |
| Day 5 | Control Flow | if/else, switch, ternary, nullish coalescing |
| Day 6 | Loops & Iteration | for, while, for...of, for...in, break/continue |
| Day 7 | Functions I | Declarations, expressions, arrows, TS function types |
| Day 8 | Functions II | Params, defaults, rest, callbacks |
| Day 9 | Objects & Interfaces | Literals, methods, TS interfaces & type aliases |
| Day 10 | Arrays & Generics | Arrays, tuples, TS array types, generics |
| **Phase 2: Core Concepts Deep Dive** |
| Day 11 | Destructuring & Spread | Destructuring, spread, rest, optional chaining |
| Day 12 | Higher-Order Functions I | map, filter, reduce, forEach, find, findIndex |
| Day 13 | Higher-Order Functions II | every, some, sort, includes, indexOf, findLast |
| Day 14 | Strings | Template literals, methods, TS string types |
| Day 15 | Numbers & Math | parseInt, parseFloat, Math, Number methods |
| Day 16 | Dates & Time | Date object, formatting, timezone, TS Date |
| Day 17 | Regular Expressions | Patterns, methods, groups, validation |
| Day 18 | Error Handling | try/catch, throw, custom errors, TS error types |
| Day 19 | Classes & OOP I | Classes, constructors, methods, inheritance |
| Day 20 | Classes & OOP II | Accessors, static, private, TS class features |
| **Phase 3: Modules, Storage & DOM** |
| Day 21 | Modules | import/export, namespaces, TS modules |
| Day 22 | JSON & APIs | JSON.parse, JSON.stringify, API patterns, TS with JSON |
| Day 23 | Web Storage | localStorage, sessionStorage, TS storage patterns |
| Day 24 | DOM Selection | querySelector, getElementById, TS DOM types |
| Day 25 | DOM Manipulation | createElement, append, remove, TS DOM manipulation |
| Day 26 | Events I | addEventListener, event types, TS event handling |
| Day 27 | Events II | Event delegation, keyboard, forms, preventDefault |
| Day 28 | Functional Programming | Pure functions, immutability, composition, currying |
| Day 29 | Project: Todo App | Build a Todo app integrating Days 1-28 |
| Day 30 | Project: Weather Dashboard | Async + APIs + TypeScript integration |
| **Phase 4: Async Programming** |
| Day 31 | Promises I | Promise states, creating promises, chaining |
| Day 32 | Promises II | Promise.all, Promise.race, error handling |
| Day 33 | Async/Await | async/await syntax, error handling, TS async |
| Day 34 | Fetch API | fetch(), status, headers, body, TS fetch |
| Day 35 | API Integration | REST APIs, authentication, rate limiting |
| **Phase 5: TypeScript Deep Dive** |
| Day 36 | TS Types & Interfaces | Type annotations, interfaces, type aliases |
| Day 37 | TS Generics | Generic functions, classes, constraints |
| Day 38 | TS Utility Types | Partial, Pick, Omit, Record, Readonly, keyof |
| Day 39 | TS Advanced Types | Conditional types, mapped types, template literals |
| Day 40 | TS Best Practices | Project structure, tsconfig, debugging, testing |
| **Phase 6: Capstone Projects** |
| Day 41 | Project: Recipe Book | Full CRUD with localStorage + TypeScript |
| Day 42 | Project: Discussion Forum | DOM, events, state management, TypeScript |
| Day 43 | Project: E-commerce List | Filtering, sorting, TypeScript generics |
| Day 44 | Project: Country Explorer | API integration, data visualization, TS types |
| Day 45 | Capstone: Your Choice | Build any app combining all concepts |

---

## 🚀 Getting Started

### Prerequisites
- A browser (Chrome, Firefox, Edge, Safari)
- Node.js (v18+ recommended)
- A code editor (VS Code recommended)

### Setup

```bash
# Clone or download this repo
git clone https://github.com/Asabeneh/30-Days-Of-JavaScript.git
cd 30-Days-Of-JavaScript

# Install TypeScript globally
npm install -g typescript

# Or install locally
npm install
```

### Running the code

Each day has starter code in both JavaScript and TypeScript:

```bash
# JavaScript
node 01_day_setup/starter/js/main.js

# TypeScript (compile first)
tsc 01_day_setup/starter/ts/main.ts
node 01_day_setup/starter/ts/main.js
```

---

## 🎓 Learning Path

This curriculum is designed so that:
- **Every lesson** teaches the same concept in both JavaScript and TypeScript
- **Exercises build on previous days** — you'll reuse earlier concepts in new ways
- **Projects integrate multiple concepts** — by Day 29 you're building real apps
- **TypeScript is introduced gradually** — you won't be overwhelmed

---

## 🏆 Certificates

Earned after completing specific milestones:
- 🟢 **JavaScript Foundations** — Complete Days 1-10
- 🟡 **JavaScript Core** — Complete Days 11-20
- 🔵 **Full-Stack Ready** — Complete Days 21-30
- 🟣 **TypeScript Master** — Complete Days 31-40
- 🏅 **Capstone Graduate** — Complete Days 41-45

---

## 📖 Additional Resources

- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

---

🎉 **CONGRATULATIONS!** — You've reached the end. Keep learning, keep building!

---

<a href="01_day_setup/01_day_setup.md">
<img src="images/day1.jpg" alt="Day 1">
</a>
<a href="01_day_setup/01_day_setup.md">
</a>

| [Day 1](01_day_setup/01_day_setup.md) | [Day 2](02_day_variables/02_day_variables.md) | [Day 3](03_day_data_types/03_day_data_types.md) | [Day 4](04_day_operators/04_day_operators.md) | [Day 5](05_day_control_flow/05_day_control_flow.md) |
|---|---|---|---|---|
| [Day 6](06_day_loops/06_day_loops.md) | [Day 7](07_day_functions_i/07_day_functions_i.md) | [Day 8](08_day_functions_ii/08_day_functions_ii.md) | [Day 9](09_day_objects/09_day_objects.md) | [Day 10](10_day_arrays/10_day_arrays.md) |
| [Day 11](11_day_destructuring/11_day_destructuring.md) | [Day 12](12_day_hof_i/12_day_hof_i.md) | [Day 13](13_day_hof_ii/13_day_hof_ii.md) | [Day 14](14_day_strings/14_day_strings.md) | [Day 15](15_day_numbers/15_day_numbers.md) |
| [Day 16](16_day_dates/16_day_dates.md) | [Day 17](17_day_regex/17_day_regex.md) | [Day 18](18_day_error_handling/18_day_error_handling.md) | [Day 19](19_day_classes_i/19_day_classes_i.md) | [Day 20](20_day_classes_ii/20_day_classes_ii.md) |
| [Day 21](21_day_modules/21_day_modules.md) | [Day 22](22_day_json/22_day_json.md) | [Day 23](23_day_web_storage/23_day_web_storage.md) | [Day 24](24_day_dom_selection/24_day_dom_selection.md) | [Day 25](25_day_dom_manipulation/25_day_dom_manipulation.md) |
| [Day 26](26_day_events_i/26_day_events_i.md) | [Day 27](27_day_events_ii/27_day_events_ii.md) | [Day 28](28_day_functional_programming/28_day_functional_programming.md) | [Day 29](29_day_project_todo/29_day_project_todo.md) | [Day 30](30_day_project_weather/30_day_project_weather.md) |
| [Day 31](31_day_promises_i/31_day_promises_i.md) | [Day 32](32_day_promises_ii/32_day_promises_ii.md) | [Day 33](33_day_async_await/33_day_async_await.md) | [Day 34](34_day_fetch_api/34_day_fetch_api.md) | [Day 35](35_day_api_integration/35_day_api_integration.md) |
| [Day 36](36_day_ts_types/36_day_ts_types.md) | [Day 37](37_day_ts_generics/37_day_ts_generics.md) | [Day 38](38_day_ts_utility_types/38_day_ts_utility_types.md) | [Day 39](39_day_ts_advanced_types/39_day_ts_advanced_types.md) | [Day 40](40_day_ts_best_practices/40_day_ts_best_practices.md) |
| [Day 41](41_day_project_recipe/41_day_project_recipe.md) | [Day 42](42_day_project_forum/42_day_project_forum.md) | [Day 43](43_day_project_ecommerce/43_day_project_ecommerce.md) | [Day 44](44_day_project_countries/44_day_project_countries.md) | [Day 45](45_day_capstone/45_day_capstone.md) |
