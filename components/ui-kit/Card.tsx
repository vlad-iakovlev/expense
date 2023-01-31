import clsx from 'clsx'
import { FC, MouseEvent, ReactNode } from 'react'

export interface CardProps {
  children?: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-shadow">
      {children}
    </div>
  )
}

export interface CardTitleProps {
  title: string
  subtitle?: string
}

const CardTitle: FC<CardTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col justify-center min-h-12 px-4 sm:px-6 py-2 gap-1">
      <h2 className="flex-none text-lg font-medium leading-6 truncate">
        {title}
      </h2>
      {subtitle && (
        <p className="flex-none text-sm text-zinc-600 truncate">{subtitle}</p>
      )}
    </div>
  )
}

Card.Title = CardTitle

export interface CardButtonProps {
  disabled?: boolean
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

const CardButton: FC<CardButtonProps> = ({
  disabled,
  start,
  end,
  children,
  onClick,
}) => {
  return (
    <button
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
}

Card.Button = CardButton

const CardDivider: FC = () => {
  return <div className="my-2 border-t border-zinc-200" />
}

Card.Divider = CardDivider
