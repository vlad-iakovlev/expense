import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { CardBlock } from './CardBlock.tsx'

export interface CardFooterProps {
  fullWidth?: boolean
  children?: ReactNode
}

export const CardFooter: FC<CardFooterProps> = ({ fullWidth, children }) => {
  return (
    <CardBlock
      className={twMerge(
        'flex flex-col gap-3',
        !fullWidth && 'sm:flex-row-reverse'
      )}
    >
      {children}
    </CardBlock>
  )
}
