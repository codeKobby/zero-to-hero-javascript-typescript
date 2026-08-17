export {}

// Day 32 — Promises II — TypeScript Starter

async function fetchWithTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  })
  return Promise.race([promise, timeout])
}

// Promise.all — all typed
async function loadDashboard() {
  const [users, posts] = await Promise.all([
    Promise.resolve([{ id: 1, name: 'Alice' }]),
    Promise.resolve([{ id: 1, title: 'Hello' }])
  ])
  console.log(users, posts)
}

loadDashboard()
