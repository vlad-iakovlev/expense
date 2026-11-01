import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useCallback } from 'react'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { PeriodType } from '@/hooks/usePeriod'
import { formatPeriod, formatPeriodForAriaLabel } from '@/utils/formatDate'

type PeriodSelectorProps = {
  fromDate: Date
  periodType: PeriodType
  onChangePeriodType: (period: PeriodType) => void
  onGoPrev: () => void
  onGoNext: () => void
}

export const PeriodSelector = ({
  fromDate,
  periodType,
  onChangePeriodType,
  onGoPrev,
  onGoNext,
}: PeriodSelectorProps) => {
  const handleAllClick = useCallback(() => {
    onChangePeriodType(PeriodType.ALL)
  }, [onChangePeriodType])

  const handleWeekClick = useCallback(() => {
    onChangePeriodType(PeriodType.WEEK)
  }, [onChangePeriodType])

  const handleMonthClick = useCallback(() => {
    onChangePeriodType(PeriodType.MONTH)
  }, [onChangePeriodType])

  const handleYearClick = useCallback(() => {
    onChangePeriodType(PeriodType.YEAR)
  }, [onChangePeriodType])

  return (
    <div role="listitem" aria-label="Period">
      <Card.Block role="radiogroup" aria-label="Period type">
        <Button
          className="flex-auto px-0"
          size="sm"
          theme={periodType === PeriodType.ALL ? 'green' : 'white'}
          role="radio"
          aria-label="All time"
          aria-checked={periodType === PeriodType.ALL ? 'true' : 'false'}
          onClick={handleAllClick}
        >
          All
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={periodType === PeriodType.WEEK ? 'green' : 'white'}
          role="radio"
          aria-checked={periodType === PeriodType.WEEK ? 'true' : 'false'}
          onClick={handleWeekClick}
        >
          Week
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={periodType === PeriodType.MONTH ? 'green' : 'white'}
          role="radio"
          aria-checked={periodType === PeriodType.MONTH ? 'true' : 'false'}
          onClick={handleMonthClick}
        >
          Month
        </Button>

        <Button
          className="flex-auto px-0"
          size="sm"
          theme={periodType === PeriodType.YEAR ? 'green' : 'white'}
          role="radio"
          aria-checked={periodType === PeriodType.YEAR ? 'true' : 'false'}
          onClick={handleYearClick}
        >
          Year
        </Button>
      </Card.Block>

      {periodType !== PeriodType.ALL && (
        <Card.Block role="presentation">
          <div
            className="order-2 flex-auto truncate text-center font-medium"
            tabIndex={0}
            aria-label={formatPeriodForAriaLabel(periodType, fromDate)}
            role="presentation"
          >
            {formatPeriod(periodType, fromDate)}
          </div>

          <Button
            className="order-1 flex-none"
            size="md"
            theme="white"
            iconStart={<ChevronLeftIcon />}
            aria-label="Previous period"
            onClick={onGoPrev}
          />

          <Button
            className="order-3 flex-none"
            size="md"
            theme="white"
            iconStart={<ChevronRightIcon />}
            aria-label="Next period"
            onClick={onGoNext}
          />
        </Card.Block>
      )}
    </div>
  )
}
