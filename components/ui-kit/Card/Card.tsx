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

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card = ({ className, children, onClick }: CardProps) => {
  return (
    <div
      className={twMerge(
        'py-2 bg-white rounded-md shadow-lg text-left ring-1 ring-black ring-opacity-5 transition-shadow',
        !!onClick && 'hover:shadow-2xl active:shadow-2xl cursor-pointer',
        className,
      )}
      role={onClick ? 'button' : 'list'}
      onClick={onClick}
    >
      {children}
    </div>
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
