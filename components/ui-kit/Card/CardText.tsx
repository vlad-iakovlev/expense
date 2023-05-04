import { clsx } from 'clsx'
import { CSSProperties, ReactNode, forwardRef } from 'react'

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
      <div
        ref={ref}
        className={clsx(
          className,
          'flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3 bg-white'
        )}
        style={style}
      >
        {prefix ? <div className="flex-none">{prefix}</div> : null}
        <div className="flex-auto truncate">{label}</div>
        {value ? <div className="flex-none">{value}</div> : null}
      </div>
    )
  }
)
