import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react'

export type MayBePromise<T> = Promise<T> | T

// eslint-disable-next-line @typescript-eslint/ban-types
export type ForwardRef<RefType, Props = {}> = ForwardRefExoticComponent<
  PropsWithoutRef<Props> & RefAttributes<RefType>
>
