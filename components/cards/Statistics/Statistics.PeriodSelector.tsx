import { FC, useCallback, useMemo } from 'react'
import { Period } from '../../../hooks/usePeriod.ts'
import {
  formatMonth,
  formatWeek,
  formatYear,
} from '../../../utils/formatDate.ts'
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
        <Card.Pagination
          hasPrev
          hasNext
          onPrevClick={goPrev}
          onNextClick={goNext}
        >
          <div className="font-medium text-center">
            {period === Period.WEEK && formatWeek(fromDate)}
            {period === Period.MONTH && formatMonth(fromDate)}
            {period === Period.YEAR && formatYear(fromDate)}
          </div>
        </Card.Pagination>
      )}
    </>
  )
}
