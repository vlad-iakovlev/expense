import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'
import { CardBlock } from './Block'
import { CardDateTime } from './DateTime'
import { CardDivider } from './Divider'
import { CardFooter } from './Footer'
import { CardInput } from './Input'
import { CardItem } from './Item'
import { CardMenu } from './Menu'
import { CardSelect } from './Select'
import { CardSubtitle } from './Subtitle'
import { CardTitle } from './Title'

export type CardProps = Modify<
  React.ComponentProps<'div'>,
  {
    clickable?: boolean
  }
>

export const Card = ({
  className,
  children,
  clickable,
  onClick,
  onKeyDown,
  ...rest
}: CardProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        event.currentTarget.click()
      }

      onKeyDown?.(event)
    },
    [onClick, onKeyDown],
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={twMerge(
        'rounded-md bg-secondary-background py-2 text-left shadow-lg ring-1 ring-black/5 transition-shadow',
        (clickable || onClick) &&
          'cursor-pointer hover:shadow-2xl active:shadow-2xl',
        className,
      )}
      role={onClick ? 'button' : 'list'}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  )
}

export * from './Block'
Card.Block = CardBlock

export type * from './DateTime'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './Footer'
Card.Footer = CardFooter

export type * from './Input'
Card.Input = CardInput

export type * from './Item'
Card.Item = CardItem

export type * from './Menu'
Card.Menu = CardMenu

export type * from './Select'
Card.Select = CardSelect

export type * from './Subtitle'
Card.Subtitle = CardSubtitle

export type * from './Title'
Card.Title = CardTitle
