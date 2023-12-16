import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.js'
import { CardBlock, CardBlockProps } from './CardBlock.jsx'

export type CardFooterProps = Modify<
  CardBlockProps,
  {
    fullWidth?: boolean
  }
>

export const CardFooter = ({ fullWidth, ...rest }: CardFooterProps) => {
  return (
    <CardBlock
      className={twMerge(
        'flex-col items-stretch',
        !fullWidth && 'sm:flex-row-reverse',
      )}
      role="presentation"
      {...rest}
    />
  )
}
