// Day 35 — API Integration — Starter

// Typed API client pattern
function createApiClient(baseUrl) {
  return {
    get: function (endpoint) {
      return fetch(baseUrl + endpoint).then(function (r) {
        if (!r.ok) throw new Error('API Error: ' + r.status)
        return r.json()
      })
    },
    post: function (endpoint, body) {
      return fetch(baseUrl + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).then(function (r) { return r.json() })
    }
  }
}

var api = createApiClient('https://jsonplaceholder.typicode.com')
api.get('/users').then(function (users) { console.log('Users:', users.length) })
