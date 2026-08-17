// Day 28 — JavaScript Starter: Functional Programming

// Pure function
function add(a, b) {
  return a + b
}

// Pipe — left to right composition
function pipe() {
  var fns = Array.prototype.slice.call(arguments)
  return function (input) {
    return fns.reduce(function (acc, fn) { return fn(acc) }, input)
  }
}

var transform = pipe(
  function (x) { return x + 1 },
  function (x) { return x * 2 },
  function (x) { return x - 3 }
)

console.log('Pipe result:', transform(5))  // ((5+1)*2)-3 = 9

// Immutability helper
function updateUser(user, updates) {
  return Object.assign({}, user, updates)
}

var user = { name: 'Alice', age: 25, role: 'admin' }
var updated = updateUser(user, { age: 26 })
console.log('Original:', user)
console.log('Updated:', updated)
