import clsx from 'clsx'
import { FC, ReactNode } from 'react'

export enum ButtonSize {
  MEDIUM,
  LARGE,
}

export enum ButtonTheme {
  PRIMARY,
}

export interface ButtonProps {
  children?: ReactNode
  href?: string
  size?: ButtonSize
  theme?: ButtonTheme
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  size = ButtonSize.MEDIUM,
  theme = ButtonTheme.PRIMARY,
  onClick,
}) => {
  return (
    <button
      className={clsx({
        'inline-flex justify-center rounded-md border border-transparent': true,
        'px-4 py-2 text-sm font-medium': size === ButtonSize.MEDIUM,
        'px-6 py-3 font-medium': size === ButtonSize.LARGE,
        'bg-green-700 text-white hover:bg-green-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500':
          theme === ButtonTheme.PRIMARY,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
