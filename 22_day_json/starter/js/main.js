// Day 22 — JavaScript Starter: JSON & APIs

// Safe JSON parse
function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(text)
  } catch {
    return fallback
  }
}

var jsonData = '{"id":1,"name":"Alice","email":"alice@test.com"}'
var user = safeJsonParse(jsonData, { id: 0, name: 'Unknown', email: '' })
console.log(user)

// Filter sensitive fields
function safeStringify(obj, allowedKeys) {
  var filtered = {}
  for (var i = 0; i < allowedKeys.length; i++) {
    var key = allowedKeys[i]
    if (key in obj) filtered[key] = obj[key]
  }
  return JSON.stringify(filtered, null, 2)
}

var rawData = { name: 'Alice', email: 'alice@test.com', password: 'secret', age: 25 }
console.log(safeStringify(rawData, ['name', 'email', 'age']))
