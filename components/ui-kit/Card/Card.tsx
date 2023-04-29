import { clsx } from 'clsx'
import { ReactNode } from 'react'
import { CardButton } from './CardButton.tsx'
import { CardDateTime } from './CardDateTime.tsx'
import { CardDivider } from './CardDivider.tsx'
import { CardInput } from './CardInput.tsx'
import { CardLink } from './CardLink.tsx'
import { CardPagination } from './CardPagination.tsx'
import { CardPopup } from './CardPopup.tsx'
import { CardSelect } from './CardSelect.tsx'
import { CardText } from './CardText.tsx'
import { CardTitle } from './CardTitle.tsx'

export interface CardProps {
  className?: string
  children?: ReactNode
}

export type * from './CardButton.tsx'
export type * from './CardDateTime.tsx'
export type * from './CardInput.tsx'
export type * from './CardLink.tsx'
export type * from './CardPagination.tsx'
export type * from './CardPopup.tsx'
export type * from './CardSelect.tsx'
export type * from './CardText.tsx'
export type * from './CardTitle.tsx'

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        className,
        'py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'
      )}
    >
      {children}
    </div>
  )
}

Card.Button = CardButton
Card.DateTime = CardDateTime
Card.Divider = CardDivider
Card.Input = CardInput
Card.Link = CardLink
Card.Pagination = CardPagination
Card.Popup = CardPopup
Card.Select = CardSelect
Card.Text = CardText
Card.Title = CardTitle
