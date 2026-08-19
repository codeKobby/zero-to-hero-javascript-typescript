# Day 38 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. `Partial<User>` makes every field optional, which fits a PATCH that only sends the fields that changed.
2. `Partial<User>` widens what the compiler accepts; it does not check the object a form or API produced, so a runtime guard at the boundary is still required.
3. `Readonly<T>` blocks assignment through that view; nested objects are still their own types, so a deep version needs a recursive `Readonly` mapping every level.
4. The editor guarantees key spelling and assignment rules; `Object.freeze`, `pick`, and `omit` are the runtime guarantees.

## Level 2

```ts
interface User {
  id: number
  name: string
  email: string
  age: number
  role: 'admin' | 'user'
}

type UserUpdate = Partial<User>
type UserBasic = Pick<User, 'id' | 'name'>
type UserWithoutId = Omit<User, 'id'>
type RolePermissions = Record<'admin' | 'user', string[]>

function applyUpdate(user: User, patch: UserUpdate): User {
  return { ...user, ...patch }
}

const permissions: RolePermissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read']
}
```

JavaScript:

```js
function pick(object, keys) {
  return Object.fromEntries(keys.filter(key => key in object).map(key => [key, object[key]]))
}

function omit(object, keys) {
  const result = Object.assign({}, object)
  keys.forEach(key => { delete result[key] })
  return result
}

function readonly(object) {
  return Object.freeze(Object.assign({}, object))
}
```

The editor guarantees key spelling and that `patch` only carries `User` fields; the runtime functions perform the actual copy, removal, and freeze.

## Level 3

```ts
// 1. The update contract
// applyUpdate(user, { email: 'a@b.com' }) is legal; applyUpdate(user, { pin: 123 })
// fails because 'pin' is not a User field.

// 2. The projection audit
// Exposing only id and name keeps email out of every public surface;
// leaving email in a projection would ship it wherever the projection goes.

// 3. The readonly boundary
// Readonly<User> blocks reassignment through the type view, but a config
// object handed to a library still needs Object.freeze for runtime safety.

// 4. The shallow trap
// const settings: Readonly<{ theme: { dark: boolean } }> = { theme: { dark: false } }
// settings.theme.dark = true   // compiles fine — the nested object is not readonly
```

Utility types derive related contracts — optional, picked, omitted, recorded, readonly — from one declared shape, changing only what the compiler permits, never what the runtime does.