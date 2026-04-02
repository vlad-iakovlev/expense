import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'
import { CardBlock } from './nested/Block'
import { CardDateTime } from './nested/DateTime'
import { CardDivider } from './nested/Divider'
import { CardFooter } from './nested/Footer'
import { CardInput } from './nested/Input'
import { CardItem } from './nested/Item'
import { CardMenu } from './nested/Menu'
import { CardSelect } from './nested/Select'
import { CardSubtitle } from './nested/Subtitle'
import { CardTitle } from './nested/Title'

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

export * from './nested/Block'
Card.Block = CardBlock

export type * from './nested/DateTime'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './nested/Footer'
Card.Footer = CardFooter

export type * from './nested/Input'
Card.Input = CardInput

export type * from './nested/Item'
Card.Item = CardItem

export type * from './nested/Menu'
Card.Menu = CardMenu

export type * from './nested/Select'
Card.Select = CardSelect

export type * from './nested/Subtitle'
Card.Subtitle = CardSubtitle

export type * from './nested/Title'
Card.Title = CardTitle
