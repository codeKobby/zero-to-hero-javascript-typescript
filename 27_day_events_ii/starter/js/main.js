// Day 27 - JavaScript: delegation, forms, and keyboard input
const list = document.querySelector('#task-list')
const form = document.querySelector('#task-form')
const output = document.querySelector('#output')

if (!(list instanceof HTMLUListElement) ||
    !(form instanceof HTMLFormElement) ||
    !(output instanceof HTMLParagraphElement)) {
  throw new Error('The starter HTML is missing required elements.')
}

function addTask(label) {
  const item = document.createElement('li')
  item.className = 'task'
  item.innerHTML = '<span></span> <button type="button">Remove</button>'
  const labelElement = item.querySelector('span')
  if (labelElement !== null) labelElement.textContent = label
  list.append(item)
}

list.addEventListener('click', (event) => {
  if (event.target instanceof HTMLButtonElement) {
    const item = event.target.closest('.task')
    if (item instanceof HTMLLIElement) item.remove()
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(form)
  const name = data.get('name')
  output.textContent = typeof name === 'string' ? 'Hello, ' + name : 'Name is required.'
})

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
    event.preventDefault()
    output.textContent = 'Draft shortcut triggered.'
  }
})

addTask('Delegated task')
