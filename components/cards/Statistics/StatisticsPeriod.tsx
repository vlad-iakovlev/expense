import { FC, useCallback, useMemo } from 'react'
import {
  formatMonth,
  formatWeek,
  formatYear,
} from '../../../utils/formatDate.ts'
import {
  StatisticsByCategoryPeriod,
  useStatisticsByCategoryContext,
} from '../../contexts/StatisticsByCategory.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

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
  const { statisticsByCategoryPayload } = useStatisticsByCategoryContext()

  const value = useMemo(() => {
    return (
      options.find(
        (option) => statisticsByCategoryPayload.period === option.id
      ) ?? options[0]
    )
  }, [statisticsByCategoryPayload.period])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      statisticsByCategoryPayload.setPeriod(
        option.id as StatisticsByCategoryPeriod
      )
    },
    [statisticsByCategoryPayload]
  )

  return (
    <>
      <Card.Select
        name="Period"
        options={options}
        value={value}
        onChange={handleChange}
      />

      {statisticsByCategoryPayload.period !==
        StatisticsByCategoryPeriod.ALL && (
        <Card.Pagination
          hasPrev
          hasNext
          onPrevClick={statisticsByCategoryPayload.goPrev}
          onNextClick={statisticsByCategoryPayload.goNext}
        >
          <div className="font-medium text-center">
            {statisticsByCategoryPayload.period ===
              StatisticsByCategoryPeriod.WEEK &&
              formatWeek(statisticsByCategoryPayload.fromDate)}

            {statisticsByCategoryPayload.period ===
              StatisticsByCategoryPeriod.MONTH &&
              formatMonth(statisticsByCategoryPayload.fromDate)}

            {statisticsByCategoryPayload.period ===
              StatisticsByCategoryPeriod.YEAR &&
              formatYear(statisticsByCategoryPayload.fromDate)}
          </div>
        </Card.Pagination>
      )}
    </>
  )
}
