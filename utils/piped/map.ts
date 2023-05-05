export const map = <T, U>(cb: (item: T) => U): ((array: T[]) => U[]) => {
  return (array) => array.map(cb)
}
