import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { CardBlock } from './CardBlock.jsx'
import { CardDateTime } from './CardDateTime.jsx'
import { CardDivider } from './CardDivider.jsx'
import { CardFooter } from './CardFooter.jsx'
import { CardInput } from './CardInput.jsx'
import { CardItem } from './CardItem.jsx'
import { CardLink } from './CardLink.jsx'
import { CardMenu } from './CardMenu.jsx'
import { CardSelect } from './CardSelect.jsx'
import { CardSubtitle } from './CardSubtitle.jsx'
import { CardTitle } from './CardTitle.jsx'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({
  className,
  children,
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
    <div
      className={twMerge(
        'bg-secondary rounded-md py-2 text-left shadow-lg ring-1 ring-black ring-opacity-5 transition-shadow dark:ring-0',
        !!onClick && 'cursor-pointer hover:shadow-2xl active:shadow-2xl',
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

export * from './CardBlock.jsx'
Card.Block = CardBlock

export type * from './CardDateTime.jsx'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './CardFooter.jsx'
Card.Footer = CardFooter

export type * from './CardInput.jsx'
Card.Input = CardInput

export type * from './CardItem.jsx'
Card.Item = CardItem

export type * from './CardLink.jsx'
Card.Link = CardLink

export type * from './CardMenu.jsx'
Card.Menu = CardMenu

export type * from './CardSelect.jsx'
Card.Select = CardSelect

export type * from './CardSubtitle.jsx'
Card.Subtitle = CardSubtitle

export type * from './CardTitle.jsx'
Card.Title = CardTitle
