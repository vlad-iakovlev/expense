import { clsx } from 'clsx'
import { CSSProperties, ReactNode, forwardRef } from 'react'

export interface CardBlockProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const CardBlock = forwardRef<HTMLDivElement, CardBlockProps>(
  function CardBlock({ className, style, children }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(className, 'min-h-12 px-4 sm:px-6 py-2 bg-white')}
        style={style}
      >
        {children}
      </div>
    )
  }
)
