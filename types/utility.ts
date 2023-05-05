export type MayBeFn<Args extends unknown[], Value> =
  | ((...args: Args) => Value)
  | Value

export type Modify<T, R> = Omit<T, keyof R> & R
