# Day 12 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `tens` → `[10, 20, 30]`.
2. `longWords` → `['tiger', 'eagle']` (`cat`, `owl` are length 3).
3. `total` → `60` (10 + 20 + 30).
4. `result` → `undefined` — `forEach` returns nothing, even though each callback returns a string.
5. → `['0: 5', '1: 10']` — the second callback argument is the index.
6. → `[4]` — only 4 is even.
7. → `6` (1 × 1 × 2 × 3); start at `1` because multiplying by 0 would zero everything.
8. The source `[2, 4]` is unchanged; `doubled` → `[4, 8]`.
9. → `[78, 91, 65]` — 42 and 49 are below 50, so `filter` drops them.
10. `day12:js` and `day12` run; `npm run check` passes.

## Level 2

```js
// 1. map
const tens = [1, 2, 3].map(number => number * 10)

// 2. filter
const longWords = ['cat', 'tiger', 'owl', 'eagle']
  .filter(word => word.length > 4)

// 3. reduce
const total = [10, 20, 30].reduce((runningTotal, number) => {
  return runningTotal + number
}, 0)

// 4. forEach
;['red', 'green', 'blue'].forEach(color => {
  console.log(color)
})

// 6. Sentence with reduce — no leading comma
const names = ['Ada', 'Grace', 'Linus']
const sentence = names.reduce((sentenceSoFar, name, index) => {
  if (index === 0) return name
  return sentenceSoFar + ', ' + name
}, '')
console.log(sentence) // Ada, Grace, Linus
// The first item is used whole; the separator is added only before later items.
```

```ts
// 5. map with checked types
const scores: number[] = [42, 78, 91]
const labels: string[] = scores.map((score: number): string => {
  return 'Score: ' + score
})
console.log(labels) // ['Score: 42', 'Score: 78', 'Score: 91']
```

## Level 3

```js
// 1. The pipeline
const products = [
  { name: 'Notebook', price: 12 },
  { name: 'Pen', price: 2 },
  { name: 'Backpack', price: 45 },
  { name: 'Marker', price: 25 }
]
const budgetNames = products
  .filter(product => product.price < 20)        // [Notebook, Pen]
  .map(product => product.name)                  // ['Notebook', 'Pen']
// Stage 1: filter keeps the two products under 20.
// Stage 2: map converts each kept product to just its name.

// 2. Count passing scores
const scores = [42, 78, 91, 49, 65]
const passingCount = scores.reduce((count, score) => {
  if (score >= 50) {
    return count + 1
  }
  return count
}, 0)
console.log(passingCount) // 3

// 3. myMap from scratch
function myMap(items, transform) {
  const result = []
  for (const item of items) {
    result.push(transform(item))
  }
  return result
}
console.log(myMap([1, 2, 3], n => n * 10)) // [10, 20, 30]

// 4. The selector story
const doubled = [1, 2, 3].map(n => n * 2)        // double every number
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0) // keep even numbers
const sum = [1, 2, 3].reduce((a, b) => a + b, 0)   // sum everything
;[1, 2, 3].forEach(n => console.log(n))            // log each name

// 5. The trace proof
// filter:  input 2,5,8 -> test n > 3 -> keep [5, 8]
// map:     input 5 -> return 50; input 8 -> return 80
// final: [50, 80]
console.log([2, 5, 8].filter(n => n > 3).map(n => n * 10)) // [50, 80]
```

## TypeScript

```ts
const scores: number[] = [42, 78, 91, 49, 65]

const passingScores: number[] = scores.filter((score: number): boolean => {
  return score >= 50
})

const doubledScores: number[] = passingScores.map((score: number): number => {
  return score * 2
})

const total: number = scores.reduce((runningTotal: number, score: number): number => {
  return runningTotal + score
}, 0)

// scores.map(score => score.toUpperCase())
// Error: Property 'toUpperCase' does not exist on type 'number'.
```