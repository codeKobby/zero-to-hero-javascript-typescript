export {}

// Day 13: Higher-Order Functions II — every, some, find, sort
interface TodoItem {
  id: number
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const todos: TodoItem[] = [
  { id: 1, text: 'Learn TypeScript', completed: true, priority: 'high' },
  { id: 2, text: 'Build project', completed: false, priority: 'high' },
  { id: 3, text: 'Write tests', completed: false, priority: 'medium' },
  { id: 4, text: 'Deploy', completed: false, priority: 'low' }
]

// every
const allComplete: boolean = todos.every(t => t.completed)  // false

// some
const hasHighPriority: boolean = todos.some(t => t.priority === 'high')  // true

// find
const firstIncomplete: TodoItem | undefined = todos.find(t => !t.completed)

// findIndex
const deployIndex: number = todos.findIndex(t => t.text === 'Deploy')

// sort (non-mutating)
const sortedByPriority: TodoItem[] = [...todos].sort((a, b) => {
  const order = { high: 0, medium: 1, low: 2 }
  return order[a.priority] - order[b.priority]
})

console.log('All complete:', allComplete)
console.log('Has high priority:', hasHighPriority)
console.log('First incomplete:', firstIncomplete?.text)
console.log('Deploy index:', deployIndex)
console.log('Sorted:', sortedByPriority.map(t => `${t.text} (${t.priority})`))
