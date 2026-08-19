export {}

// Day 34 - TypeScript: fetch with a deterministic data URL
type User = { id: number; name: string }
const payload = encodeURIComponent(JSON.stringify([
  { id: 1, name: 'Mina' },
  { id: 2, name: 'Kai' }
]))
const localDataUrl = 'data:application/json,' + payload

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('HTTP ' + response.status)
  return response.json()
}

function isUser(value: unknown): value is User {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string'
}

async function run(): Promise<void> {
  const data = await getJson(localDataUrl)
  if (!Array.isArray(data) || !data.every(isUser)) {
    throw new Error('Response did not match the User shape')
  }
  console.log('Fetched records:', data.length)
  console.log('First record:', data[0])
}

run().catch((error: unknown) => {
  if (error instanceof Error) console.error('Request failed:', error.message)
})

// Try this, read the error, then restore the comment:
// await fetch(localDataUrl, {
//   method: 'POST',
//   body: { title: 'Practice' }
// })
