// Day 20 — JavaScript Starter: Classes II — Private Fields, Getters/Setters
class BankAccount {
  #balance = 0
  #owner = ''

  constructor(owner, initialBalance) {
    this.#owner = owner
    this.#balance = initialBalance
  }

  get balance() {
    return '$' + this.#balance.toFixed(2)
  }

  get owner() {
    return this.#owner
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit must be positive')
    this.#balance += amount
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds')
    this.#balance -= amount
  }
}

var account = new BankAccount('Alice', 100)
account.deposit(50)
console.log(account.owner + ': ' + account.balance)
account.withdraw(30)
console.log(account.owner + ': ' + account.balance)
