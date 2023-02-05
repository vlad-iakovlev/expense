import clsx from 'clsx'
import { FC, MouseEvent, ReactNode } from 'react'

export interface ButtonProps {
  children?: ReactNode
  disabled?: boolean
  iconEnd?: ReactNode
  iconStart?: ReactNode
  rounded?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: 'primary' | 'secondary' | 'error'
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: MouseEvent) => void
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled,
  iconEnd,
  iconStart,
  rounded,
  size = 'md',
  theme = 'primary',
  type = 'button',
  onClick,
}) => {
  return (
    <button
      className={clsx('inline-flex items-center justify-center shadow-sm', {
        'rounded-md': !rounded,
        'rounded-full': rounded,
        'min-w-8 h-8 px-2 text-sm font-medium': size === 'sm',
        'min-w-10 h-10 px-2 text-sm font-medium': size === 'md',
        'min-w-12 h-12 px-3 font-medium': size === 'lg',
        'bg-green-700 text-white hover:bg-green-800 transition-colors':
          theme === 'primary',
        'bg-white border border-zinc-300 hover:bg-zinc-50':
          theme === 'secondary',
        'bg-red-700 text-white hover:bg-red-800 transition-colors':
          theme === 'error',
        'pointer-events-none': disabled,
      })}
      type={type}
      onClick={onClick}
    >
      {iconStart ? (
        <div
          className={clsx('flex-none', {
            'w-4 h-4': size === 'sm',
            'w-5 h-5': size === 'md',
            'w-6 h-6': size === 'lg',
          })}
        >
          {iconStart}
        </div>
      ) : null}

      {children ? (
        <div
          className={clsx('truncate', {
            'px-2': size === 'sm' || size === 'md',
            'px-3': size === 'lg',
          })}
        >
          {children}
        </div>
      ) : null}

      {iconEnd ? (
        <div
          className={clsx('flex-none', {
            'w-4 h-4': size === 'sm',
            'w-5 h-5': size === 'md',
            'w-6 h-6': size === 'lg',
          })}
        >
          {iconEnd}
        </div>
      ) : null}
    </button>
  )
}
