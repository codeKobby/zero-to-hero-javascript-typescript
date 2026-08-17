// Day 40 — JavaScript Equivalent: Best Practices (plain JS)

// Use descriptive variable names
var userName = 'Alice'

// Use const for values that won't change
var API_URL = 'https://api.example.com'

// Use optional chaining for safe access
var user = { name: 'Alice', address: { city: 'NYC' } }
var city = user?.address?.city ?? 'Unknown'
console.log(city)

// Use discriminated unions (works in JS too):
function handleState(state) {
  switch (state.status) {
    case 'idle': return 'Waiting...'
    case 'loading': return 'Loading...'
    case 'success': return 'Got: ' + state.data
    case 'error': return 'Error: ' + state.message
  }
}

console.log(handleState({ status: 'success', data: 'done' }))

// Error handling pattern:
function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

console.log(safeParse('{"ok":true}'))
console.log(safeParse('bad'))
