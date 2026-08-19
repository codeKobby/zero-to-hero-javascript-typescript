export {}

// Day 25 - TypeScript: create, append, and remove DOM nodes
const list = document.querySelector('#task-list')
const output = document.querySelector('#output')

if (!(list instanceof HTMLUListElement) || !(output instanceof HTMLParagraphElement)) {
  throw new Error('The starter HTML is missing required elements.')
}

function addTask(list: HTMLUListElement, label: string): HTMLLIElement {
  const item = document.createElement('li')
  item.classList.add('task')
  item.dataset.status = 'open'
  item.textContent = label
  list.append(item)
  return item
}

const task = addTask(list, 'Practice safe DOM updates')
task.classList.toggle('is-complete')
output.textContent = 'Created one task with status: ' + task.dataset.status

// Try this, read the error, then restore the comment:
// const generic = document.createElement('div')
// generic.disabled = true
