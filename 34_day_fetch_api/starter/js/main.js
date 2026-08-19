// Day 34 - JavaScript: fetch with a deterministic data URL
const payload = encodeURIComponent(JSON.stringify([
  { id: 1, name: 'Mina' },
  { id: 2, name: 'Kai' }
]))
const localDataUrl = 'data:application/json,' + payload

async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error('HTTP ' + response.status)
  return response.json()
}

async function run() {
  const data = await getJson(localDataUrl)
  console.log('Fetched records:', data.length)
  console.log('First record:', data[0])
}

run().catch((error) => console.error('Request failed:', error.message))
