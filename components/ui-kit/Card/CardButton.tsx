import { FC, MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface CardButtonProps {
  className?: string
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
  label?: ReactNode
  value?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onPointerDown?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CardButton: FC<CardButtonProps> = ({
  className,
  disabled,
  prefix,
  suffix,
  label,
  value,
  onClick,
  onPointerDown,
}) => (
  <button
    className={twMerge(
      'flex w-full items-center min-h-12 px-4 sm:px-6 py-2 gap-3 text-left bg-white hover:bg-zinc-100 active:bg-zinc-100 transition-colors',
      disabled && 'pointer-events-none',
      className
    )}
    type="button"
    onClick={onClick}
    onPointerDown={onPointerDown}
  >
    {prefix ? <div className="flex-none">{prefix}</div> : null}
    <div className="flex-auto truncate">{label}</div>
    {value ? <div className="flex-none">{value}</div> : null}
    {suffix ? <div className="flex-none">{suffix}</div> : null}
  </button>
)
