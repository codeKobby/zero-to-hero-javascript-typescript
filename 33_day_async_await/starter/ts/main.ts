export {}

// Day 33 - TypeScript: async/await over local Promises
type User = { id: number; name: string }

function delayed<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

async function loadUser(id: number): Promise<User> {
  return delayed({ id, name: 'User ' + id }, 10)
}

async function run(): Promise<void> {
  const user = await loadUser(1)
  console.log('Sequential:', user.name)

  const [first, second] = await Promise.all([
    loadUser(2),
    loadUser(3)
  ])
  console.log('Parallel:', first.name, second.name)

  try {
    throw new Error('Example failure')
  } catch (error: unknown) {
    if (error instanceof Error) console.log('Handled:', error.message)
  }
}

run().catch((error: unknown) => {
  if (error instanceof Error) console.error('Unexpected:', error.message)
})

// Try this, read the error, then restore the comment:
// async function loadName() {
//   const user = loadUser(1)
//   return user.name
// }
