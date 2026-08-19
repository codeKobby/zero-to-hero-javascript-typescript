export {}

const originalTasks: string[] = ['Read', 'Practise']

const firstTask: string | undefined = originalTasks[0]
const lastTask: string | undefined = originalTasks.at(-1)
console.log('First task:', firstTask)
console.log('Last task:', lastTask)

const copiedTasks: string[] = [...originalTasks]
copiedTasks.push('Build')

console.log('Original tasks:', originalTasks)
console.log('Copied tasks:', copiedTasks)

const completedTask: string | undefined = copiedTasks.pop()
console.log('Completed task:', completedTask)
console.log('After pop:', copiedTasks)

type Point = [number, number]
const coordinate: Point = [12, 8]
console.log('Coordinate:', coordinate)

// Try this, read the error, then restore the comment:
// originalTasks.push(4)
