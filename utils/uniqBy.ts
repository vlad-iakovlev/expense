export const uniqBy = <T>(array: T[], cb: (item: T) => unknown): T[] => {
  return [...new Map(array.map((item) => [cb(item), item])).values()]
}
