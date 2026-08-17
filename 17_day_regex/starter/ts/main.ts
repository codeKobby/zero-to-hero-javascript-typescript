export {}

// Day 17: Regular Expressions
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email: string): boolean {
  return emailRegex.test(email)
}

console.log(isValidEmail('alice@test.com'))  // true
console.log(isValidEmail('invalid'))         // false

// Named capture groups
interface PhoneMatch {
  area: string
  exchange: string
  number: string
}

function parsePhone(phoneStr: string): PhoneMatch | null {
  const regex = /(?<area>\d{3})-(?<exchange>\d{3})-(?<number>\d{4})/
  const match = regex.exec(phoneStr)
  if (!match?.groups) return null
  const { area, exchange, number } = match.groups
  if (area === undefined || exchange === undefined || number === undefined) return null
  return { area, exchange, number }
}

const phone = parsePhone('555-123-4567')
if (phone) {
  console.log(`Phone: (${phone.area}) ${phone.exchange}-${phone.number}`)
}

// Find and replace
const messy = '  Hello   World   '
const cleaned = messy.replace(/\s+/g, ' ').trim()
console.log(`Cleaned: "${cleaned}"`)

// Extract hashtags
function extractHashtags(text: string): string[] {
  const matches = text.matchAll(/#(\w+)/g)
  const results: string[] = []
  for (const m of matches) {
    const tag = m[1]
    if (tag !== undefined) results.push(tag)
  }
  return results
}

console.log(extractHashtags('Loving #TypeScript and #JavaScript today'))
