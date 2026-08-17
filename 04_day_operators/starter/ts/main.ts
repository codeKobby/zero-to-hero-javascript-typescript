export {}

// Day 4: Operators & Type Coercion
// Teaching: why === is preferred over ==

// These comparisons are intentionally mixed types for teaching:
// eslint-disable-next-line eqeqeq
const looseEqual: boolean = 5 == ('5' as unknown as number)  // true
// In real code, ALWAYS use ===

// Safe strict comparison examples:
const numA: number = 5
const numB: number = 5
console.log(numA === numB)        // true — same value and type
console.log(numA !== 3)           // true — different values
console.log('hello' === 'hello')  // true

// Nullish coalescing (??) vs logical OR (||)
const inputCount: number = 0
console.log(inputCount || 10)   // 10 — 0 is falsy, so OR falls back
console.log(inputCount ?? 10)   // 0  — 0 is NOT nullish, so ?? keeps it

const emptyStr: string = ''
console.log(emptyStr || 'default')  // 'default' — empty string is falsy
console.log(emptyStr ?? 'default')  // '' — empty string is NOT nullish

// Optional chaining
interface UserProfile {
  name: string
  address?: { city: string; zip?: string }
}

const profile: UserProfile = { name: 'Alice', address: { city: 'NYC' } }
const city: string = profile?.address?.city ?? 'Unknown'
const zip: string = profile?.address?.zip ?? 'No zip'

console.log(`City: ${city}, ZIP: ${zip}`)
