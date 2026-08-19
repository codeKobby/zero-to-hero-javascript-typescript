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

| Day | Project | Demonstrate |
| --- | --- | --- |
| 29 | Todo | state, storage, delegation, accessible CRUD |
| 30 | Weather | async boundary, mock API, loading/error/retry |
| 41 | Recipe | typed CRUD, validation, search |
| 42 | Forum | nested data, posts, likes, event delegation |
| 43 | E-commerce | filtering, sorting, cart as derived state |
| 44 | Countries | runtime data validation, aggregation, comparison |
| 45 | Capstone | problem selection, scope control, shipping and defense |

For each project, begin with the smallest vertical slice, then add one feature at a time. A polished three-project portfolio is stronger than seven unfinished clones.
