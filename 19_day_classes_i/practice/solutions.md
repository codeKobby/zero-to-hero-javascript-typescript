# Day 19 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. The finished instance — the new object that `ReadingProgress`'s constructor stored `title` and `completedLessons` on.
2. `completeNextLesson` runs against `first`'s `this`; `second` owns its own `completedLessons` field, so it is untouched.
3. The instance the method was called on — `progress`.
4. The method's `this` is no longer bound to `progress`, so the call is not safe.
5. State (like `completedLessons`) is per-instance; methods live on the shared prototype.
6. `completedLessons` is `undefined` — no default was provided, and JavaScript does not complain.
7. `day19:js` and `day19` run; `npm run check` passes.

## Level 2

```ts
class Timer {
  label: string
  elapsedSeconds: number

  constructor(label: string, elapsedSeconds: number = 0) {
    this.label = label
    this.elapsedSeconds = elapsedSeconds
  }

  tick(): void {
    this.elapsedSeconds += 1
  }

  reset(): void {
    this.elapsedSeconds = 0
  }

  summary(): string {
    return this.label + ': ' + this.elapsedSeconds + ' seconds'
  }
}

const study = new Timer('Study')
const breakTimer = new Timer('Break')
study.tick()
console.log(study.summary())     // Study: 1 seconds
console.log(breakTimer.summary()) // Break: 0 seconds

breakTimer.tick()
console.log(breakTimer.summary()) // Break: 1 seconds — study is untouched
```

Each `new Timer` creates its own `elapsedSeconds` field. The `tick` method is shared behavior, but it updates the instance that received the call.

## Level 3

```ts
// 1. CourseProgress
class CourseProgress {
  title: string
  totalLessons: number
  completedLessons: number

  constructor(title: string, totalLessons: number) {
    this.title = title
    this.totalLessons = totalLessons
    this.completedLessons = 0
  }

  completeLesson(): void {
    if (this.completedLessons < this.totalLessons) {
      this.completedLessons += 1
    }
  }

  percentComplete(): number {
    return Math.round((this.completedLessons / this.totalLessons) * 100)
  }

  status(): string {
    if (this.completedLessons === 0) {
      return 'Not started'
    }
    if (this.completedLessons === this.totalLessons) {
      return 'Complete'
    }
    return 'In progress'
  }
}

const course = new CourseProgress('TypeScript', 20)
console.log(course.status())          // Not started
course.completeLesson()
console.log(course.percentComplete()) // 5
console.log(course.status())          // In progress

// 2. Stopwatch — tick before start is ignored; reset always works
class Stopwatch {
  label: string
  running: boolean
  elapsedSeconds: number

  constructor(label: string) {
    this.label = label
    this.running = false
    this.elapsedSeconds = 0
  }

  start(): void {
    this.running = true
  }

  tick(): void {
    if (this.running) {
      this.elapsedSeconds += 1
    }
  }

  reset(): void {
    this.running = false
    this.elapsedSeconds = 0
  }

  summary(): string {
    return this.label + ': ' + this.elapsedSeconds + ' seconds'
  }
}

const watch = new Stopwatch('Sprint')
watch.tick()
console.log(watch.summary()) // Sprint: 0 seconds — not running yet
watch.start()
watch.tick()
console.log(watch.summary()) // Sprint: 1 seconds
watch.reset()
console.log(watch.summary()) // Sprint: 0 seconds

// 3. The catalog — instances are ordinary objects in arrays
const catalog = [
  new ReadingProgress('JavaScript', 18),
  new ReadingProgress('TypeScript', 4),
  new ReadingProgress('HTML/CSS', 9)
]

for (const entry of catalog) {
  console.log(entry.summary())
}

// 4. The decision memo
// A class wins when many instances share shape AND behavior AND that behavior
// mutates per-instance state (Timer, ReadingProgress).
// A plain object + function wins for one-off data (a config object) or stateless
// helpers (a group of pure functions), where a class would add ceremony.
```

The catalog and decision memo apply the same mental model: instances are ordinary objects, and a class is only the right tool when the recipe earns its structure.