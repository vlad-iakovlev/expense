interface Pipe<T> {
  pipe: <R>(cb: (data: T) => R) => Pipe<R>
  value: () => T
}

export const pipe = <T>(data: T): Pipe<T> => {
  return {
    pipe: <R>(cb: (data: T) => R) => pipe(cb(data)),
    value: () => data,
  }
}
