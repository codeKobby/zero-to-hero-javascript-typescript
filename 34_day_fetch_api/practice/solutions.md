# Day 34 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `fetch` rejects only for a network-level failure; a 404 or 500 still resolves with a `Response`.
2. `response.ok` is false for 404 and 500 responses, so it must be checked before trusting the body.
3. `response.json` reads the body asynchronously; the parsed value is not available until it is awaited.
4. `as User[]` changes only the compiler's belief; the network bytes are not inspected, so a malformed response still slips through.

## Level 2

```ts
async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url)
  if (!response.ok) throw new Error('HTTP ' + response.status)
  return response.json()
}

async function getJsonWithTimeout(url: string, ms: number): Promise<unknown> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) throw new Error('HTTP ' + response.status)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}
```

Aborting is cooperative. The fetch must receive the signal, and the caller should decide how to present an `AbortError`.

## Level 3

```ts
type User = { id: number; name: string }

function isUser(value: unknown): value is User {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'name' in value && typeof value.name === 'string'
}

// 1. The one-boundary getter
async function getUsers(): Promise<User[]> {
  const data = await getJson('/api/users')
  if (!Array.isArray(data) || !data.every(isUser)) {
    throw new Error('Response did not match the User shape')
  }
  return data
}
// The caller receives a User[] or a thrown Error — the shape decision is
// made once, at this boundary, instead of in every caller.

// 2. The abort-comments
// controller.abort() signals the fetch to stop listening for the response.
// The fetch surfaces an AbortError, so the caller catches and presents it
// as a timeout rather than as a server failure.

// 3. The methods gallery
// GET reads a resource, POST creates one, PUT/PATCH replace or update one,
// DELETE removes one. The request body must be a string, so JSON goes
// through JSON.stringify with a Content-Type of application/json.

// 4. The assertion trap
async function assertedUsers(): Promise<User[]> {
  const data = await getJson('/api/users')
  return data as User[] // compiles, but a malformed body is trusted anyway
}
// The guarded version checks shape at runtime and throws a readable error;
// the assertion compiles either way, so only the guard protects the program.
```

Fetch is now a single Promise for an HTTP round trip — `response.ok` checked, body awaited, string bodies, and parsed JSON guarded at the runtime boundary rather than trusted through an assertion.