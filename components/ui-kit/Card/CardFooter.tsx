import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'
import { CardBlock } from './CardBlock.tsx'

export interface CardFooterProps {
  fullWidth?: boolean
  children?: ReactNode
}

export const CardFooter: FC<CardFooterProps> = ({ fullWidth, children }) => {
  return (
    <CardBlock
      className={clsx('flex flex-col gap-3', {
        'sm:flex-row-reverse': !fullWidth,
      })}
    >
      {children}
    </CardBlock>
  )
}
