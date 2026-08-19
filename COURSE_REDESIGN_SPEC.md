# Course Redesign Specification: Zero to Junior (45 Days)

**Target**: Match/exceed 30 Days of JavaScript depth per lesson, with JS+TS simultaneous teaching that enlightens rather than overwhelms.

---

## The 30 Days Pattern We're Matching

Per lesson (their Day 2 = 980 lines, Day 3 = 633 lines):
- **Concept coverage**: 8-15 subtopics with multiple examples each
- **Visual diagrams**: 3-5 images per lesson (string index, comparison operators, date object, etc.)
- **Exercises**: 3 levels × 10-20 each = 30-60 exercises per day
  - Level 1: Mechanical practice (syntax, basic operations)
  - Level 2: Applied mini-projects (calculators, grade systems, date formatting)
  - Level 3: Creative synthesis (regex text cleaning, leap year logic, frequency analysis)
- **Real-world context**: Every concept tied to practical use case
- **Tone**: Encouraging ("You are awesome", "You have boundless energy")

---

## Our JS+TS Integration Pattern (The Differentiator)

**JS-First, TS-Enlightening Layer** — not parallel tracks:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PROBLEM → JS RUNTIME BEHAVIOR (deep, visual, traced)    │
│    • Mental model built from execution                     │
│    • All examples runnable in Node/browser                 │
│    • Common mistakes shown with actual error output        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. TS ENLIGHTENING LAYER (same problem, adds clarity)      │
│    • "Here's what TS catches that JS misses"               │
│    • "Here's what TS CANNOT catch (runtime reality)"       │
│    • Inference vs explicit types tradeoff                  │
│    • Union types for null/undefined modeling               │
│    • Generic constraints for reusable patterns             │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. UNIFIED EXERCISES (progressive JS → TS translation)     │
│    • Level 1-2: Pure JS mastery                            │
│    • Level 3: "Now add types — what does TS catch?"        │
│    • Stretch: "What runtime bug would TS miss?"            │
└─────────────────────────────────────────────────────────────┘
```

**Key principle**: TS section is SHORT (200-300 lines max) and only appears AFTER JS mastery. It answers "why care about types for THIS specific problem?"

---

## 45-Day Curriculum Map (Redesigned)

### Phase 1: Foundations (Days 1-5) — "The Machine Model"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 1 | Setup + Programming Mental Model | Day 1 (implied) | 500 | 25 |
| 2 | Variables, Scope, Hoisting | Day 1 (variables) | 700 | 35 |
| 3 | **Data Types: Numbers Deep Dive** | Day 2 (Numbers) | 900 | 40 |
| 4 | **Data Types: Strings (20 methods)** | Day 2 (Strings) | 900 | 45 |
| 5 | Booleans, Operators, Type Coercion | Day 3 | 700 | 35 |

### Phase 2: Control Flow (Days 6-10) — "Making Decisions"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 6 | Conditionals (if/else/switch/ternary) | Day 4 | 600 | 30 |
| 7 | Loops (for/while/for-of/for-in) | Day 5 (Arrays preview) | 700 | 35 |
| 8 | Loop Patterns + Array Basics | Day 5 + 6 | 600 | 30 |
| 9 | Functions I (declaration, params, return, scope) | Day 7-8 | 700 | 35 |
| 10 | Functions II (arrows, defaults, rest, callbacks) | Day 8 | 600 | 30 |

### Phase 3: Data Structures (Days 11-20) — "Organizing Complexity"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 11 | Objects Deep Dive | Day 9 | 700 | 35 |
| 12 | Arrays Deep Dive (20+ methods) | Day 5 + 6 | 900 | 45 |
| 13 | Destructuring + Spread/Rest | Day 11 | 600 | 30 |
| 14 | Higher-Order Functions (map/filter/reduce) | Day 12-13 | 800 | 40 |
| 15 | Strings Advanced (regex, i18n, templates) | Day 2 + 14 | 700 | 35 |
| 16 | Numbers Advanced (Math, precision, bigint) | Day 2 + 15 | 600 | 30 |
| 17 | Dates & Time (Intl, timezones, formatting) | Day 3 + 16 | 700 | 35 |
| 18 | Error Handling (try/catch/finally, custom errors) | Day 18 | 600 | 30 |
| 19 | Classes I (constructor, methods, encapsulation) | Day 19 | 700 | 35 |
| 20 | Classes II (inheritance, static, private, mixins) | Day 20 | 700 | 35 |

### Phase 4: Module System & Browser (Days 21-30) — "Real Environments"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 21 | Modules (ESM, CommonJS, dynamic import) | Day 21 | 600 | 30 |
| 22 | JSON + Serialization Boundaries | Day 22 | 600 | 30 |
| 23 | Web Storage (localStorage, sessionStorage, IndexedDB intro) | Day 23 | 700 | 35 |
| 24 | DOM Selection (querySelector, traversal, guards) | Day 24 | 700 | 35 |
| 25 | DOM Manipulation (create, append, template, clone) | Day 25 | 800 | 40 |
| 26 | Events I (bubbling, delegation, preventDefault) | Day 26 | 700 | 35 |
| 27 | Events II (custom events, passive, options) | Day 27 | 600 | 30 |
| 28 | Functional Browser Patterns (state, render, diff) | Day 28 | 800 | 40 |
| 29 | Project: Todo App (CRUD + persistence) | Day 29 | 500 | 25 |
| 30 | Project: Weather Dashboard (API + DOM + error) | Day 30 | 500 | 25 |

### Phase 5: Async & Network (Days 31-35) — "Time & Failure"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 31 | Promises I (creation, chaining, error paths) | Day 31 | 800 | 40 |
| 32 | Promises II (all/race/allSettled, cancellation) | Day 32 | 700 | 35 |
| 33 | async/await (try/catch, parallel, sequential) | Day 33 | 800 | 40 |
| 34 | Fetch API (headers, body, streaming, abort) | Day 34 | 800 | 40 |
| 35 | API Integration (retries, caching, pagination) | Day 35 | 800 | 40 |

### Phase 6: TypeScript Mastery (Days 36-40) — "Types as Documentation"

| Day | Topic | 30-Days Equivalent | Target Lines | Exercises |
|-----|-------|-------------------|--------------|-----------|
| 36 | Type System Fundamentals (inference, widening, narrowing) | NEW | 700 | 35 |
| 37 | Generics (constraints, defaults, variance) | NEW | 800 | 40 |
| 38 | Utility Types (Partial, Pick, Record, ReturnType) | NEW | 700 | 35 |
| 39 | Advanced Types (conditional, mapped, template literals) | NEW | 800 | 40 |
| 40 | TS Best Practices (config, strictness, migration) | NEW | 600 | 30 |

### Phase 7: Portfolio Projects (Days 41-45) — "Ship It"

| Day | Topic | Target Lines | Exercises |
|-----|-------|--------------|-----------|
| 41 | Project: Recipe App (search, filter, favorites) | 500 | 25 |
| 42 | Project: Forum (auth, posts, real-time feel) | 500 | 25 |
| 43 | Project: E-commerce Cart (state, checkout, validation) | 500 | 25 |
| 44 | Project: Countries Explorer (API, routing, i18n) | 500 | 25 |
| 45 | Capstone: Full-Stack Junior Portfolio Piece | 500 | 25 |

---

## Lesson Template (Every Day Follows This)

```markdown
# Day N: [Title]

