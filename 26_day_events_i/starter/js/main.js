// Day 26 - JavaScript: events and debounced input
const button = document.querySelector('#click-button')
const input = document.querySelector('#search')
const output = document.querySelector('#output')

if (!(button instanceof HTMLButtonElement) ||
    !(input instanceof HTMLInputElement) ||
    !(output instanceof HTMLParagraphElement)) {
  throw new Error('The starter HTML is missing required elements.')
}

let count = 0
button.addEventListener('click', () => {
  count += 1
  output.textContent = 'Clicks: ' + count
})

function debounce(callback, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}

const showSearch = debounce((value) => {
  output.textContent = 'Searching for: ' + value
}, 300)

input.addEventListener('input', (event) => {
  if (event.currentTarget instanceof HTMLInputElement) {
    showSearch(event.currentTarget.value)
  }
})
