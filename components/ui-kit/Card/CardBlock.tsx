import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardBlockProps = React.HTMLAttributes<HTMLDivElement>

export const CardBlock = forwardRef<HTMLDivElement, CardBlockProps>(
  function CardBlock({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={twMerge(
          'relative flex min-h-12 items-center gap-3 bg-white px-4 py-2 transition-colors sm:px-6',
          className,
        )}
        role="listitem"
        {...rest}
      />
    )
  },
)
