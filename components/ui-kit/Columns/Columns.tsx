import { twMerge } from 'tailwind-merge'

export interface ColumnsProps {
  className?: string
  children: React.ReactNode
}

export const Columns = ({ className, children }: ColumnsProps) => {
  return (
    <div
      className={twMerge(
        'grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
