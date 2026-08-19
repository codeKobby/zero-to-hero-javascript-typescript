// Day 24 - JavaScript: select required and optional elements
function requireElement(selector) {
  const element = document.querySelector(selector)
  if (element === null) {
    throw new Error('Required element not found: ' + selector)
  }
  return element
}

const title = requireElement('#page-title')
const emailInput = document.querySelector('input[type="email"]')
const cards = document.querySelectorAll('.lesson-card')
const output = requireElement('#output')

output.textContent = 'Found ' + cards.length + ' lesson cards.'
console.log('Title:', title.textContent)

if (emailInput instanceof HTMLInputElement) {
  emailInput.value = 'mina@example.com'
}
