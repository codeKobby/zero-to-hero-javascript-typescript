# Day 20 worked solutions

Read these only after a genuine attempt. Compare your reasoning, not just the syntax.

## Level 1

1. Any code could assign an invalid balance. An explicit method is the single chokepoint where the rule lives.
2. `#private` is enforced by the JavaScript engine at runtime; TypeScript `private` is a compile-time rule the editor enforces while you type.
3. Floating-point decimals can round (`0.1 + 0.2`), and money must not round silently. Integer cents keep every calculation exact.
4. It is a getter — a property-shaped access, not a method call.
5. It throws `Error: Deposit must be positive whole cents`; zero is not a deposit.
6. `InsufficientFundsError` — the balance is too low for that withdrawal.
7. `day20:js` and `day20` run; `npm run check` passes.

## Level 2

```ts
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

  get formattedBalance(): string {
    return (this.#balanceInCents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
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
      throw new InsufficientFundsError('Insufficient funds')
    }
    this.#balanceInCents -= cents
  }
}

const account = new BankAccount('Mina', 1_000)
account.deposit(250)
console.log(account.owner + ':', account.formattedBalance) // Mina: $12.50

try {
  account.withdraw(2_000)
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.log('Withdrawal declined:', error.message)
  } else {
    console.log('A different error occurred')
  }
}
```

The getter formats a derived display value. It does not give callers direct permission to assign a decimal balance, so the class keeps one reliable internal representation.

## Level 3

```ts
// 1. The daily limit
class DailyLimitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DailyLimitError'
  }
}

class LimitedAccount extends BankAccount {
  #dailyLimitInCents: number
  #withdrawnTodayInCents: number

  constructor(owner: string, initialBalanceInCents: number, dailyLimitInCents: number) {
    super(owner, initialBalanceInCents)
    this.#dailyLimitInCents = dailyLimitInCents
    this.#withdrawnTodayInCents = 0
  }

  withdraw(cents: number): void {
    if (cents > this.#dailyLimitInCents - this.#withdrawnTodayInCents) {
      throw new DailyLimitError('That would exceed today\'s limit')
    }
    super.withdraw(cents)
    this.#withdrawnTodayInCents += cents
  }
}

const limited = new LimitedAccount('Mina', 5_000, 1_000)
try {
  limited.withdraw(1_500)
} catch (error) {
  if (error instanceof DailyLimitError) {
    console.log('Daily limit reached:', error.message)
  } else if (error instanceof InsufficientFundsError) {
    console.log('Balance too low:', error.message)
  }
}
// Daily limit reached: That would exceed today's limit

// 2. The shared state guard
class TemperatureSensor {
  #readingCelsius: number

  constructor(readingCelsius: number) {
    this.#readingCelsius = readingCelsius
  }

  get readingCelsius(): number {
    return this.#readingCelsius
  }

  record(celsius: number): void {
    if (!Number.isFinite(celsius)) {
      throw new Error('Reading must be a finite number')
    }
    this.#readingCelsius = celsius
  }
}

const sensor = new TemperatureSensor(21.5)
sensor.record(22.1)
console.log(sensor.readingCelsius) // 22.1
// sensor.readingCelsius = 99 would throw: reading is read-only from outside.

// 3. The composition decision
class Report {
  constructor(private readonly accounts: BankAccount[]) {}

  print(): void {
    for (const account of this.accounts) {
      console.log(account.owner + ': ' + account.formattedBalance)
    }
  }
}

// Report USES accounts; it is not a kind of account. Composition keeps each
// class focused on one responsibility and avoids a fragile inheritance tree.

// 4. The custom error memo
// Worth a class: a caller genuinely decides between failure kinds (retry vs
// refuse), e.g. InsufficientFundsError vs DailyLimitError.
// Not worth a class: a one-off validation failure where a plain Error message
// is enough, e.g. "Deposit must be positive whole cents". Every failed
// condition does not deserve its own class.
```

The daily-limit example is a rare case where inheritance earns its place: `LimitedAccount` genuinely *is a* `BankAccount` with an added rule. Everywhere else the lesson's habit — composition first — keeps the design flat and narrow.