export {}

// Day 26: Events I
// Run in browser with index.html

type EventCallback<T extends Event> = (event: T) => void

function on<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  handler: EventCallback<HTMLElementEventMap[K]>
): void {
  el.addEventListener(type, handler as EventListener)
}

function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

// Usage:
// const btn = document.querySelector('button')!
// on(btn, 'click', (e) => console.log('Clicked!', e.clientX))

// const input = document.querySelector('input')!
// const logInput = debounce((val: string) => console.log(val), 300)
// on(input, 'input', (e) => logInput(e.target.value))

console.log('Day 26: Events — open in browser to test')
