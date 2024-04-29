import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility.js'
import { CardBlock, CardBlockProps } from './Block.jsx'

export type CardFooterProps = Modify<
  CardBlockProps,
  {
    fullWidth?: boolean
  }
>

export const CardFooter = ({ fullWidth, ...rest }: CardFooterProps) => (
  <CardBlock
    className={twMerge(
      'flex-col items-stretch',
      !fullWidth && 'sm:flex-row-reverse',
    )}
    role="presentation"
    {...rest}
  />
)
