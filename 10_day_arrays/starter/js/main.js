const originalTasks = ['Read', 'Practise']

console.log('First task:', originalTasks[0])
console.log('Last task:', originalTasks.at(-1))

const copiedTasks = [...originalTasks]
copiedTasks.push('Build')

console.log('Original tasks:', originalTasks)
console.log('Copied tasks:', copiedTasks)

const completedTask = copiedTasks.pop()
console.log('Completed task:', completedTask)
console.log('After pop:', copiedTasks)
