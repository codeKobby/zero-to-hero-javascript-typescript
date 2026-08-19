# Portfolio track

The projects are practice vehicles. A portfolio is only credible when you can show the repository, a live build, the decisions you made, and what you would improve next. The starters in Days 29-30 and 41-45 are intentionally offline so a fresh clone works without API keys.

## Definition of done

- README: user, problem, non-goals, features, setup, screenshots, live link, limits, and next steps.
- Architecture: pure logic is separate from DOM rendering; storage and network boundaries are explicit.
- JS/TS parity: the TypeScript version has the same acceptance criteria and passes `npm.cmd run check`.
- States: loading (when relevant), empty, error, success, disabled, and keyboard/focus behavior are deliberate.
- Safety: external or stored data is validated; user/data text uses safe DOM APIs.
- History: commits show small working features and include at least one bug fix.

## Project progression

Each row maps the day's concepts to the coding agent prompt you should use.
Find your progress level and click the matching **Prompt** link below — each one jumps straight to the full prompt in [coding-agent-project-prompts.md](coding-agent-project-prompts.md).

| Day | Concepts Covered | Prompt |
| --- | --- | --- |
| **29** | State management, localStorage, CRUD operations | **[Prompt 1](coding-agent-project-prompts.md#prompt-for-day-29)** - Day 29: State management, localStorage, CRUD |
| **30** | Async/await, fetch API, loading/error boundaries | **[Prompt 2](coding-agent-project-prompts.md#prompt-for-day-30)** - Day 30: Async patterns + Weather integration |
| **41** | TypeScript types, typed CRUD, form validation | **[Prompt 3](coding-agent-project-prompts.md#prompt-for-day-41)** - Day 41: Typed CRUD + Validation schemas |
| **42** | Nested data structures, event delegation, likes | **[Prompt 4](coding-agent-project-prompts.md#prompt-for-day-42)** - Day 42: Event delegation + Nested data |
| **43** | Filtering, sorting, derived state (cart calculations) | **[Prompt 5](coding-agent-project-prompts.md#prompt-for-day-43)** - Day 43: Filtering, sorting, cart derived state |
| **44** | Runtime data validation (Zod/Yup), aggregation | **[Prompt 6](coding-agent-project-prompts.md#prompt-for-day-44)** - Day 44: Runtime validation + Aggregation |
| **45** | Problem selection, scope control, shipping & defense | **[Prompt 7](coding-agent-project-prompts.md#prompt-for-day-45)** - Day 45: Capstone - full project pipeline |

For each project, begin with the smallest vertical slice, then add one feature at a time. A polished three-project portfolio is stronger than seven unfinished clones.

---

## Project Idea Prompts for Coding Agent

If you want your coding agent (Claude, GPT-4, etc.) to guide you through building a unique portfolio project that captures everything you've learned - and stands out from the generic Todo/Weather/Recipe apps - see the companion file:

- **[`coding-agent-project-prompts.md`](coding-agent-project-prompts.md)** - Contains 7 copy-pasteable prompts, one for each day 29-45:
  - **Prompt 1**: Day 29 - State management, localStorage, CRUD operations
  - **Prompt 2**: Day 30 - Async/await, fetch API, loading/error boundaries
  - **Prompt 3**: Day 41 - TypeScript types, typed CRUD, form validation
  - **Prompt 4**: Day 42 - Nested data structures, event delegation, likes
  - **Prompt 5**: Day 43 - Filtering, sorting, derived state (cart calculations)
  - **Prompt 6**: Day 44 - Runtime data validation (Zod/Yup), aggregation
  - **Prompt 7**: Day 45 - Problem selection, scope control, shipping & defense

Each prompt instructs the agent to:
- Incorporate ALL skills from the specified day range
- Meet all 6 Portfolio Definition of Done requirements
- **AVOID** building any generic course project (Todo, Weather, Recipe, Forum, E-commerce, Countries)
- Include 2-3 pseudo-code snippets for key patterns
- **Write a guided builder's guide** - the agent produces step-by-step documentation (milestones, checks, shipping checklist), and **you do the actual work**: type, run checks, screenshot, commit, and deploy

To use: Find your last completed day in the table above, then **click that row's Prompt link** to jump straight to the full prompt in [coding-agent-project-prompts.md](coding-agent-project-prompts.md). Copy the whole prompt section and paste it into your coding agent. The agent returns a guided builder's guide for a unique, portfolio-worthy project tailored to exactly what you've learned - you do the actual building (see the prompt's DELIVERABLES section for the contract).

Run `npm run check` to verify TypeScript passes before considering the project complete.
