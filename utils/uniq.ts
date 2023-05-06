export const uniq = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}
