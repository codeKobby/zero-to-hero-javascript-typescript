export {}

// Day 30 — Project: Weather Dashboard — TypeScript Starter

interface WeatherData {
  city: string
  temp: number
  humidity: number
  condition: string
  icon: string
}

const weatherData: WeatherData[] = [
  { city: 'New York', temp: 72, humidity: 60, condition: 'Sunny', icon: '☀️' },
  { city: 'London', temp: 55, humidity: 75, condition: 'Cloudy', icon: '☁️' },
  { city: 'Tokyo', temp: 68, humidity: 65, condition: 'Rainy', icon: '🌧️' },
  { city: 'Sydney', temp: 80, humidity: 50, condition: 'Clear', icon: '🌤️' },
  { city: 'Paris', temp: 60, humidity: 70, condition: 'Windy', icon: '💨' }
]

function searchCity(query: string): WeatherData[] {
  return weatherData.filter(w =>
    w.city.toLowerCase().includes(query.toLowerCase())
  )
}

weatherData.forEach(w => console.log(`${w.city}: ${w.temp}°F ${w.icon}`))
