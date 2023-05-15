import { FC, MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps {
  className?: string
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
  className,
  children,
  disabled,
  iconEnd,
  iconStart,
  rounded,
  size = 'md',
  theme = 'primary',
  type = 'button',
  onClick,
}) => (
  <button
    className={twMerge(
      'relative inline-flex items-center justify-center transition-colors font-medium',
      rounded ? 'rounded-full' : 'rounded-md',
      size === 'sm' && 'min-w-8 h-8 px-2 text-sm',
      size === 'md' && 'min-w-10 h-10 px-2',
      size === 'lg' && 'min-w-12 h-12 px-3',
      theme === 'primary' &&
        'bg-green-700 text-white hover:bg-green-800 active:bg-green-800 shadow-inner',
      theme === 'secondary' &&
        'bg-white text-black ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 active:bg-zinc-50',
      theme === 'error' &&
        'bg-red-700 text-white hover:bg-red-800 active:bg-red-800 shadow-inner',
      disabled && 'pointer-events-none',
      className
    )}
    type={type}
    onClick={onClick}
  >
    {iconStart ? (
      <div
        className={twMerge(
          'flex-none',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-5 h-5',
          size === 'lg' && 'w-6 h-6'
        )}
      >
        {iconStart}
      </div>
    ) : null}

    {children ? (
      <div
        className={twMerge(
          'truncate',
          size === 'sm' && 'px-2',
          size === 'md' && 'px-2',
          size === 'lg' && 'px-3'
        )}
      >
        {children}
      </div>
    ) : null}

    {iconEnd ? (
      <div
        className={twMerge(
          'flex-none',
          size === 'sm' && 'w-4 h-4',
          size === 'md' && 'w-5 h-5',
          size === 'lg' && 'w-6 h-6'
        )}
      >
        {iconEnd}
      </div>
    ) : null}
  </button>
)
