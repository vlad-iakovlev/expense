import { FC, useMemo } from 'react'
import { Card } from './Card'

export interface CardSkeletonProps {
  elementsCount: number
}

export const CardSkeleton: FC<CardSkeletonProps> = ({
  elementsCount: count,
}) => {
  const elements = useMemo(() => Array(count).fill(0), [count])

  return (
    <Card>
      <Card.Title
        title={<div className="w-32 h-5 bg-zinc-900 rounded-full opacity-20" />}
      />
      {count ? <Card.Divider /> : null}
      {elements.map((_, index) => (
        <div key={index} className="flex items-center h-12 px-4 sm:px-6">
          <div className="w-24 h-4 bg-zinc-900 rounded-full opacity-20"></div>
        </div>
      ))}
    </Card>
  )
}
