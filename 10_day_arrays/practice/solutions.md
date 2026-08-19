# Day 10 worked solutions

Read these only after attempting the exercise and tracing the code.

## Level 1

1. `'red'`, `'green'`, `3`
2. `undefined` — and it is not an error by itself; the danger is later code assuming it is a real item.
3. `3` (`length - 1`)
4. The new length, not the item.
5. `pop` returns the removed item, and the array becomes `[]`.
6. `undefined` — expected, not an error.
7. `originalTasks` → `['Read', 'Practise']`; `copiedTasks` → `['Read', 'Practise', 'Build']` — spread created a new array.
8. `['Read', 'Practise', 'Surprise']` — assignment made both names point to one array.
9. `'red'` and `'green'`

## Level 2

```js
// 1. First and last titles
const books = ['Dune', 'Beloved', 'Kindred']
console.log(books[0])      // Dune
console.log(books.at(-1))  // Kindred

// 2. Push then pop, predicting each result
const tasks = ['Read']
const newLength = tasks.push('Practise')
console.log(newLength)        // 2
const finished = tasks.pop()
console.log(finished)         // Practise
console.log(tasks)            // ['Read']

// 3. Copy, modify only the copy
const originalTasks = ['Read', 'Practise']
const copiedTasks = [...originalTasks]
copiedTasks.push('Build')
console.log(originalTasks) // ['Read', 'Practise']
console.log(copiedTasks)   // ['Read', 'Practise', 'Build']

// 6. First item function
function firstItem(items) {
  return items.at(0)
}
console.log(firstItem(books)) // Dune
```

```ts
// 4. number[] rejects a string
// const books: string[] = ['Dune', 'Beloved', 'Kindred']
// books.push(4)
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// 5. Point tuple
type Point = [number, number]
const coordinate: Point = [12, 8]
```

## Level 3

```js
// 1. Push only if unique
function pushIfUnique(items, value) {
  if (!items.includes(value)) {
    items.push(value)
  }
  return items.length
}

const colors = ['red', 'yellow']
console.log(pushIfUnique(colors, 'green')) // 3
console.log(pushIfUnique(colors, 'red'))   // 3 (already present)

// 2. Queue helpers
function enqueue(items, value) {
  items.push(value)
  return items.length
}
function dequeue(items) {
  return items.shift()
}

const queue = ['first']
enqueue(queue, 'second')
console.log(dequeue(queue)) // first
console.log(queue)          // ['second']

// 3. Unchanged copy
function addItem(items, value) {
  return [...items, value]
}
const base = ['Read']
const extended = addItem(base, 'Practise')
console.log(base)     // ['Read']            (caller's array untouched)
console.log(extended) // ['Read', 'Practise']
// addItem never calls a mutating method; it builds a new array with spread.

// 4. Safe average
function average(numbers) {
  if (numbers.length === 0) {
    return 0 // or throw — never divide by zero
  }
  let total = 0
  for (const number of numbers) {
    total = total + number
  }
  return total / numbers.length
}
console.log(average([88, 91, 76])) // 85
console.log(average([]))           // 0
// Without the guard, total / 0 is NaN.

// 5. Tuple vs object
type Coordinate = [number, number]
type Location = { x: number; y: number }

const coord: Coordinate = [12, 8]
const loc: Location = { x: 12, y: 8 }
// Tuple: position is the meaning (row, column). Object: the meaning is
// in the names (x, y) — clearer when the fields matter to the reader.
```

## TypeScript

```ts
const originalTasks: string[] = ['Read', 'Practise']
// originalTasks.push(4)
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```