[Previous] | [Next]

## Table of Contents
- [Why This Lesson Exists]
- [Prerequisites]
- [What You'll Be Able to Explain/Do]
- [The Problem This Solves]
- [JS Runtime Deep Dive] (60-70% of lesson)
  - [Concept 1: Visual + Trace + Examples]
  - [Concept 2: Visual + Trace + Examples]
  - ...
  - [Common Mistakes Table]
- [TS Enlightening Layer] (20-30% of lesson)
  - [What TS Catches Here]
  - [What TS Cannot Catch Here]
  - [Inference vs Explicit Tradeoff]
  - [One Compiler Error Walkthrough]
- [One-Sentence Mental Model]
- [Practice: Level 1 - Mechanical] (10-15 exercises)
- [Practice: Level 2 - Applied Mini-Projects] (8-12 exercises)
- [Practice: Level 3 - Creative Synthesis] (4-8 exercises)
- [Hints Link] | [Solutions Link]
```

---

## Exercise Design Rules

### Level 1: Mechanical (Syntax Fluency)
- "Run this, predict output, explain why"
- "Fix this broken code"
- "Fill in the blank to make it work"
- Target: 2-3 min each, 90% success rate expected

### Level 2: Applied Mini-Projects (Real Use Cases)
- Temperature converter, grade calculator, date formatter
- Shopping cart subtotal, BMI calculator, loan payment
- String parser, array analyzer, object transformer
- Target: 10-15 min each, 70% success rate expected

### Level 3: Creative Synthesis (Novel Problems)
- "Clean this messy data with regex"
- "Build a frequency counter for any array"
- "Implement a simple cache with TTL"
- "Design a type-safe event emitter"
- Target: 20-30 min each, 50% success rate expected (stretch)

---

## Visual Diagram Requirements (Per Lesson)

Create as SVG in `images/diagrams/day-N/`:
1. **Memory model** (stack vs heap, references)
2. **Execution trace** (call stack, event loop for async)
3. **Type relationship** (union, intersection, narrowing)
4. **Control flow** (branches, loops, try/catch)
5. **Data transformation** (map/filter/reduce pipeline)

---

## File Structure Per Day

```
NN_day_topic/
├── NN_day_topic.md           # Main lesson (800-1000 lines)
├── starter/
│   ├── js/
│   │   ├── main.js           # Runnable examples
│   │   ├── exercises-L1.js   # Level 1 templates
│   │   ├── exercises-L2.js   # Level 2 templates
│   │   └── exercises-L3.js   # Level 3 templates
│   └── ts/
│       ├── main.ts           # TS equivalents
│       ├── exercises-L1.ts
│       ├── exercises-L2.ts
│       └── exercises-L3.ts
├── practice/
│   ├── hints.md              # Progressive hints per exercise
│   └── solutions.md          # Full solutions with explanations
└── diagrams/
    ├── memory-model.svg
    ├── execution-trace.svg
    └── type-relationships.svg
```

---

## Quality Gates (Before Marking Day Complete)

- [ ] JS starter runs: `npm run dayN:js` → expected output
- [ ] TS starter runs: `npm run dayN` → no compiler errors
- [ ] All Level 1 exercises have working solutions
- [ ] All Level 2 mini-projects produce correct output
- [ ] Level 3 solutions include "what TS catches/misses" analysis
- [ ] Hints are progressive (not answers)
- [ ] Solutions explain DECISIONS, not just code
- [ ] All relative links resolve
- [ ] Diagrams render in README and lesson
- [ ] TS section is <300 lines and references JS concepts by name

---

## Migration Strategy

**Week 1-2**: Redesign Days 1-5 (foundations) — these set the pattern
**Week 3-4**: Redesign Days 6-15 (control flow + data structures)
**Week 5-6**: Redesign Days 16-30 (advanced + browser)
**Week 7-8**: Redesign Days 31-45 (async + TS mastery + projects)

Each day: Write lesson → Create starters → Build exercises → Generate diagrams → Verify

---

## Success Metrics

A complete beginner finishing this course can:
1. **Explain** every JS runtime behavior covered (execution, scope, closure, event loop, prototype chain)
2. **Write** correct JS for any problem in the curriculum without referencing notes
3. **Add** appropriate TypeScript types and explain what each catches
4. **Debug** a failing Node/browser program using console, debugger, network tab
5. **Build** a deployed portfolio project with README, tests, and type safety
6. **Pass** a junior frontend technical interview (algorithms + system design basics)

---

*This spec is the contract. Every lesson must meet it.*