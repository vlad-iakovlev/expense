import { CSSProperties, ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

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
        className={twMerge(
          'flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3 bg-white',
          className
        )}
        style={style}
      >
        {children}
      </div>
    )
  }
)
