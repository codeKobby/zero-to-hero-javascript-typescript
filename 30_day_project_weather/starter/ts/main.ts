export {}

// Day 30 - TypeScript: offline weather API boundary
type Weather = {
  city: string
  temperature: number
  humidity: number
  condition: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'
const records: Weather[] = [
  { city: 'Accra', temperature: 29, humidity: 72, condition: 'Sunny' },
  { city: 'London', temperature: 14, humidity: 78, condition: 'Cloudy' },
  { city: 'Tokyo', temperature: 22, humidity: 65, condition: 'Rainy' },
  { city: 'New York', temperature: 18, humidity: 60, condition: 'Clear' }
]

const state: { current: Weather | null; favorites: string[]; status: Status } =
  { current: null, favorites: [], status: 'idle' }
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

const ui = { status, result, favorites }

function getWeather(city: string): Promise<Weather> {
  const match = records.find((record) => record.city.toLowerCase() === city.toLowerCase())
  return match === undefined
    ? Promise.reject(new Error('City not found in the offline demo.'))
    : Promise.resolve(match)
}

function saveFavorites(): void {
  try {
    localStorage.setItem('day30-favorites', JSON.stringify(state.favorites))
  } catch {
    // Preferences are optional; the search still works.
  }
}

function render(
  status: HTMLElement,
  result: HTMLElement,
  favorites: HTMLElement
): void {
  status.textContent = state.status === 'loading' ? 'Loading...' :
    state.status === 'error' ? 'Could not load that city.' : ''
  result.replaceChildren()
  const current = state.current
  if (current !== null) {
    const heading = document.createElement('h2')
    heading.textContent = current.city
    const details = document.createElement('p')
    details.textContent = current.temperature + '°C · ' +
      current.condition + ' · Humidity ' + current.humidity + '%'
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = state.favorites.includes(current.city)
      ? 'Remove favorite' : 'Add favorite'
    button.addEventListener('click', () => {
      state.favorites = state.favorites.includes(current.city)
        ? state.favorites.filter((city) => city !== current.city)
        : [...state.favorites, current.city]
      saveFavorites()
render(status, result, favorites)

// Try this, read the error, then restore the comment:
// const current = state.current
// console.log(current.temperature)
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

async function search(city: string): Promise<void> {
  const query = city.trim()
  if (query === '') return
  state.status = 'loading'
  render(ui.status, ui.result, ui.favorites)
  try {
    state.current = await getWeather(query)
    state.status = 'success'
  } catch {
    state.current = null
    state.status = 'error'
  }
  render(ui.status, ui.result, ui.favorites)
}

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  void search(input.value)
})

try {
  const saved: unknown = JSON.parse(localStorage.getItem('day30-favorites') ?? '[]')
  if (Array.isArray(saved) && saved.every((city): city is string => typeof city === 'string')) {
    state.favorites = saved
  }
} catch {}

render(status, result, favorites)
