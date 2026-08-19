// Day 20 - JavaScript: private state and class rules
class InsufficientFundsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InsufficientFundsError'
  }
}

class BankAccount {
  #balanceInCents

  constructor(owner, initialBalanceInCents = 0) {
    this.owner = owner
    this.#balanceInCents = initialBalanceInCents
  }

  get balanceInCents() {
    return this.#balanceInCents
  }

  deposit(cents) {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error('Deposit must be positive whole cents')
    }
    this.#balanceInCents += cents
  }

  withdraw(cents) {
    if (!Number.isInteger(cents) || cents <= 0) {
      throw new Error('Withdrawal must be positive whole cents')
    }
    if (cents > this.#balanceInCents) {
      throw new InsufficientFundsError('Balance is too low for that withdrawal')
    }
    this.#balanceInCents -= cents
  }
}

function formatCents(cents) {
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
