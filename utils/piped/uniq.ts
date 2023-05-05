export const uniq = <T>(): ((array: T[]) => T[]) => {
  return (array: T[]) => [...new Set(array)]
}
