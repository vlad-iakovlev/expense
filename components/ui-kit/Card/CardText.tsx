import { forwardRef } from 'react'
import { CardBlock } from './CardBlock.tsx'

export interface CardTextProps {
  className?: string
  style?: React.CSSProperties
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label?: React.ReactNode
  value?: React.ReactNode
}

export const CardText = forwardRef<HTMLDivElement, CardTextProps>(
  function CardText({ className, style, prefix, suffix, label, value }, ref) {
    return (
      <CardBlock ref={ref} className={className} style={style}>
        {prefix ? <div className="flex-none">{prefix}</div> : null}
        <div className="flex-auto truncate">{label}</div>
        {value ? <div className="flex-none">{value}</div> : null}
        {suffix ? <div className="flex-none">{suffix}</div> : null}
      </CardBlock>
    )
  },
)
