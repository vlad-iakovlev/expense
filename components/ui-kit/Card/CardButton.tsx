import { clsx } from 'clsx'
import { FC, MouseEvent, ReactNode } from 'react'

export interface CardButtonProps {
  disabled?: boolean
  prefix?: ReactNode
  label?: ReactNode
  value?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onPointerDown?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CardButton: FC<CardButtonProps> = ({
  disabled,
  prefix,
  label,
  value,
  onClick,
  onPointerDown,
}) => (
  <button
    className={clsx(
      'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors',
      {
        'pointer-events-none': disabled,
      }
    )}
    type="button"
    onClick={onClick}
    onPointerDown={onPointerDown}
  >
    {prefix ? <div className="flex-none">{prefix}</div> : null}
    <div className="flex-auto truncate">{label}</div>
    {value ? <div className="flex-none">{value}</div> : null}
  </button>
)
