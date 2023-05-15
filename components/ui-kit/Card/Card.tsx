import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { CardBlock } from './CardBlock.tsx'
import { CardButton } from './CardButton.tsx'
import { CardDateTime } from './CardDateTime.tsx'
import { CardDivider } from './CardDivider.tsx'
import { CardFooter } from './CardFooter.tsx'
import { CardInput } from './CardInput.tsx'
import { CardLink } from './CardLink.tsx'
import { CardPopup } from './CardPopup.tsx'
import { CardSelect } from './CardSelect.tsx'
import { CardSubtitle } from './CardSubtitle.tsx'
import { CardText } from './CardText.tsx'
import { CardTitle } from './CardTitle.tsx'

export interface CardProps {
  className?: string
  clickable?: boolean
  children?: ReactNode
  onClick?: () => void
}

export const Card = ({
  className,
  clickable,
  children,
  onClick,
}: CardProps) => {
  const Component = clickable ? 'button' : 'div'

  return (
    <Component
      className={twMerge(
        'py-2 bg-white rounded-md shadow-lg text-left ring-1 ring-black ring-opacity-5 transition-shadow',
        clickable && 'hover:shadow-2xl active:shadow-2xl cursor-pointer',
        className
      )}
      type="button"
      onClick={onClick}
    >
      {children}
    </Component>
  )
}

export * from './CardBlock.tsx'
Card.Block = CardBlock

export type * from './CardButton.tsx'
Card.Button = CardButton

export type * from './CardDateTime.tsx'
Card.DateTime = CardDateTime

Card.Divider = CardDivider

export type * from './CardFooter.tsx'
Card.Footer = CardFooter

export type * from './CardInput.tsx'
Card.Input = CardInput

export type * from './CardLink.tsx'
Card.Link = CardLink

export type * from './CardPopup.tsx'
Card.Popup = CardPopup

export type * from './CardSelect.tsx'
Card.Select = CardSelect

export type * from './CardSubtitle.tsx'
Card.Subtitle = CardSubtitle

export type * from './CardText.tsx'
Card.Text = CardText

export type * from './CardTitle.tsx'
Card.Title = CardTitle
