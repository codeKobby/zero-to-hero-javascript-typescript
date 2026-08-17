// Day 24 — JavaScript Starter: DOM Selection
// Run in browser with index.html

function selectElement(selector) {
  var el = document.querySelector(selector)
  if (!el) throw new Error('Element "' + selector + '" not found')
  return el
}

function selectById(id) {
  var el = document.getElementById(id)
  if (!el) throw new Error('Element #' + id + ' not found')
  return el
}

// Usage (browser):
// var header = selectElement('h1')
// header.textContent = 'Hello from Day 24!'
// var input = selectById('email')
// console.log(input.value)

console.log('Day 24: DOM Selection — open in browser to test')
