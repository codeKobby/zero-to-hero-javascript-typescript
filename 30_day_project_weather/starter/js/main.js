// Day 30 — Project: Weather Dashboard — Starter
// Build a weather dashboard using local JSON data and TypeScript

var weatherData = [
  { city: 'New York', temp: 72, humidity: 60, condition: 'Sunny', icon: '☀️' },
  { city: 'London', temp: 55, humidity: 75, condition: 'Cloudy', icon: '☁️' },
  { city: 'Tokyo', temp: 68, humidity: 65, condition: 'Rainy', icon: '🌧️' },
  { city: 'Sydney', temp: 80, humidity: 50, condition: 'Clear', icon: '🌤️' },
  { city: 'Paris', temp: 60, humidity: 70, condition: 'Windy', icon: '💨' }
]

var favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

function displayWeather(data) {
  console.log(data.city + ': ' + data.temp + '°F ' + data.icon)
}

function searchCity(query) {
  return weatherData.filter(function (w) {
    return w.city.toLowerCase().includes(query.toLowerCase())
  })
}

// Start
weatherData.forEach(displayWeather)
