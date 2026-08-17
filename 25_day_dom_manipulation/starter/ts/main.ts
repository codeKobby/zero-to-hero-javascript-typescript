export {}

// Day 25: DOM Manipulation
// Run in browser with index.html

function escapeHtml(str: string): string {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  text?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag)
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value)
    }
  }
  if (text) el.textContent = text
  return el
}

// Usage:
// const card = createElement('div', { class: 'card', id: 'user-1' }, 'Hello')
// document.body.appendChild(card)

console.log('Day 25: DOM Manipulation — open in browser to test')
