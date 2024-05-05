import { BigMath } from './BigMath.js'

const cleanupString = (value: string) => {
  const sign = /^[^.\d]*-/.test(value) ? '-' : ''
  const [decimal, ...fractional] = value.replace(/[^.\d]/g, '').split('.')

  return `${sign}${decimal || '0'}.${fractional.join('')}`
}

export class Decimal {
  private constructor(
    private readonly atomics: bigint,
    private readonly fractionalDigits: number,
  ) {
    while (this.fractionalDigits > 0 && this.atomics % 10n === 0n) {
      this.atomics /= 10n
      this.fractionalDigits--
    }
  }

  private static toString(atomics: bigint, fractionalDigits: number): string {
    if (fractionalDigits === 0) return atomics.toString()

    const decimal = atomics / 10n ** BigInt(fractionalDigits)
    const fractional = atomics % 10n ** BigInt(fractionalDigits)

    return `${decimal}.${BigMath.abs(fractional).toString().padStart(fractionalDigits, '0')}`
  }

  private static align(a: Decimal, b: Decimal): [bigint, bigint, number] {
    const fractionalDigits = Math.max(a.fractionalDigits, b.fractionalDigits)

    return [
      a.atomics * 10n ** BigInt(fractionalDigits - a.fractionalDigits),
      b.atomics * 10n ** BigInt(fractionalDigits - b.fractionalDigits),
      fractionalDigits,
    ]
  }

  // Constructors

  static ZERO = new Decimal(0n, 0)

  static fromString(value: string): Decimal {
    value = cleanupString(value.replace(/,/g, '.'))

    return new Decimal(
      BigInt(value.replace('.', '')),
      value.includes('.') ? value.length - value.indexOf('.') - 1 : 0,
    )
  }

  static fromNumber(value: number): Decimal {
    return Decimal.fromString(value.toString())
  }

  // Formatting

  toString(): string {
    return Decimal.toString(this.atomics, this.fractionalDigits)
  }

  toNumber(): number {
    return Number(this.toString())
  }

  toFixed(fractionalDigits: number): string {
    const atomics =
      (this.atomics * 10n ** BigInt(fractionalDigits)) /
      10n ** BigInt(this.fractionalDigits)

    return Decimal.toString(atomics, fractionalDigits)
  }

  // Comparison operators

  eq(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a === b
  }

  neq(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a !== b
  }

  gt(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a > b
  }

  lt(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a < b
  }

  gte(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a >= b
  }

  lte(other: Decimal): boolean {
    const [a, b] = Decimal.align(this, other)
    return a <= b
  }

  // Arithmetic operators

  add(other: Decimal): Decimal {
    const [a, b, fractionalDigits] = Decimal.align(this, other)
    return new Decimal(a + b, fractionalDigits)
  }

  sub(other: Decimal): Decimal {
    const [a, b, fractionalDigits] = Decimal.align(this, other)
    return new Decimal(a - b, fractionalDigits)
  }

  mul(other: Decimal): Decimal {
    return new Decimal(
      this.atomics * other.atomics,
      this.fractionalDigits + other.fractionalDigits,
    )
  }

  abs(): Decimal {
    return new Decimal(BigMath.abs(this.atomics), this.fractionalDigits)
  }
}
