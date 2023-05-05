export const filter = <T>(cb: (value: T) => unknown): ((array: T[]) => T[]) => {
  return (array) => array.filter(cb)
}
