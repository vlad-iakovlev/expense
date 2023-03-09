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
  const { period, statisticsByCategory } = useStatisticsByCategoryContext()

  const [enabledCategories, setEnabledCategories] = useState<
    Record<string, boolean>
  >({})

  const colors = useMemo(() => {
    return statisticsByCategory.items.reduce<Record<string, string>>(
      (acc, item, index) => {
        acc[item.category] = interpolateTurbo(
          index / (statisticsByCategory.items.length - 1)
        )
        return acc
      },
      {}
    )
  }, [statisticsByCategory.items])

  const items = useMemo(() => {
    return statisticsByCategory.items.map((item) => ({
      ...item,
      ...(!enabledCategories[item.category] && {
        incomeAmount: 0,
        expenseAmount: 0,
      }),
    }))
  }, [enabledCategories, statisticsByCategory.items])

  useEffect(() => {
    setEnabledCategories(
      statisticsByCategory.items.reduce<Record<string, boolean>>(
        (acc, item) => {
          acc[item.category] = true
          return acc
        },
        {}
      )
    )
  }, [statisticsByCategory.items])

  if (
    period === StatisticsByCategoryPeriod.ALL &&
    !statisticsByCategory.items.length
  ) {
    return null
  }

  return (
    <Card>
      <Card.Title title="Statistics" />

      <Card.Divider />

      <StatisticsPeriod />

      {statisticsByCategory.items.length ? (
        <>
          <StatisticsCharts items={items} colors={colors} />

          <StatisticsCategories
            currency={statisticsByCategory.currency}
            items={statisticsByCategory.items}
            colors={colors}
            enabled={enabledCategories}
            onChangeEnabled={setEnabledCategories}
          />
        </>
      ) : null}
    </Card>
  )
}
