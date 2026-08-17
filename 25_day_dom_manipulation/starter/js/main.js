// Day 25 — JavaScript Starter: DOM Manipulation
// Run in browser with index.html

function escapeHtml(str) {
  var div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function createElement(tag, attrs, text) {
  var el = document.createElement(tag)
  if (attrs) {
    var keys = Object.keys(attrs)
    for (var i = 0; i < keys.length; i++) {
      el.setAttribute(keys[i], attrs[keys[i]])
    }
  }
  if (text) el.textContent = text
  return el
}

// Usage (browser):
// var card = createElement('div', { class: 'card', id: 'user-1' }, 'Hello')
// document.body.appendChild(card)

console.log('Day 25: DOM Manipulation — open in browser to test')
