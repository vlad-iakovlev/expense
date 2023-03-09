import { FC } from 'react'

export const CardSkeleton: FC = () => {
  return (
    <div className="flex items-center h-12 px-4 sm:px-6 animate-pulse">
      <div className="w-24 h-4 bg-zinc-900 rounded-full opacity-20"></div>
    </div>
  )
}
