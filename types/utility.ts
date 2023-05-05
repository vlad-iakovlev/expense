export type Modify<T, R> = Omit<T, keyof R> & R

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MayBeFn<Args extends any[], Value> =
  | ((...args: Args) => Value)
  | Value
