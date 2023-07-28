import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardBlockProps = React.HTMLAttributes<HTMLDivElement>

export const CardBlock = forwardRef<HTMLDivElement, CardBlockProps>(
  function CardBlock({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={twMerge(
          'relative flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3 bg-white transition-colors',
          className,
        )}
        role="listitem"
        {...rest}
      />
    )
  },
)
