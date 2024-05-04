export class BigMath {
  static abs(x: bigint): bigint {
    return x < 0n ? -x : x
  }

  static sign(x: bigint): bigint {
    if (x === 0n) return 0n
    return x < 0n ? -1n : 1n
  }

  static pow(base: bigint, exponent: bigint): bigint {
    return base ** exponent
  }

  static min(value: bigint, ...values: bigint[]): bigint {
    for (const v of values) if (v < value) value = v
    return value
  }

  static max(value: bigint, ...values: bigint[]): bigint {
    for (const v of values) if (v > value) value = v
    return value
  }
}
