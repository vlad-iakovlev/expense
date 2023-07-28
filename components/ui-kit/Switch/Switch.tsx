import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'

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
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onChange(!value)
    },
    [onChange, value],
  )

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
        'flex items-center w-11 h-7 p-0.5 rounded-full transition-colors',
        value ? 'bg-green-700' : 'bg-zinc-300',
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
          'w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform',
          value ? 'translate-x-4' : 'translate-x-0',
        )}
        aria-hidden="true"
      />
    </button>
  )
}
