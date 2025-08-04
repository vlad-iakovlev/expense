import { twMerge } from 'tailwind-merge'

export type ContainerProps = {
  children?: React.ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => (
  <div
    className={twMerge(
      'mx-auto max-w-(--breakpoint-2xl) px-4 sm:px-6 md:px-8',
      className,
    )}
  >
    {children}
  </div>
)
