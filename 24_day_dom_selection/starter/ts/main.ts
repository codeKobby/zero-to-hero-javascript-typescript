export {}

// Day 24: DOM Selection
// Run in browser with index.html

function selectElement<K extends keyof HTMLElementTagNameMap>(
  selector: K
): HTMLElementTagNameMap[K] {
  const el = document.querySelector(selector)
  if (!el) throw new Error(`Element "${selector}" not found`)
  return el
}

function selectById<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Element #${id} not found`)
  return el as T
}

// Usage (browser only):
// const header = selectElement('h1')
// const input = selectById<HTMLInputElement>('email')

console.log('Day 24: DOM Selection — open in browser to test')

// Safe optional chaining for DOM:
// document.querySelector('#app')?.classList.add('loaded')
// document.querySelector('#missing')?.textContent  // undefined — no error
