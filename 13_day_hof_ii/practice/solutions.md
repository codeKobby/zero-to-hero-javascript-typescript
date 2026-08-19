# Day 13 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. → `true` — `'green'` is present.
2. → `true` — 12 is even, and `some` stops at the first `true`.
3. → `true` — 60, 72, 88 are all ≥ 50.
4. → `'planet'` — the first word longer than five letters.
5. `find` → `91` (the item itself); `some` → `true` (a boolean).
6. `sort()` compares values as **text**: `'10'` comes before `'2'`. The numeric order needs a comparator.
7. → `[3, 8, 15, 40]` — `a - b` is ascending.
8. → `[40, 15, 8, 3]` — `b - a` is descending.
9. `[].some(...)` → `false` (no matching item exists); `[].every(...)` → `true` (no item breaks the rule).
10. `day13:js` and `day13` run; `npm run check` passes.

## Level 2

```js
// 1. includes
const hasGreen = ['red', 'green', 'blue'].includes('green')
console.log(hasGreen) // true

// 2. some
const hasEven = [3, 7, 11, 12].some(value => value % 2 === 0)
console.log(hasEven) // true

// 3. every
const allPassing = [60, 72, 88].every(score => score >= 50)
console.log(allPassing) // true

// 4. find
const firstLongWord = ['sun', 'planet', 'moon'].find(word => word.length > 5)
console.log(firstLongWord) // planet

// 6. Safe sort — original untouched
const original = [15, 3, 40, 8]
const sorted = [...original].sort((left, right) => left - right)
console.log(original) // [15, 3, 40, 8]
console.log(sorted)   // [3, 8, 15, 40]
```

```ts
// 5. Product find, handling the missing case
interface Product {
  name: string
  price: number
}

const products: Product[] = [
  { name: 'Notebook', price: 8 },
  { name: 'Headphones', price: 45 }
]

const notebook: Product | undefined = products.find(product => product.name === 'Notebook')
if (notebook === undefined) {
  console.log('Notebook not found.')
} else {
  console.log(notebook.name, notebook.price)
}
```

## Level 3

```js
// 1. First duplicate
function firstDuplicate(values) {
  return values.find((value, index) => values.indexOf(value) !== index)
}
console.log(firstDuplicate([3, 5, 7, 3, 9])) // 3
// indexOf returns the FIRST occurrence; a later index means "seen before".

// 2. Search products
function searchProducts(products, text) {
  return products.filter(product => product.name.includes(text))
}
const catalog = [
  { name: 'Notebook', price: 8 },
  { name: 'Pencil case', price: 5 },
  { name: 'Headphones', price: 45 }
]
console.log(searchProducts(catalog, 'note')) // [Notebook]
console.log(searchProducts(catalog, 'zzz'))  // []

// 3. The question card
const present = roles.includes('admin')                        // is X present
const anyFailing = scores.some(score => score < 50)            // any failing score
const allAdults = ages.every(age => age >= 18)                 // all adults
const firstAdmin = users.find(user => user.role === 'admin')   // first admin object
const minaIndex = students.findIndex(s => s.name === 'Mina')   // index of Mina
const byPrice = [...products].sort((a, b) => a.price - b.price) // prices low to high

// 4. The empty-array story
// [].some(...) is false: there is no item to satisfy the test.
// [].every(...) is true: there is no item that violates the rule.
// A UI that says "all requirements met" on an empty checklist would be
// misleading, so check list.length first when that matters.

// 5. Safe sort helper
function sortCopy(items, comparator) {
  return [...items].sort(comparator)
}
const nums = [15, 3, 40, 8]
const ascending = sortCopy(nums, (a, b) => a - b)
console.log(nums)      // [15, 3, 40, 8]  (unchanged)
console.log(ascending) // [3, 8, 15, 40]
```

## TypeScript

```ts
const scores: number[] = [42, 78, 91, 49, 65]
const firstPassingScore: number | undefined = scores.find(score => score >= 50)
const hasExcellentScore: boolean = scores.some(score => score >= 90)
const everyScorePasses: boolean = scores.every(score => score >= 50)

if (firstPassingScore === undefined) {
  console.log('No passing score was found.')
} else {
  console.log(firstPassingScore.toFixed(2))
}

const originalNumbers: number[] = [10, 2, 30]
const ascendingNumbers: number[] = [...originalNumbers].sort((left, right) => left - right)

// console.log(firstPassingScore.toFixed(2))
// Error: 'firstPassingScore' is possibly 'undefined'.
```