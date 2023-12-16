import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.js'

export type ButtonProps = Modify<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  {
    iconEnd?: React.ReactNode
    iconStart?: React.ReactNode
    rounded?: boolean
    size: 'sm' | 'md' | 'lg'
    theme: 'green' | 'red' | 'zinc' | 'white'
  }
>

export const Button = ({
  className,
  children,
  disabled,
  iconEnd,
  iconStart,
  rounded,
  size,
  theme,
  onKeyDown,
  ...rest
}: ButtonProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation()
      }

      onKeyDown?.(event)
    },
    [onKeyDown],
  )

  return (
    <button
      className={twMerge(
        'relative inline-flex items-center justify-center font-medium transition-colors',
        rounded ? 'rounded-full' : 'rounded-md',
        size === 'sm' && 'h-8 min-w-8 px-2 text-sm',
        size === 'md' && 'h-10 min-w-10 px-2',
        size === 'lg' && 'h-12 min-w-12 px-3',
        theme === 'green' &&
          'bg-green-700 text-white shadow-inner hover:bg-green-800 active:bg-green-800',
        theme === 'red' &&
          'bg-red-700 text-white shadow-inner hover:bg-red-800 active:bg-red-800',
        theme === 'zinc' &&
          'bg-zinc-200 text-black shadow-inner hover:bg-zinc-300 active:bg-zinc-300',
        theme === 'white' &&
          'bg-white text-black ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 active:bg-zinc-50',
        disabled && 'pointer-events-none',
        className,
      )}
      disabled={disabled}
      type="button"
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {iconStart ? (
        <div
          className={twMerge(
            'flex-none',
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-5 w-5',
            size === 'lg' && 'h-6 w-6',
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
            size === 'lg' && 'px-3',
          )}
        >
          {children}
        </div>
      ) : null}

      {iconEnd ? (
        <div
          className={twMerge(
            'flex-none',
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-5 w-5',
            size === 'lg' && 'h-6 w-6',
          )}
        >
          {iconEnd}
        </div>
      ) : null}
    </button>
  )
}
