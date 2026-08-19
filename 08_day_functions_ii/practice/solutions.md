# Day 8 worked solutions

Read these only after attempting the exercise and tracing the calls.

## Level 1

1. `f()` → `'Hi'`; `sayHi` alone is the function value itself, not a result.
2. `runTask(washDishes)` passes the function; `runTask(washDishes())` calls it early and passes the string.
3. `15`
4. `25`
5. `'n: 5'` — the callback receives a number and returns a string, so this callback's shape is `(number) => string`.
6. `double` stores the returned function (the closure); `double(6)` → `12`.
7. `1`, `2`, then `1` — the second counter has its own `count`.
8. `12`
9. `undefined` — a callback with no `return` sends nothing back.

## Level 2

```js
// 1. Run twice
function runTwice(action) {
  action()
  action()
}
runTwice(() => console.log('ping'))
// ping
// ping

// 2. Apply a callback
function applyToNumber(number, operation) {
  return operation(number)
}
console.log(applyToNumber(4, n => n * n)) // 16

// 3. Make an adder
function makeAdder(amount) {
  return function(value) {
    return value + amount
  }
}
const addFive = makeAdder(5)
console.log(addFive(10)) // 15

// 4. Make a greeting factory
function createGreeting(greeting) {
  return function(name) {
    return greeting + ', ' + name + '!'
  }
}
console.log(createGreeting('Welcome')('Ada')) // Welcome, Ada!

// 5. Two independent counters
function createCounter() {
  let count = 0
  return function() {
    count = count + 1
    return count
  }
}
const first = createCounter()
const second = createCounter()
console.log(first())  // 1
console.log(first())  // 2
console.log(second()) // 1

// 6. Price with a discount callback
function calculateTotal(price, applyDiscount) {
  return applyDiscount(price)
}
console.log(calculateTotal(80, p => p * 0.75)) // 60
```

## Level 3

```js
// 1. Score keeper with private state
function createScoreKeeper() {
  let score = 0

  return {
    add(points) {
      score = score + points
    },
    getScore() {
      return score
    }
  }
}
const keeper = createScoreKeeper()
keeper.add(10)
keeper.add(5)
console.log(keeper.getScore()) // 15

// 2. Operation pipeline
function chain(value, op1, op2) {
  return op2(op1(value))
}
console.log(chain(5, n => n * 2, n => n + 1)) // 11

// 3. Bank account with private balance
function createBankAccount(balance) {
  return {
    deposit(amount) {
      balance = balance + amount
      return balance
    },
    withdraw(amount) {
      balance = balance - amount
      return balance
    }
  }
}
const account = createBankAccount(100)
console.log(account.deposit(50))  // 150
console.log(account.withdraw(30)) // 120
// balance is not readable directly: it is a closure variable,
// reachable only by deposit and withdraw.

// 4. Counter factory with a starting value
function createCounter(start) {
  let count = start
  return function() {
    count = count + 1
    return count
  }
}
const fromTen = createCounter(10)
console.log(fromTen()) // 11
// Each createCounter call makes a new closure over its own count.

// 5. The timing story
function runTask(task) {
  const result = task()
  console.log(result)
}
runTask(() => 'Dishes are clean')
// Wrong version (do not run):
// runTask(() => 'Dishes are clean'())
// The arrow already returns a string; adding () tries to call
// the string as a function and throws.
```

## TypeScript

```ts
type StringFormatter = (text: string) => string

function applyToNumber(
  number: number,
  operation: (value: number) => number
): number {
  return operation(number)
}

// applyToNumber(5, 'double')
// Error: Argument of type 'string' is not assignable to parameter of type '(value: number) => number'.
```