// Day 25 - JavaScript: create, append, and remove DOM nodes
const list = document.querySelector('#task-list')
const output = document.querySelector('#output')

if (list === null || output === null) {
  throw new Error('The starter HTML is missing required elements.')
}

function addTask(label) {
  const item = document.createElement('li')
  item.classList.add('task')
  item.dataset.status = 'open'
  item.textContent = label
  list.append(item)
  return item
}

const task = addTask('Practice safe DOM updates')
task.classList.toggle('is-complete')
output.textContent = 'Created one task with status: ' + task.dataset.status
