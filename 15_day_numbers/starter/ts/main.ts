export {}

// Day 15 - TypeScript: parsing, validation, calculation, formatting
function readQuantity(text: string): number | null {
  const trimmed = text.trim()
  const quantity = Number(trimmed)

  if (trimmed === '' || !Number.isFinite(quantity)) {
    return null
  }

  return quantity
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum)
}

const quantity = readQuantity(' 3.5 ')
console.log('Parsed quantity:', quantity)
console.log('Clamped percentage:', clamp(120, 0, 100))

const subtotal: number = 1234.5
console.log('Price:', subtotal.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
}))

console.log('0.1 + 0.2:', 0.1 + 0.2)

// Try this, read the error, then restore the comment:
// console.log(quantity.toFixed(2))
