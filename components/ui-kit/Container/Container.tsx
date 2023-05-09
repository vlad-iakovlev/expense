import { clsx } from 'clsx'
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
        'mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8'
      )}
    >
      {children}
    </div>
  )
}
