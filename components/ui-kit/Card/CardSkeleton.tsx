import { FC } from 'react'
import { Card } from './Card'

export interface CardSkeletonProps {
  type?: 'default' | 'operation' | 'statistics'
}

export const CardSkeleton: FC<CardSkeletonProps> = ({ type = 'default' }) => {
  return (
    <div className="animate-pulse">
      <Card.Text
        start={
          type === 'statistics' && (
            <div className="w-11 h-6 bg-zinc-900 rounded-full opacity-20" />
          )
        }
      >
        {type === 'default' && (
          <div className="w-32 h-4 my-1 bg-zinc-900 rounded-full opacity-20" />
        )}

        {type === 'operation' && (
          <div className="flex flex-col">
            <div className="w-32 h-4 my-1 bg-zinc-900 rounded-full opacity-20" />
            <div className="w-24 h-3 my-1 bg-zinc-900 rounded-full opacity-20" />
          </div>
        )}

        {type === 'statistics' && (
          <div className="flex flex-col">
            <div className="w-20 h-4 my-1 bg-zinc-900 rounded-full opacity-20" />
            <div className="w-32 h-4 my-1 bg-zinc-900 rounded-full opacity-20" />
          </div>
        )}
      </Card.Text>
    </div>
  )
}
