import { FC, ReactNode } from 'react'

export interface CardTextProps {
  prefix?: ReactNode
  label?: ReactNode
  value?: ReactNode
}

export const CardText: FC<CardTextProps> = ({ prefix, label, value }) => (
  <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
    {prefix ? <div className="flex-none">{prefix}</div> : null}
    <div className="flex-auto truncate">{label}</div>
    {value ? <div className="flex-none">{value}</div> : null}
  </div>
)
