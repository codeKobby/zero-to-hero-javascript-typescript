export {}

// Day 27: Events II — Delegation, Forms, Keyboard
// Run in browser with index.html

interface FormData {
  [key: string]: string
}

function getFormData(form: HTMLFormElement): FormData {
  const data: FormData = {}
  const formData = new FormData(form)
  formData.forEach((value, key) => {
    data[key] = value.toString()
  })
  return data
}

function createKeyboardShortcuts(): void {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      console.log('Save triggered')
    }
    if (e.key === 'Escape') {
      console.log('Close/cancel triggered')
    }
  })
}

// Custom event pattern
function emitCustomEvent<T>(el: HTMLElement, name: string, detail: T): void {
  el.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }))
}

// Usage:
// const form = document.getElementById('myForm') as HTMLFormElement
// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const data = getFormData(form)
//   console.log(data)
// })

console.log('Day 27: Events II — open in browser to test')
