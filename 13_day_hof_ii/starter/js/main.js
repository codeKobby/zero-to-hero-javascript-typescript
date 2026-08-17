// Day 13 — JavaScript Starter: Higher-Order Functions II
var todos = [
  { id: 1, text: 'Learn TypeScript', completed: true, priority: 'high' },
  { id: 2, text: 'Build project', completed: false, priority: 'high' },
  { id: 3, text: 'Write tests', completed: false, priority: 'medium' },
  { id: 4, text: 'Deploy', completed: false, priority: 'low' }
]

// every
var allComplete = todos.every(function (t) { return t.completed })
console.log('All complete:', allComplete)

// some
var hasHigh = todos.some(function (t) { return t.priority === 'high' })
console.log('Has high priority:', hasHigh)

// find
var firstIncomplete = todos.find(function (t) { return !t.completed })
console.log('First incomplete:', firstIncomplete && firstIncomplete.text)

// findIndex
var deployIdx = todos.findIndex(function (t) { return t.text === 'Deploy' })
console.log('Deploy index:', deployIdx)

// sort
var sorted = todos.slice().sort(function (a, b) {
  var order = { high: 0, medium: 1, low: 2 }
  return order[a.priority] - order[b.priority]
})
console.log('Sorted:', sorted.map(function (t) { return t.text + ' (' + t.priority + ')' }))
