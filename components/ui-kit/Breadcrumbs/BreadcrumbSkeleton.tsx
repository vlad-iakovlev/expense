import { FC } from 'react'

export interface BreadcrumbSkeletonProps {
  withParent?: boolean
}

export const BreadcrumbSkeleton: FC<BreadcrumbSkeletonProps> = ({
  withParent,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {withParent ? (
        <div className="md:hidden w-48 h-5 my-1 bg-cyan-900 rounded-full opacity-20" />
      ) : null}

      <div className="w-48 h-5 my-1 bg-zinc-900 rounded-full opacity-20" />
    </div>
  )
}
