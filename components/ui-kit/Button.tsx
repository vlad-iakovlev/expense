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
  disabled?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  href?: string
  rounded?: boolean
  size?: ButtonSize
  theme?: ButtonTheme
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled,
  iconEnd,
  iconStart,
  rounded,
  size = ButtonSize.MEDIUM,
  theme = ButtonTheme.PRIMARY,
  onClick,
}) => {
  return (
    <button
      className={clsx('inline-flex items-center justify-center', {
        'rounded-md': !rounded,
        'rounded-full': rounded,
        'min-w-10 h-10 px-2 text-sm font-medium': size === ButtonSize.MEDIUM,
        'min-w-12 h-12 px-3 font-medium': size === ButtonSize.LARGE,
        'bg-green-700 text-white hover:bg-green-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500 transition-colors':
          theme === ButtonTheme.PRIMARY,
        'pointer-events-none': disabled,
      })}
      onClick={onClick}
    >
      {iconStart ? (
        <div
          className={clsx('flex-none', {
            'w-4 h-4': size === ButtonSize.MEDIUM,
            'w-6 h-6': size === ButtonSize.LARGE,
          })}
        >
          {iconStart}
        </div>
      ) : null}

      {children ? (
        <div
          className={clsx({
            'px-2': size === ButtonSize.MEDIUM,
            'px-3': size === ButtonSize.LARGE,
          })}
        >
          {children}
        </div>
      ) : null}

      {iconEnd ? (
        <div
          className={clsx('flex-none', {
            'w-4 h-4': size === ButtonSize.MEDIUM,
            'w-6 h-6': size === ButtonSize.LARGE,
          })}
        >
          {iconEnd}
        </div>
      ) : null}
    </button>
  )
}
