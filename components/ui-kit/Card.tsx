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
  children?: ReactNode
}

const Title: FC<CardTitleProps> = ({ children }) => {
  return (
    <h2 className="flex items-center min-h-12 px-6 py-2 text-lg font-medium truncate">
      {children}
    </h2>
  )
}

Card.Title = Title

export interface CardButtonProps {
  disabled?: boolean
  start?: ReactNode
  end?: ReactNode
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

const Button: FC<CardButtonProps> = ({
  disabled,
  start,
  end,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'flex w-full items-center min-h-12 px-6 py-2 gap-4 text-left bg-white hover:bg-zinc-100 transition-colors',
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

Card.Button = Button

const Divider: FC = () => {
  return <div className="my-2 border-t border-zinc-100" />
}

Card.Divider = Divider
