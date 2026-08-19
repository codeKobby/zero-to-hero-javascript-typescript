// Day 30 - JavaScript: offline weather API boundary
const records = [
  { city: 'Accra', temperature: 29, humidity: 72, condition: 'Sunny' },
  { city: 'London', temperature: 14, humidity: 78, condition: 'Cloudy' },
  { city: 'Tokyo', temperature: 22, humidity: 65, condition: 'Rainy' },
  { city: 'New York', temperature: 18, humidity: 60, condition: 'Clear' }
]

const state = { current: null, favorites: [], status: 'idle' }
const form = document.querySelector('#search-form')
const input = document.querySelector('#city')
const status = document.querySelector('#status')
const result = document.querySelector('#result')
const favorites = document.querySelector('#favorites')

if (!(form instanceof HTMLFormElement) ||
    !(input instanceof HTMLInputElement) ||
    !(status instanceof HTMLElement) ||
    !(result instanceof HTMLElement) ||
    !(favorites instanceof HTMLElement)) {
  throw new Error('Weather starter HTML is incomplete.')
}

function getWeather(city) {
  const match = records.find((record) => record.city.toLowerCase() === city.toLowerCase())
  return match === undefined
    ? Promise.reject(new Error('City not found in the offline demo.'))
    : Promise.resolve(match)
}

function saveFavorites() {
  try {
    localStorage.setItem('day30-favorites', JSON.stringify(state.favorites))
  } catch {
    // Preferences are optional; the search still works.
  }
}

function render() {
  status.textContent = state.status === 'loading' ? 'Loading...' :
    state.status === 'error' ? 'Could not load that city.' : ''
  result.replaceChildren()
  if (state.current !== null) {
    const heading = document.createElement('h2')
    heading.textContent = state.current.city
    const details = document.createElement('p')
    details.textContent = state.current.temperature + '°C · ' +
      state.current.condition + ' · Humidity ' + state.current.humidity + '%'
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = state.favorites.includes(state.current.city)
      ? 'Remove favorite' : 'Add favorite'
    button.addEventListener('click', () => {
      state.favorites = state.favorites.includes(state.current.city)
        ? state.favorites.filter((city) => city !== state.current.city)
        : [...state.favorites, state.current.city]
      saveFavorites()
      render()
    })
    result.append(heading, details, button)
  }
  favorites.replaceChildren()
  for (const city of state.favorites) {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = city
    button.addEventListener('click', () => search(city))
    favorites.append(button)
  }
}

async function search(city) {
  const query = city.trim()
  if (query === '') return
  state.status = 'loading'
  render()
  try {
    state.current = await getWeather(query)
    state.status = 'success'
  } catch {
    state.current = null
    state.status = 'error'
  }
  render()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  search(input.value)
})

try {
  const saved = JSON.parse(localStorage.getItem('day30-favorites') ?? '[]')
  if (Array.isArray(saved) && saved.every((city) => typeof city === 'string')) {
    state.favorites = saved
  }
} catch {}

render()
