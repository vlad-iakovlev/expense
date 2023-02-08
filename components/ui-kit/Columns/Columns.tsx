import { FC, ReactNode } from 'react'

export interface ColumnsProps {
  children: ReactNode
}

export const Columns: FC<ColumnsProps> = ({ children }) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6">
      {children}
    </div>
  )
}
