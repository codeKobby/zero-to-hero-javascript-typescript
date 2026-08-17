export {}

// Day 31 — Promises I — TypeScript Starter

interface User {
  id: number
  name: string
}

function getUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `User ${id}` }), 500)
  })
}

getUser(1)
  .then(user => console.log(`User: ${user.name}`))
  .catch(err => console.error(err))

// Chaining
getUser(1)
  .then(user => {
    console.log(`First: ${user.name}`)
    return getUser(2)
  })
  .then(user2 => console.log(`Second: ${user2.name}`))
  .catch(err => console.error(err))
