import React from 'react'
import { twMerge } from 'tailwind-merge'

export type CardBlockProps = React.HTMLAttributes<HTMLDivElement>

export const CardBlock = React.forwardRef<HTMLDivElement, CardBlockProps>(
  function CardBlock({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={twMerge(
          'bg-secondary relative flex min-h-12 items-center gap-3 px-4 py-2 transition-colors sm:px-6',
          className,
        )}
        role="listitem"
        {...rest}
      />
    )
  },
)
