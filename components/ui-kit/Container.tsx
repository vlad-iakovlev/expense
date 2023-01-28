import clsx from 'clsx'
import { FC, ReactNode } from 'react'

export interface ContainerProps {
  children?: ReactNode
  className?: string
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        className,
        'mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-8'
      )}
    >
      {children}
    </div>
  )
}
