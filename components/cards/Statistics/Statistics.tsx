import { interpolateTurbo } from 'd3-scale-chromatic'
import { FC, useEffect, useMemo, useState } from 'react'
import {
  StatisticsByCategoryPeriod,
  useStatisticsByCategoryContext,
} from '../../contexts/StatisticsByCategory'
import { Card } from '../../ui-kit/Card'
import { StatisticsCategories } from './StatisticsCategories'
import { StatisticsCharts } from './StatisticsCharts'
import { StatisticsPeriod } from './StatisticsPeriod'

export const StatisticsCard: FC = () => {
  const { statisticsByCategoryResponse, statisticsByCategoryPayload } =
    useStatisticsByCategoryContext()

  const [enabledCategories, setEnabledCategories] = useState<
    Record<string, boolean>
  >({})

  const colors = useMemo(() => {
    return (
      statisticsByCategoryResponse?.statisticsByCategory.items.reduce<
        Record<string, string>
      >((acc, item, index) => {
        acc[item.category] = interpolateTurbo(
          index /
            (statisticsByCategoryResponse.statisticsByCategory.items.length - 1)
        )
        return acc
      }, {}) || {}
    )
  }, [statisticsByCategoryResponse])

  const items = useMemo(() => {
    return (
      statisticsByCategoryResponse?.statisticsByCategory.items.map((item) => ({
        ...item,
        ...(!enabledCategories[item.category] && {
          incomeAmount: 0,
          expenseAmount: 0,
        }),
      })) || []
    )
  }, [enabledCategories, statisticsByCategoryResponse])

  useEffect(() => {
    if (!statisticsByCategoryResponse) return

    setEnabledCategories(
      statisticsByCategoryResponse.statisticsByCategory.items.reduce<
        Record<string, boolean>
      >((acc, item) => {
        acc[item.category] = true
        return acc
      }, {})
    )
  }, [statisticsByCategoryResponse])

  if (
    statisticsByCategoryPayload.period === StatisticsByCategoryPeriod.ALL &&
    !statisticsByCategoryResponse?.statisticsByCategory.items.length
  ) {
    return null
  }

  return (
    <Card>
      <Card.Title title="Statistics" />
      <Card.Divider />
      <StatisticsPeriod />
      <StatisticsCharts items={items} colors={colors} />

      {statisticsByCategoryResponse?.statisticsByCategory.items.length ? (
        <StatisticsCategories
          currency={statisticsByCategoryResponse.statisticsByCategory.currency}
          items={statisticsByCategoryResponse.statisticsByCategory.items}
          colors={colors}
          enabledCategories={enabledCategories}
          setEnabledCategories={setEnabledCategories}
        />
      ) : null}

      {!statisticsByCategoryResponse && (
        <>
          <Card.Skeleton />
          <Card.Skeleton />
          <Card.Skeleton />
        </>
      )}
    </Card>
  )
}
