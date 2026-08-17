// Day 37 — JavaScript Equivalent: Generics (using patterns)

// In plain JS, we use duck typing instead of generics:
function identity(value) {
  return value
}

console.log(identity(42))
console.log(identity('hello'))

// "Constraint" pattern — just check at runtime:
function logLength(value) {
  if (!value || typeof value.length === 'undefined') {
    throw new Error('Value must have a length property')
  }
  console.log('Length:', value.length)
}

logLength('hello')
logLength([1, 2, 3])

// Generic-like container:
function createContainer(item) {
  return {
    get: function () { return item },
    set: function (newItem) { item = newItem }
  }
}

var container = createContainer('hello')
console.log(container.get())
