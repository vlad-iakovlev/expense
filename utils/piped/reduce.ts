export const reduce = <T, U>(
  cb: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): ((array: T[]) => U) => {
  return (array) => array.reduce(cb, initialValue)
}
