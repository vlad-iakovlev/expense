import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '@/types/utility'

export type SwitchProps = Modify<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  {
    value: boolean
    onChange: (value: boolean) => void
    children?: never
    onClick?: never
  }
>

export const Switch = ({
  className,
  value,
  onChange,
  onKeyDown,
  ...rest
}: SwitchProps) => {
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onChange(!value)
    },
    [onChange, value],
  )

  const handleKeyDown = React.useCallback(
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
        'flex h-7 w-11 items-center rounded-full p-0.5 transition-colors',
        value ? 'bg-green-700' : 'bg-quaternary-background',
        className,
      )}
      type="button"
      tabIndex={0}
      role="checkbox"
      aria-checked={value ? 'true' : 'false'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        className={twMerge(
          'h-6 w-6 transform rounded-full bg-secondary-background shadow-xs transition-transform',
          value ? 'translate-x-4' : 'translate-x-0',
        )}
        aria-hidden="true"
      />
    </button>
  )
}
