import { FC, useCallback, useMemo } from 'react'
import { formatMonth, formatWeek, formatYear } from '../../../utils/formatDate'
import {
  StatisticsByCategoryPeriod,
  useStatisticsByCategoryContext,
} from '../../contexts/StatisticsByCategory'
import { Card, CardSelectOption } from '../../ui-kit/Card'

const options = [
  {
    id: StatisticsByCategoryPeriod.ALL,
    name: 'All',
  },
  {
    id: StatisticsByCategoryPeriod.WEEK,
    name: 'Week',
  },
  {
    id: StatisticsByCategoryPeriod.MONTH,
    name: 'Month',
  },
  {
    id: StatisticsByCategoryPeriod.YEAR,
    name: 'Year',
  },
]

export const StatisticsPeriod: FC = () => {
  const { period, setPeriod, fromDate, goPrev, goNext } =
    useStatisticsByCategoryContext()

  const value = useMemo(() => {
    return options.find((option) => period === option.id) || options[0]
  }, [period])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setPeriod(option.id as StatisticsByCategoryPeriod)
    },
    [setPeriod]
  )

  return (
    <>
      <Card.Select
        name="Period"
        options={options}
        value={value}
        onChange={handleChange}
      />

      {period !== StatisticsByCategoryPeriod.ALL && (
        <Card.Pagination
          hasPrev
          hasNext
          onPrevClick={goPrev}
          onNextClick={goNext}
        >
          <div className="font-medium text-center">
            {period === StatisticsByCategoryPeriod.WEEK && formatWeek(fromDate)}

            {period === StatisticsByCategoryPeriod.MONTH &&
              formatMonth(fromDate)}

            {period === StatisticsByCategoryPeriod.YEAR && formatYear(fromDate)}
          </div>
        </Card.Pagination>
      )}
    </>
  )
}
