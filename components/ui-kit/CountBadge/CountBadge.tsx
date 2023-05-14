import { FC } from 'react'

export interface CountBadgeProps {
  count: number
}

export const CountBadge: FC<CountBadgeProps> = ({ count }) => {
  return (
    <div className="flex-none flex items-center justify-center min-w-7 px-2 py-1 text-sm text-zinc-700 bg-zinc-200 rounded-full">
      {count < 100 ? count : '99+'}
    </div>
  )
}
