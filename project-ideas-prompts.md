# Project Idea Prompts for Coding Agent

Copy and paste these prompts directly into your coding agent to get an out-of-the-box project idea that stands out in your portfolio while capturing everything you've learned.

---

## PROMPT 1: Beginner Portfolio Project (Days 1-28 Complete)

**Use this if you've completed the foundational 28 days and are starting the portfolio projects (Days 29-45).**

```
# PROJECT IDEA: Interactive Form Validation Suite
# DAY RANGE: Foundation (Days 1-28) + Initial Portfolio (Day 29)

# CORE CONCEPTS YOU'VE MASTERED:
# - Days 1-12: Variables, data types, operators, control flow, loops, functions (I & II)
# - Days 13-14: Error handling, regular expressions
# - Days 15-16: Numbers, strings, DOM manipulation
# - Days 17-18: Error handling, classes
# - Days 19-20: Classes II, modules
# - Days 21-22: JSON, web storage
# - Days 23-24: Functional programming, project Todo
# - Days 25-26: Project Weather, promises I & II
# - Days 27-28: Async/await

# PROJECT REQUIREMENTS (matching portfolio Definition of Done):
# 1. README with: user, problem, non-goals, features, setup, live link, limits, next steps
# 2. Architecture: pure logic separate from DOM rendering; storage/network boundaries explicit
# 3. JS/TS parity: TypeScript version passes npm.cmd run check
# 4. States: loading, empty, error, success, disabled with deliberate keyboard/focus behavior
# 5. Safety: external data validated; safe DOM APIs
# 6. History: commits show small working features + at least one bug fix

# WHAT MAKES THIS STAND OUT:
# Instead of another todo list, build a "Form Validation Suite" that:
# - Validates 5+ different form types (login, signup, profile update, password reset, search)
# - Has a toggle to switch between light/dark mode previews
# - Includes accessible error messages with screen-reader announcements
# - Shows real-time validation state (pristine, dirty, valid, invalid, submitting)
# - Has a "copy to clipboard" feature for valid form data
# - TypeScript version includes comprehensive type guards and branded types
# - All states (loading, empty, error, success) are explicitly handled
# - Commit history shows incremental feature additions with at least one bug fix

# Coding Agent Instruction:
# Generate a full project scaffold with:
# - React (or vanilla TS) component library for each form type
# - Zod-like validation schema (custom or library)
# - Type-safe form handling with branded types
# - Accessible UI patterns (focus management, error announcement)
# - LocalStorage persistence with versioning
# - Mock API integration (like the Weather project pattern)
# - Vite build with CSS modules or Tailwind
# - npm run check passes for TypeScript
# - Deploy to Vercel/Netlify with live URL
```

---

## PROMPT 2: Intermediate Portfolio Project (Days 29-35 Complete)

**Use this if you've completed Days 29-35 (Todo + Weather + beginning of portfolio).**

```
# PROJECT IDEA: Recipe Manager with Social Features
# DAY RANGE: Days 29-35 (Todo + Weather + Recipe start)

# CORE CONCEPTS YOU'VE MASTERED:
# - Day 29: State, storage, delegation, accessible CRUD (Todo)
# - Day 30: Async boundary, mock API, loading/error/retry (Weather)
# - Days 41: Typed CRUD, validation, search (Recipe foundation)
# - Days 31-32: Promises I & II
# - Days 33-34: Async/await
# - Days 35: Functional programming patterns

# PROJECT REQUIREMENTS (matching portfolio Definition of Done):
# 1. README with all required sections
# 2. Architecture: pure logic separate from DOM rendering
# 3. JS/TS parity with type checking
# 4. States: loading, empty, error, success, disabled
# 5. Safety: data validation, safe DOM APIs
# 6. History: incremental features with bug fixes

# WHAT MAKES THIS STAND OUT:
# Instead of a basic recipe app, build a "Recipe Manager with Social Features":
# - Users can save recipes, add ratings & reviews (1-5 stars)
# - Recipe filtering: diet tags (vegetarian, gluten-free, quick <30 min)
# - Infinite scroll or pagination for recipe list
# - "Cook mode" timer with step-by-step progress tracking
# - Shopping list generator from recipe ingredients
# - Serving size adjuster (doubles/halves ingredient quantities)
# - Dark mode with color theme switching
# - TypeScript with full type safety including recipe relations
# - Commit history shows adding social features incrementally

# Coding Agent Instruction:
# Generate full project with:
# - React + Vite or Next.js app
# - React Query or TanStack Query for server state
# - Type-safe API client
# - React Hook Form + Zod for form validation
# - Context API or Redux for state management
# - LocalStorage with sync state
# - Responsive design (mobile-first)
# - Deployment with live URL
# - TypeScript configuration with paths/aliases
```

