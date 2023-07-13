import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export interface SwitchProps {
  className?: string
  color?: string
  value: boolean
  onChange: (value: boolean) => void
}

export const Switch = ({ className, color, value, onChange }: SwitchProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      onChange(!value)
    },
    [onChange, value]
  )

  return (
    <div
      className={twMerge(
        'flex items-center w-11 h-7 p-0.5 rounded-full transition-colors',
        value ? 'bg-green-700' : 'bg-zinc-300',
        className
      )}
      tabIndex={0}
      role="button"
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      <div
        className={twMerge(
          'w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform',
          value ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </div>
  )
}
