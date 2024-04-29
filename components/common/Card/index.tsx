import React from 'react'
import { twMerge } from 'tailwind-merge'
import { CardBlock } from './Block.jsx'
import { CardDateTime } from './DateTime.jsx'
import { CardDivider } from './Divider.jsx'
import { CardFooter } from './Footer.jsx'
import { CardInput } from './Input.jsx'
import { CardItem } from './Item.jsx'
import { CardLink } from './Link.jsx'
import { CardMenu } from './Menu.jsx'
import { CardSelect } from './Select.jsx'
import { CardSubtitle } from './Subtitle.jsx'
import { CardTitle } from './Title.jsx'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: CardProps) => {
  const handleKeyDown = React.useCallback(
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

export * from './Block.jsx'
Card.Block = CardBlock

export type * from './DateTime.jsx'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './Footer.jsx'
Card.Footer = CardFooter

export type * from './Input.jsx'
Card.Input = CardInput

export type * from './Item.jsx'
Card.Item = CardItem

export type * from './Link.jsx'
Card.Link = CardLink

export type * from './Menu.jsx'
Card.Menu = CardMenu

export type * from './Select.jsx'
Card.Select = CardSelect

export type * from './Subtitle.jsx'
Card.Subtitle = CardSubtitle

export type * from './Title.jsx'
Card.Title = CardTitle
