# Course Quality Standard

This is the acceptance standard for every learner-facing file in this repository. A lesson is not complete because it mentions a topic. It is complete only when a learner can explain, predict, practise, and apply the topic.

## Course promise

This is a beginner-first JavaScript and TypeScript foundations course. It prepares learners for continued frontend or full-stack junior-development study; it does not claim that 45 days alone replaces sustained project work, interview preparation, collaboration, or professional experience.

## Every lesson must contain

1. **Table of contents**: a short section map when the lesson has more than a few major parts.
2. **Prerequisites**: what the learner should already understand.
3. **Observable outcomes**: what the learner can explain and do by the end.
4. **Problem first**: the practical problem the concept solves.
5. **Runnable JavaScript**: a small example before abstraction.
6. **Execution trace**: values, control flow, callback calls, or state changes shown step by step whenever the idea is invisible.
7. **Matched TypeScript**: the same runtime behavior plus an explanation of types, compiler feedback, trade-offs, and limits.
8. **Common mistakes**: realistic errors, their symptoms, and corrections.
9. **Deliberate practice**: prediction, guided coding, TypeScript translation, and optional stretch work.
10. **Separate help**: practice/hints.md and practice/solutions.md, never full answers in the reading flow.
11. **One-sentence summary**: a truthful, memorable mental model.

## JavaScript and TypeScript parity

For every concept:

- JavaScript explains runtime behavior.
- TypeScript demonstrates the same runtime behavior, not a different program.
- The lesson shows one compiler error TypeScript catches.
- The lesson shows one runtime or design issue TypeScript cannot solve.
- The browser workflow must compile TypeScript before it reaches the browser; no HTML page may pretend a browser executes .ts directly.

## Teaching rules

- Teach prerequisites before dependent concepts.
- Use plain language first; introduce terminology after the learner has seen the behavior.
- Do not use a later topic to solve an earlier exercise.
- Do not use “magic” phrasing such as “map handles it” without showing what is passed, called, returned, and collected.
- Do not use a misleading shorthand such as “hoisting moves code to the top.”
- Do not present advanced patterns, LeetCode, or interview answers as core beginner material before the relevant foundations exist.
- Do not require learners to install optional extensions to run a Node lesson.

## Practice standard

Exercises must state:

- the input or starting state;
- the expected output or acceptance criterion;
- the concepts already available to solve it; and
- a progressive hint route.

Solutions must explain the decision, not only show code. A learner should be able to compare their attempt and identify the smallest meaningful difference.

## Guide and resource standard

Setup, troubleshooting, curriculum, portfolio, and interview guides must:

- use commands that work on the supported platform;
- link only to existing files or authoritative external resources;
- distinguish required from optional tools;
- avoid unsupported career promises;
- tell learners how to verify success; and
- be consistent with the lesson workflow.

## Technical verification standard

Before a lesson is accepted:

- its JavaScript starter runs;
- its TypeScript starter runs;
- the TypeScript project check passes;
- all relative links resolve;
- browser lessons work through their documented server/build path;
- no starter contradicts the lesson;
- no solution is embedded in the exercise reading flow; and
- the lesson has been checked for encoding corruption and misleading examples.

## Completion definition

The course is complete only when all 45 lessons, project scaffolds, helper guides, solution routes, commands, and links meet this standard and pass the final curriculum audit.
