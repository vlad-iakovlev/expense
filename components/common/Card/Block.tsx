import { twMerge } from 'tailwind-merge'

export type CardBlockProps = React.ComponentProps<'div'>

export const CardBlock = ({ className, ...rest }: CardBlockProps) => (
  <div
    className={twMerge(
      'relative flex min-h-12 items-center gap-3 bg-secondary-background px-4 py-2 transition-colors sm:px-6',
      className,
    )}
    role="listitem"
    {...rest}
  />
)
