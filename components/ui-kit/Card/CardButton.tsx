import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'
import { CardText, CardTextProps } from './CardText.tsx'

export type CardButtonProps = Modify<
  CardTextProps,
  {
    disabled?: boolean
  }
>

export const CardButton = ({
  className,
  disabled,
  ...rest
}: CardButtonProps) => (
  <CardText
    className={twMerge(
      'hover:bg-zinc-100 active:bg-zinc-100 transition-colors',
      disabled && 'pointer-events-none',
      className,
    )}
    aria-disabled={disabled ? 'true' : 'false'}
    tabIndex={disabled ? -1 : 0}
    {...rest}
  />
)
