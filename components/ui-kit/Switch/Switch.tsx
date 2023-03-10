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
        'flex items-center w-10 h-6 p-0.5 rounded-full transition-colors',
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
          'w-5 h-5 bg-white rounded-full transform transition-transform',
          {
            'translate-x-4': value,
            'translate-x-0': !value,
          }
        )}
      />
    </button>
  )
}
