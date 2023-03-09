import clsx from 'clsx'
import { FC, useCallback } from 'react'

export interface SwitchProps {
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch: FC<SwitchProps> = ({ value, onChange }) => {
  const handleClick = useCallback(() => {
    onChange(!value)
  }, [onChange, value])

  return (
    <button
      className={clsx(
        'relative flex h-6 w-11 items-center rounded-full transition-colors',
        {
          'bg-green-700': value,
          'bg-zinc-300': !value,
        }
      )}
      type="button"
      onClick={handleClick}
    >
      <div
        className={clsx(
          'h-4 w-4 transform rounded-full bg-white transition-transform',
          {
            'translate-x-6': value,
            'translate-x-1': !value,
          }
        )}
      />
    </button>
  )
}
