export {}

// Day 16: Dates & Time
const today: Date = new Date()
console.log('ISO:', today.toISOString())
console.log('Date string:', today.toDateString())

// Formatting with Intl
const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
console.log('Formatted:', formatter.format(today))

// Date calculations
function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.abs(b.getTime() - a.getTime()) / msPerDay
}

const birthday = new Date('1995-06-15')
console.log(`Days since birthday: ${Math.floor(daysBetween(birthday, today))}`)

// Add days
function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

console.log('Next week:', addDays(today, 7).toDateString())

// Type-safe date helpers
type DateInput = Date | string | number

function parseDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input)
}

console.log(parseDate('2024-01-15'))
console.log(parseDate(1700000000000))
