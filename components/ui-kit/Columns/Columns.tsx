import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'

export interface ColumnsProps {
  className?: string
  children: ReactNode
}

export const Columns: FC<ColumnsProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        className,
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start'
      )}
    >
      {children}
    </div>
  )
}
