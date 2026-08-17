// Day 38 — JavaScript Equivalent: Utility Patterns (plain JS)

// In plain JS, we manually implement what TypeScript does automatically:

// Pick — select specific fields
function pick(obj, keys) {
  var result = {}
  keys.forEach(function (key) {
    if (key in obj) result[key] = obj[key]
  })
  return result
}

// Omit — remove fields
function omit(obj, keys) {
  var result = Object.assign({}, obj)
  keys.forEach(function (key) { delete result[key] })
  return result
}

// Readonly — freeze
function readonly(obj) {
  return Object.freeze(Object.assign({}, obj))
}

var user = { id: 1, name: 'Alice', email: 'alice@test.com', role: 'admin' }

console.log(pick(user, ['id', 'name']))
console.log(omit(user, ['email', 'role']))
console.log(readonly(user))
