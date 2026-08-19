# Day 11 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `title` → `'Dune'`; `author` → `'Frank Herbert'`.
2. `writer` → `'Frank Herbert'`; no `author` variable is created — the name after the colon is the local variable.
3. `first` → `92`; `second` → `86`.
4. `gold` → `'gold'`; `bronze` → `'bronze'` (middle skipped).
5. `b` → `'fallback'` (second item is `undefined`).
6. `b` → `0` — a supplied `0` wins; defaults fire only on `undefined`.
7. `rest` → `['Kai', 'Owen']`.
8. `progress` → `{ track: 'frontend', completedLessons: 11 }` (everything except `name`).
9. `learner.completedLessons` stays `11`; `updated.completedLessons` is `12` — spread made a new object.

## Level 2

```js
// 1. First and last, skipping the middle
const [first, , last] = ['first', 'middle', 'last']
console.log(first, last) // first last

// 2. Rename title
const task = { id: 7, title: 'Inbox', done: false }
const { title: taskTitle } = task
console.log(taskTitle) // Inbox

// 3. Immutable update
const updatedTask = { ...task, done: true }
console.log(task.done)        // false
console.log(updatedTask.done) // true

// 4. Name plus the rest
const learner = { name: 'Mina', track: 'frontend', completedLessons: 11 }
const { name, ...progress } = learner
console.log(name)     // Mina
console.log(progress) // { track: 'frontend', completedLessons: 11 }

// 6. First two from a parameter
function printFirstTwo(scores) {
  const [first, second] = scores
  console.log(first, second)
}
printFirstTwo([92, 86, 74]) // 92 86
```

```ts
// 5. Optional assignee with a default
type Task = {
  id: number
  title: string
  assignee?: string
}

const typedTask: Task = { id: 7, title: 'Inbox' }
const { assignee = 'unassigned' } = typedTask
console.log(assignee) // unassigned
```

## Level 3

```js
// 1. The swap
let a = 'first'
let b = 'second'
;[a, b] = [b, a]
console.log(a, b) // second first
// The right side builds a fresh two-item array [b, a];
// the left side assigns position 0 to a and position 1 to b.

// 2. Config updater, original untouched
function updateSetting(settings, key, value) {
  return { ...settings, [key]: value }
}
const config = { theme: 'dark', volume: 8 }
const updated = updateSetting(config, 'volume', 5)
console.log(config.volume)  // 8   (original safe)
console.log(updated.volume) // 5
// updateSetting never mutates settings; it builds a new object.

// 3. The podium, one line
const [gold, silver, bronze, ...others] = ['gold', 'silver', 'bronze', 'wood']
console.log(gold, silver, bronze) // gold silver bronze
console.log(others)               // ['wood']

// 4. The rest-must-be-last story
// const [...others, last] = [1, 2, 3]
// Error: rest must be the last element, because it means
// "everything that is still left" — nothing can follow it.

// 5. The default trap
const [firstNumber, fallback = 99] = [10, 0]
console.log(fallback) // 0, not 99
// The default fires ONLY when the value is undefined.
// A supplied 0 is a real value, so it wins.
```

## TypeScript

```ts
type Learner = {
  name: string
  track: 'frontend' | 'backend'
  completedLessons: number
  nickname?: string
}

const learner: Learner = { name: 'Mina', track: 'frontend', completedLessons: 11 }

const { name, track, nickname = 'new learner' } = learner
// nickname is string (default covers the optional undefined case)

// const { learnerId } = learner
// Error: Property 'learnerId' does not exist on type 'Learner'.
```