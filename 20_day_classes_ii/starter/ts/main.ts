export {}

// Day 20 - TypeScript: private state and class rules
class InsufficientFundsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InsufficientFundsError'
  }
}

class BankAccount {
  #balanceInCents: number

  constructor(
    public readonly owner: string,
    initialBalanceInCents: number = 0
  ) {
    this.#balanceInCents = initialBalanceInCents
  }

  get balanceInCents(): number {
    return this.#balanceInCents
  }

  deposit(cents: number): void {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error('Deposit must be positive whole cents')
    }
    this.#balanceInCents += cents
  }

  withdraw(cents: number): void {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error('Withdrawal must be positive whole cents')
    }
    if (cents > this.#balanceInCents) {
      throw new InsufficientFundsError('Balance is too low for that withdrawal')
    }
    this.#balanceInCents -= cents
  }
}

function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

const account = new BankAccount('Mina', 1_000)
account.deposit(250)
console.log(account.owner + ':', formatCents(account.balanceInCents))

try {
  account.withdraw(2_000)
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.log('Withdrawal declined:', error.message)
  }
}

// Try this, read the error, then restore the comment:
// account.owner = 'Alex'
