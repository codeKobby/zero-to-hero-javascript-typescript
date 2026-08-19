# Day 9 worked solutions

Read these only after attempting the exercise and tracing the code.

## Level 1

1. `'Dune'`
2. `book[key]` → `'Frank Herbert'` (uses the variable); `book.key` → `undefined` (looks for a key literally named `key`).
3. Works — adding a property mutates the object; `const` does not freeze properties.
4. Error — `const` forbids reassigning the variable to a different object.
5. `original.isAvailable` → `true`; `copy.isAvailable` → `false` — spread creates a new object.
6. `this` is `book`. If you extract the method and call it alone, `this` is `undefined` (in module/strict code) and the method fails.
7. An arrow captures the surrounding `this`, not the object it is written in — so `this.title` does not find the object's data.
8. The string `'Arrival'` — assignment stores a value in the property.
9. The computed string `'Dune by Frank Herbert'`; a getter is read like a property, so no parentheses.

## Level 2

```js
// 1. Movie object
const movie = {
  title: 'Arrival',
  director: 'Denis Villeneuve',
  year: 2016
}

// 2. Dot and dynamic-key reads
console.log(movie.title)          // Arrival
const key = 'director'
console.log(movie[key])           // Denis Villeneuve

// 3. Watched without changing the original
const watchedMovie = { ...movie, watched: true }
console.log(movie.watched)        // undefined (original untouched)
console.log(watchedMovie.watched) // true

// 4. Describe method
movie.describe = function () {
  return this.title + ' by ' + this.director
}
console.log(movie.describe()) // Arrival by Denis Villeneuve
```

```ts
// 5. Movie interface
interface Movie {
  title: string
  director: string
  year: number
}

const arrival: Movie = {
  title: 'Arrival',
  director: 'Denis Villeneuve',
  year: 2016
}

// arrival.year = '2016'
// Error: Type 'string' is not assignable to type 'number'.
```

## Level 3

```js
// 1. To-do item with closure id and toggle method
let nextId = 1

function createTodo(text) {
  const id = nextId
  nextId = nextId + 1

  return {
    id: id,
    text: text,
    done: false,
    toggle() {
      this.done = !this.done
      return this
    }
  }
}

const firstTodo = createTodo('Learn objects')
firstTodo.toggle()
console.log(firstTodo.done) // true

// 2. Product with describe and a formatter
const product = {
  name: 'Coffee mug',
  price: 12,
  describe() {
    return this.name + ' costs ' + this.price
  }
}

function formatPrice(item) {
  return '$' + item.price
}

console.log(product.describe())  // Coffee mug costs 12
console.log(formatPrice(product)) // $12

// 3. Checkout returns a new cart
const cart = { items: 3, total: 30 }
function checkout(cart) {
  return { ...cart, total: cart.total * 1.1 }
}
const receipt = checkout(cart)
console.log(cart.total)    // 30 (original unchanged)
console.log(receipt.total) // 33
// Without spread, mutating the return would change the caller's cart
// because both names would point to the same object.

// 4. Dynamic key
const movie = { title: 'Arrival', director: 'Denis Villeneuve' }
const key = 'director'
console.log(movie[key])   // Denis Villeneuve
// movie.key would look for a literal key named 'key' -> undefined.

// 5. This-mystery
const book = {
  title: 'Dune',
  describe() {
    return this.title
  }
}
console.log(book.describe()) // Dune (this is book)
const looseDescribe = book.describe
// console.log(looseDescribe()) // this is undefined -> crash
// The call site decides this: looseDescribe() has no object before the dot.
```

## TypeScript

```ts
interface Book {
  readonly id: number
  title: string
  author: string
  isAvailable: boolean
  genre?: string
}

// originalBook.id = 2
// Error: Cannot assign to 'id' because it is a read-only property.
```