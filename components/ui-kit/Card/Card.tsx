import clsx from 'clsx'
import { ReactNode } from 'react'
import { CardButton } from './CardButton'
import { CardDateTime } from './CardDateTime'
import { CardDivider } from './CardDivider'
import { CardInput } from './CardInput'
import { CardPagination } from './CardPagination'
import { CardPopup } from './CardPopup'
import { CardSelect } from './CardSelect'
import { CardSkeleton } from './CardSkeleton'
import { CardText } from './CardText'
import { CardTitle } from './CardTitle'

export interface CardProps {
  className?: string
  children?: ReactNode
}

export type { CardButtonProps } from './CardButton'
export type { CardDateTimeProps } from './CardDateTime'
export type { CardInputProps } from './CardInput'
export type { CardPaginationProps } from './CardPagination'
export type { CardPopupProps } from './CardPopup'
export type { CardSelectOption, CardSelectProps } from './CardSelect'
export type { CardTextProps } from './CardText'
export type { CardTitleProps } from './CardTitle'

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        className,
        'py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-shadow'
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
Card.Pagination = CardPagination
Card.Popup = CardPopup
Card.Select = CardSelect
Card.Skeleton = CardSkeleton
Card.Text = CardText
Card.Title = CardTitle
