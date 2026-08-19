export {}

// Day 26 - TypeScript: events and debounced input
const button = document.querySelector('#click-button')
const input = document.querySelector('#search')
const output = document.querySelector('#output')

if (!(button instanceof HTMLButtonElement) ||
    !(input instanceof HTMLInputElement) ||
    !(output instanceof HTMLParagraphElement)) {
  throw new Error('The starter HTML is missing required elements.')
}

let count: number = 0
button.addEventListener('click', () => {
  count += 1
  output.textContent = 'Clicks: ' + count
})

function debounce<T extends (...args: string[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(...args), delay)
  }
}

const showSearch = debounce((value: string) => {
  output.textContent = 'Searching for: ' + value
}, 300)

input.addEventListener('input', (event: Event) => {
  if (event.currentTarget instanceof HTMLInputElement) {
    showSearch(event.currentTarget.value)
  }
})

// Try this, read the error, then restore the comment:
// input.addEventListener('input', (event: Event) => {
//   console.log(event.target.value)
// })