---

## PROMPT 3: Advanced Portfolio Project (Days 36-45 Complete)

**Use this if you've completed Days 36-45 (all portfolio projects including Capstone).**

```
# PROJECT IDEA: Full-Stack Forum with Advanced Features
# DAY RANGE: Days 29-45 (Complete portfolio track)

# CORE CONCEPTS YOU'VE MASTERED:
# - Days 29-30: Todo (state, storage, delegation) + Weather (async, mock API)
# - Days 41-42: Recipe (typed CRUD) + Forum (nested data, posts, likes, event delegation)
# - Days 43: E-commerce (filtering, sorting, cart as derived state)
# - Days 44: Countries (runtime data validation, aggregation, comparison)
# - Days 45: Capstone (problem selection, scope control, shipping and defense)
# - Days 36-40: TS best practices, advanced types, utility types

# PROJECT REQUIREMENTS (matching portfolio Definition of Done):
# 1. README with all required sections
# 2. Architecture: pure logic separate from DOM; explicit storage/network boundaries
# 3. JS/TS parity with type checking passing
# 4. All states: loading, empty, error, success, disabled + keyboard/focus behavior
# 5. Safety: validated external data, safe DOM APIs
# 6. History: commits show small working features + at least one bug fix

# WHAT MAKES THIS STAND OUT:
# Build a "Full-Stack Forum with Advanced Community Features" that:
# - Threaded discussions: nested replies, quote references, mention notifications
# - Reaction system: multiple emoji reactions per post, reaction counts
# - User profiles: verified badges, post statistics, activity timeline
# - Advanced search: filter by author, tags, date range, reaction count
# - Infinite scroll with skeleton loaders and error boundaries
# - Draft saving: auto-save drafts, recover after refresh
# - Dark/light mode with CSS variables theming
# - Accessibility: ARIA labels, focus management, screen reader support
# - TypeScript: full typings including relational data models
# - API layer: fetch with interceptors, error handling, retries
# - LocalStorage persistence for drafts and preferences
# - Deploy to production with custom domain option
# - Commit history documents the architectural evolution

# Coding Agent Instruction:
# Generate complete full-stack project with:
# - Next.js 14 app router or React with Vite
# - Supabase or Firebase backend (auth, database, storage)
# - TypeScript strict mode with full types
# - React Query/TanStack Query for server state
# - React Hook Form + Zod for all forms
# - shadcn/ui component library with custom themes
# - React Hook Form with context for global state
# - Testing: Vitest + React Testing Library (at least 3 test files)
# - TypeScript path aliases and compiler options
# - Deployment configuration (Vercel/Netlify)
# - Live URL and GitHub repo structure
# - README with all Definition of Done sections
```

---

## How to Use These Prompts:

1. **Copy the entire prompt** (including the `# PROJECT IDEA:` header) that matches your current progress level
2. **Paste it into your coding agent** (Claude, GPT-4, etc.)
3. **The agent will generate** a full project scaffold that:
   - Matches your exact learning level
   - Captures all the skills from your completed days
   - Produces a portfolio-worthy project
   - Follows the Definition of Done from your PORTFOLIO_TRACK.md
4. **Receive a complete project** with:
   - Source code
   - Live deployment URL
   - README with all required sections
   - TypeScript configuration
   - Commit history structure

---

## Progress Self-Assessment:

Check which prompt to use:

- **Use PROMPT 1** if you've completed Days 1-28 and are starting Days 29-30 (Todo, Weather)
- **Use PROMPT 2** if you've completed Days 29-35 (Todo + Weather + Recipe start)
- **Use PROMPT 3** if you've completed Days 29-45 (full portfolio track including Capstone)

Each prompt ensures your project:
- ✅ Captures what you've actually learned (not generic todos)
- ✅ Meets the portfolio Definition of Done
- ✅ Stands out with unique features beyond the basic course projects
- ✅ Has TypeScript parity and passes type checking
- ✅ Includes proper states, safety, and history
- ✅ Has a live deployable URL