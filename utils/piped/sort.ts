export const sort = <T>(cb: (a: T, b: T) => number): ((array: T[]) => T[]) => {
  return (array) => array.sort(cb)
}
