import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.ts'

export type SwitchProps = Modify<
  React.HTMLAttributes<HTMLDivElement>,
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
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        event.currentTarget.click()
      }

      onKeyDown?.(event)
    },
    [onKeyDown],
  )

  return (
    <div
      className={twMerge(
        'flex items-center w-11 h-7 p-0.5 rounded-full transition-colors',
        value ? 'bg-green-700' : 'bg-zinc-300',
        className,
      )}
      aria-checked={value}
      role="switch"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <div
        className={twMerge(
          'w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform',
          value ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </div>
  )
}
