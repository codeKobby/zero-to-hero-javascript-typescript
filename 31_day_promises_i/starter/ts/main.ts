export {}

// Day 31 - TypeScript: one future result
type User = { id: number; name: string }

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getUser(id: number): Promise<User> {
  return delay(10).then(() => ({ id, name: 'User ' + id }))
}

console.log('A')
getUser(1)
  .then((user) => getUser(user.id + 1))
  .then((user) => console.log('Next user:', user.name))
  .catch((error: unknown) => {
    if (error instanceof Error) console.error('Failed:', error.message)
  })
  .finally(() => console.log('Done'))
console.log('B')

// Try this, read the error, then restore the comment:
// const counter: Promise<number> = new Promise((resolve) => resolve('3'))
