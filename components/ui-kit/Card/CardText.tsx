import { FC, ReactNode } from 'react'

export interface CardTextProps {
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
}

export const CardText: FC<CardTextProps> = ({ start, end, children }) => (
  <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
    {start ? <div className="flex-none">{start}</div> : null}
    <div className="flex-auto truncate">{children}</div>
    {end ? <div className="flex-none">{end}</div> : null}
  </div>
)
