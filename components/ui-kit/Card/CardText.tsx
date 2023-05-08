import { clsx } from 'clsx'
import { CSSProperties, ReactNode, forwardRef } from 'react'
import { CardBlock } from './CardBlock.tsx'

export interface CardTextProps {
  className?: string
  style?: CSSProperties
  prefix?: ReactNode
  label?: ReactNode
  value?: ReactNode
}

export const CardText = forwardRef<HTMLDivElement, CardTextProps>(
  function CardText({ className, style, prefix, label, value }, ref) {
    return (
      <CardBlock
        ref={ref}
        className={clsx(className, 'flex items-center gap-3')}
        style={style}
      >
        {prefix ? <div className="flex-none">{prefix}</div> : null}
        <div className="flex-auto truncate">{label}</div>
        {value ? <div className="flex-none">{value}</div> : null}
      </CardBlock>
    )
  }
)
