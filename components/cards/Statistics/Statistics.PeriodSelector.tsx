import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC, useCallback, useMemo } from 'react'
import { Period } from '../../../hooks/usePeriod.ts'
import {
  formatMonth,
  formatWeek,
  formatYear,
} from '../../../utils/formatDate.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

const options: CardSelectOption<Period>[] = [
  {
    id: Period.ALL,
    name: 'All',
  },
  {
    id: Period.WEEK,
    name: 'Week',
  },
  {
    id: Period.MONTH,
    name: 'Month',
  },
  {
    id: Period.YEAR,
    name: 'Year',
  },
]

interface Props {
  fromDate: Date
  period: Period
  setPeriod: (period: Period) => void
  goPrev: () => void
  goNext: () => void
}

export const PeriodSelector: FC<Props> = ({
  fromDate,
  period,
  setPeriod,
  goPrev,
  goNext,
}) => {
  const value = useMemo(() => {
    return options.find((option) => period === option.id) ?? options[0]
  }, [period])

  const handleChange = useCallback(
    (option: CardSelectOption<Period>) => {
      setPeriod(option.id)
    },
    [setPeriod]
  )

  return (
    <>
      <Card.Select
        label="Period"
        options={options}
        value={value}
        onChange={handleChange}
      />

      {period !== Period.ALL && (
        <div className="flex items-center min-h-12 px-4 sm:px-6 py-2 gap-3">
          <Button
            className="flex-none"
            theme="secondary"
            iconStart={<ChevronLeftIcon />}
            onClick={goPrev}
          />

          <div className="flex-auto font-medium text-center truncate">
            {period === Period.WEEK && formatWeek(fromDate)}
            {period === Period.MONTH && formatMonth(fromDate)}
            {period === Period.YEAR && formatYear(fromDate)}
          </div>

          <Button
            className="flex-none"
            theme="secondary"
            iconStart={<ChevronRightIcon />}
            onClick={goNext}
          />
        </div>
      )}
    </>
  )
}
