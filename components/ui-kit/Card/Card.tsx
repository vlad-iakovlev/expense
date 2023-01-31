import clsx from 'clsx'
import { forwardRef, MouseEvent, ReactNode } from 'react'
import { ForwardRef } from '../../../types/utility'

export interface CardProps {
  className?: string
  children?: ReactNode
}

export interface CardTitleProps {
  title: string
  subtitle?: string
}

export interface CardButtonProps {
  disabled?: boolean
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

type CardType = ForwardRef<HTMLDivElement, CardProps> & {
  Title: ForwardRef<HTMLDivElement, CardTitleProps>
  Button: ForwardRef<HTMLButtonElement, CardButtonProps>
  Divider: ForwardRef<HTMLDivElement>
}

export const Card = forwardRef(function Card({ className, children }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        'py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-shadow'
      )}
    >
      {children}
    </div>
  )
}) as CardType

Card.Title = forwardRef(function CardTitle({ title, subtitle }, ref) {
  return (
    <div
      ref={ref}
      className="flex flex-col justify-center min-h-12 px-4 sm:px-6 py-2 gap-1"
    >
      <h2 className="flex-none text-lg font-medium leading-6 truncate">
        {title}
      </h2>
      {subtitle && (
        <p className="flex-none text-sm text-zinc-600 truncate">{subtitle}</p>
      )}
    </div>
  )
})

Card.Button = forwardRef(function CardButton(
  { disabled, start, end, children, onClick },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 transition-colors',
        { 'pointer-events-none': disabled }
      )}
      type="button"
      onClick={onClick}
    >
      {start ? <div className="flex-none">{start}</div> : null}
      <div className="flex-auto truncate">{children}</div>
      {end ? <div className="flex-none">{end}</div> : null}
    </button>
  )
})

Card.Divider = forwardRef(function CardDivider({}, ref) {
  return <div ref={ref} className="my-2 border-t border-zinc-200" />
})
