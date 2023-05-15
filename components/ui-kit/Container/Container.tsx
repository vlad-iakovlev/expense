import { twMerge } from 'tailwind-merge'

export interface ContainerProps {
  children?: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        'mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
