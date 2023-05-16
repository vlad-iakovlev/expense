export type Modify<T, R> = Omit<T, keyof R> & R

export type ReactTag =
  | keyof JSX.IntrinsicElements
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.JSXElementConstructor<any>
