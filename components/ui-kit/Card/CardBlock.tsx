import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export interface CardBlockProps {
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
  role?: string
  children?: React.ReactNode
}

export const CardBlock = forwardRef<HTMLDivElement, CardBlockProps>(
  function CardBlock({ className, style, ariaLabel, role, children }, ref) {
    return (
      <div
        ref={ref}
        className={twMerge(
          'flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3 bg-white',
          className,
        )}
        style={style}
        aria-label={ariaLabel}
        role={role}
      >
        {children}
      </div>
    )
  },
)
