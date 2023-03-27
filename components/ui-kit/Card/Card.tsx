import clsx from 'clsx'
import { Children, ReactNode, useMemo } from 'react'
import { CardButton } from './CardButton'
import { CardDateTime } from './CardDateTime'
import { CardDivider } from './CardDivider'
import { CardInput } from './CardInput'
import { CardLink } from './CardLink'
import { CardPagination } from './CardPagination'
import { CardPopup } from './CardPopup'
import { CardSelect } from './CardSelect'
import { CardSkeleton } from './CardSkeleton'
import { CardText } from './CardText'

export interface CardProps {
  className?: string
  title?: string
  subtitle?: string
  action?: ReactNode
  children?: ReactNode
}

export type { CardButtonProps } from './CardButton'
export type { CardDateTimeProps } from './CardDateTime'
export type { CardInputProps } from './CardInput'
export type { CardLinkProps } from './CardLink'
export type { CardPaginationProps } from './CardPagination'
export type { CardPopupProps } from './CardPopup'
export type { CardSelectOption, CardSelectProps } from './CardSelect'
export type { CardTextProps } from './CardText'

export const Card = ({
  className,
  title,
  subtitle,
  action,
  children,
}: CardProps) => {
  const hasTitle = !!title || !!subtitle || !!action

  const hasChildren = useMemo(
    // Children.count(children) counts empty nodes too
    // Children.toArray(children).length counts only non-empty nodes
    () => !!Children.toArray(children).length,
    [children]
  )

  if (title === 'Operations') {
    console.log(hasChildren, action)
  }

  if (!hasChildren && !action) {
    return null
  }

  return (
    <div
      className={clsx(
        className,
        'py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5'
      )}
    >
      {hasTitle && (
        <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
          <div className="flex-auto min-w-0 flex flex-col justify-center gap-1">
            {!!title && (
              <h2 className="flex-none text-lg font-medium leading-6 truncate">
                {title}
              </h2>
            )}

            {!!subtitle && (
              <p className="flex-none text-sm text-zinc-600 truncate">
                {subtitle}
              </p>
            )}
          </div>

          {!!action && <div className="flex-none">{action}</div>}
        </div>
      )}

      {hasTitle && hasChildren && <Card.Divider />}

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
Card.Skeleton = CardSkeleton
Card.Text = CardText
