import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ColumnsProps {
  className?: string
  children: ReactNode
}

export const Columns: FC<ColumnsProps> = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start',
        className
      )}
    >
      {children}
    </div>
  )
}
