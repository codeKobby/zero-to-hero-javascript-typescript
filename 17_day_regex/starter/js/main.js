// Day 17 — JavaScript Starter: Regular Expressions
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  return emailRegex.test(email)
}

console.log(isValidEmail('alice@test.com'))
console.log(isValidEmail('invalid'))

// Named capture groups
function parsePhone(phoneStr) {
  var regex = /(?<area>\d{3})-(?<exchange>\d{3})-(?<number>\d{4})/
  var match = regex.exec(phoneStr)
  if (!match || !match.groups) return null
  return match.groups
}

var phone = parsePhone('555-123-4567')
if (phone) {
  console.log('Phone: (' + phone.area + ') ' + phone.exchange + '-' + phone.number)
}

// Extract hashtags
function extractHashtags(text) {
  var matches = text.matchAll(/#(\w+)/g)
  var results = []
  for (var m of matches) {
    results.push(m[1])
  }
  return results
}

console.log(extractHashtags('Loving #TypeScript and #JavaScript today'))
