export {}

// Day 24 - TypeScript: select required and optional elements
function requireElement(selector: string): Element {
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

// Try this, read the error, then restore the comment:
// const email = document.querySelector('input[type="email"]')
// console.log(email.value)
