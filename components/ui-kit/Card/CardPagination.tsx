import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { FC, ReactNode } from 'react'
import { Button } from '../../ui-kit/Button/Button.tsx'

export interface CardPaginationProps {
  children?: ReactNode
  hasPrev?: boolean
  hasNext?: boolean
  onPrevClick: () => void
  onNextClick: () => void
}

export const CardPagination: FC<CardPaginationProps> = ({
  children,
  hasPrev,
  hasNext,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
      <Button
        className={clsx('flex-none', {
          invisible: !hasPrev,
        })}
        theme="secondary"
        iconStart={<ChevronLeftIcon />}
        onClick={onPrevClick}
      />

      <div className="mx-auto truncate">{children}</div>

      <Button
        className={clsx('flex-none', {
          invisible: !hasNext,
        })}
        theme="secondary"
        iconStart={<ChevronRightIcon />}
        onClick={onNextClick}
      />
    </div>
  )
}
