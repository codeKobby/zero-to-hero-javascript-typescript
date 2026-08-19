export {}

// Day 27 - TypeScript: delegation, forms, and keyboard input
type FormValues = {
  name: string
  email: string
}

const list = document.querySelector('#task-list')
const form = document.querySelector('#task-form')
const output = document.querySelector('#output')

if (!(list instanceof HTMLUListElement) ||
    !(form instanceof HTMLFormElement) ||
    !(output instanceof HTMLParagraphElement)) {
  throw new Error('The starter HTML is missing required elements.')
}

function addTask(list: HTMLUListElement, label: string): void {
  const item = document.createElement('li')
  item.className = 'task'
  const labelElement = document.createElement('span')
  labelElement.textContent = label
  const removeButton = document.createElement('button')
  removeButton.type = 'button'
  removeButton.textContent = 'Remove'
  item.append(labelElement, ' ', removeButton)
  list.append(item)
}

function readFormValues(form: HTMLFormElement): FormValues | null {
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  if (typeof name !== 'string' || typeof email !== 'string' || name.trim() === '') {
    return null
  }
  return { name: name.trim(), email: email.trim() }
}

list.addEventListener('click', (event: MouseEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    const item = event.target.closest('.task')
    if (item instanceof HTMLLIElement) item.remove()
  }
})

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const values = readFormValues(form)
  output.textContent = values === null ? 'Name is required.' : 'Hello, ' + values.name
})

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
    event.preventDefault()
    output.textContent = 'Draft shortcut triggered.'
  }
})

addTask(list, 'Delegated task')

// Try this, read the error, then restore the comment:
// const data = new FormData(form)
// const name: string = data.get('name')
