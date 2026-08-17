export {}

// Day 33 — Async/Await — TypeScript Starter

async function loadData(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data: unknown = await response.json()
    console.log(data)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed:', error.message)
    }
  }
}

// Sequential vs Parallel
async function loadSequential(): Promise<void> {
  console.time('sequential')
  await fetch('https://jsonplaceholder.typicode.com/users')
  await fetch('https://jsonplaceholder.typicode.com/posts')
  console.timeEnd('sequential')
}

async function loadParallel(): Promise<void> {
  console.time('parallel')
  await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/posts')
  ])
  console.timeEnd('parallel')
}

loadData()
