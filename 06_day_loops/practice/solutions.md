# Day 6 worked solutions

Read these only after attempting the exercise and tracing the loop.

## Level 1

1. `0 1 2` (starts at 0, stops before 3).
2. `2 3 4` (starts at 2, stops before 5).
3. `1 2 3 4 5` (`<= 5` includes 5).
4. `5 4 3 2 1` (change subtracts, stops below 1).
5. `3 2 1` then the loop ends (when `count` becomes 0 the check is false).
6. `Light: red`, `Light: yellow`, `Light: green`.
7. `1 2 4 5` (3 is skipped by `continue`).
8. `1 2 Found` (`break` exits at 3; 4 and 5 never run).

9. Four-step trace for exercise 1:

| Round | index before check | index < 3 | printed | index after change |
| --- | ---: | --- | ---: | ---: |
| 1 | 0 | true | 0 | 1 |
| 2 | 1 | true | 1 | 2 |
| 3 | 2 | true | 2 | 3 |
| 4 | 3 | false | nothing | loop ends |

## Level 2

```js
// 1. Numbers 1 through 5
for (let number = 1; number <= 5; number = number + 1) {
  console.log(number)
}

// 2. Colors
for (const color of ['red', 'yellow', 'green']) {
  console.log(color)
}

// 3. Countdown
let count = 3
while (count > 0) {
  console.log(count)
  count = count - 1
}
console.log('Lift off!')

// 4. Count values at least 10
const values = [12, 7, 20, 4]
let passingCount = 0
for (const value of values) {
  if (value >= 10) {
    passingCount = passingCount + 1
  }
}
console.log(passingCount) // 2

// 5. First score below 50
const scores = [82, 91, 47, 76, 40]
for (const score of scores) {
  console.log('Checking: ' + score)
  if (score < 50) {
    console.log('Found: ' + score)
    break
  }
}
// Checks 82, 91, then 47 — stops, so 76 and 40 never print.

// 6. Odd numbers with continue
for (let number = 1; number <= 10; number = number + 1) {
  if (number % 2 === 0) {
    continue
  }
  console.log(number)
}
```

## Level 3

```js
// 1. Build a string, print once
let built = ''
for (let index = 0; index < 5; index = index + 1) {
  built = built + index + ' '
}
console.log(built) // "0 1 2 3 4 "

// 2. Countdown with one named progress line
let count = 5
while (count > 0) {
  console.log(count)
  count = count - 1 // this line makes the loop stop
}
console.log('Lift off!')

// 3. Average to one decimal place
const marks = [88, 91, 76, 84, 95]
let total = 0
for (const mark of marks) {
  total = total + mark
}
console.log((total / marks.length).toFixed(1)) // 86.8

// 4. First boundary crossing with break
const values = [12, 7, 20, 4]
for (let index = 0; index < values.length; index = index + 1) {
  if (values[index] >= 10) {
    console.log('first value >= 10 at index ' + index)
    break
  }
}
// Prints index 0 (12), stops; 20 and 4 never checked.

// 5. Missing change line, explained and fixed
let lives = 3
// BUG BELOW: step 4 (change) is missing, so the check never
// becomes false and the loop never ends.
// while (lives > 0) { console.log(lives) }
// Corrected:
while (lives > 0) {
  console.log(lives)
  lives = lives - 1 // the change step
}
```

## TypeScript

```ts
// 6. Typed scores, deliberate error caught by the compiler
const scores: number[] = [88, 91, 76]
// scores.push('not a number')
// Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```