# Day 45 review rubric

Read this only after a genuine attempt. There is no single solution; this is the checklist the capstone is assessed against.

A passing capstone has:

- a clear README: user, problem, non-goals, acceptance criteria, data model, run/deploy commands, screenshots, known limits, and next steps;
- a working deployed vertical slice: input -> state -> render -> error/empty state;
- the same real application in JavaScript and TypeScript, with identical acceptance criteria;
- strict TypeScript (`npm.cmd run check` passes with `strict: true`) with runtime validation at boundaries for external data;
- accessible interaction states and safe DOM APIs for all rendering;
- persistence or an explicit reason not to persist, with stored data validated on load;
- one source of truth for state;
- tests for pure logic;
- a short trade-off log from a real person attempting to break the app.

Ask another person to use it and record the bugs they find. A capstone is an assessment: write the README first, build one vertical slice in JavaScript, carry the same design into TypeScript with contracts at the boundaries, test the pure logic, deploy, and let another person break it so you can record the fixes.