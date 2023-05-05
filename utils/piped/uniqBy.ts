export const uniqBy = <T>(cb: (item: T) => unknown): ((array: T[]) => T[]) => {
  return (array) => [...new Map(array.map((item) => [cb(item), item])).values()]
}
