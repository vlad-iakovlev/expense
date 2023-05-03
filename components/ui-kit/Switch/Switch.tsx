import { clsx } from 'clsx'
import { FC, useCallback } from 'react'

export interface SwitchProps {
  className?: string
  color?: string
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({
  className,
  color,
  value,
  onChange,
}) => {
  const handleClick = useCallback(() => {
    onChange(!value)
  }, [onChange, value])

  return (
    <button
      className={clsx(
        className,
        'flex items-center w-11 h-7 p-0.5 rounded-full transition-colors',
        {
          'bg-green-700': value,
          'bg-zinc-300': !value,
        }
      )}
      type="button"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform',
          {
            'translate-x-4': value,
            'translate-x-0': !value,
          }
        )}
      />
    </button>
  )
}
