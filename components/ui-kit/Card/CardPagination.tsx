import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'
import { Button } from '../../ui-kit/Button'

export interface CardPaginationProps {
  hasPrev?: boolean
  hasNext?: boolean
  onPrevClick: () => void
  onNextClick: () => void
}

export const CardPagination: FC<CardPaginationProps> = ({
  hasPrev,
  hasNext,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
      {hasPrev && (
        <Button
          className="flex-none mr-auto"
          theme="secondary"
          size="sm"
          iconStart={<ChevronLeftIcon />}
          onClick={onPrevClick}
        />
      )}
      {hasNext && (
        <Button
          className="flex-none ml-auto"
          theme="secondary"
          size="sm"
          iconStart={<ChevronRightIcon />}
          onClick={onNextClick}
        />
      )}
    </div>
  )
}
