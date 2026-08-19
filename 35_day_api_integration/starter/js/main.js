// Day 35 - JavaScript: a small API client with an offline transport
const payload = encodeURIComponent(JSON.stringify([
  { id: 1, title: 'Practice API boundaries', completed: false },
  { id: 2, title: 'Validate response data', completed: true }
]))

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.cache = new Map()
  }

  async get(endpoint) {
    if (this.cache.has(endpoint)) return this.cache.get(endpoint)
    const response = await fetch(this.baseUrl + endpoint)
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const data = await response.json()
    this.cache.set(endpoint, data)
    return data
  }
}

async function run() {
  const api = new ApiClient('data:application/json,' + payload)
  const todos = await api.get('')
  if (!Array.isArray(todos)) throw new Error('Expected an array')
  console.log('Loaded records:', todos.length)
  console.log('Cache reused:', (await api.get('')) === todos)
}

run().catch((error) => console.error('API failure:', error.message))
