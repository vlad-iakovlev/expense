import { twMerge } from 'tailwind-merge'
import { CardBlock } from './CardBlock.tsx'

export interface CardFooterProps {
  fullWidth?: boolean
  children?: React.ReactNode
}

export const CardFooter = ({ fullWidth, children }: CardFooterProps) => {
  return (
    <CardBlock
      className={twMerge(
        'flex-col items-stretch',
        !fullWidth && 'sm:flex-row-reverse'
      )}
    >
      {children}
    </CardBlock>
  )
}
