export {}

// Day 21: Modules

export interface UserProfile {
  id: number
  name: string
  email: string
}

export function formatUser(user: UserProfile): string {
  return `#${user.id}: ${user.name} <${user.email}>`
}

// Dynamic import simulation:
async function loadModule() {
  // In real code: const module = await import('./utils.js')
  console.log('Module loaded dynamically')
}

loadModule()
