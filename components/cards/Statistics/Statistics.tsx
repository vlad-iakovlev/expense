import { FC, useCallback, useMemo, useState } from 'react'
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

  const [disabledCategories, setDisabledCategories] = useState<
    Record<string, boolean>
  >({})

  const chartItems = useMemo(() => {
    return (
      statisticsByCategoryResponse?.statisticsByCategory.items.map((item) => ({
        ...item,
        ...(disabledCategories[item.category] && {
          incomeAmount: 0,
          expenseAmount: 0,
        }),
      })) || []
    )
  }, [disabledCategories, statisticsByCategoryResponse])

  const isCategoryDisabled = useCallback(
    (category: string) => {
      return !!disabledCategories[category]
    },
    [disabledCategories]
  )

  const setCategoryDisabled = useCallback(
    (category: string, disabled: boolean) => {
      setDisabledCategories((disabledCategories) => {
        return {
          ...disabledCategories,
          [category]: disabled,
        }
      })
    },
    []
  )

  if (
    statisticsByCategoryPayload.period === StatisticsByCategoryPeriod.ALL &&
    statisticsByCategoryResponse?.statisticsByCategory.items.length === 0
  ) {
    return null
  }

  return (
    <Card>
      <Card.Title title="Statistics" />
      <Card.Divider />
      <StatisticsPeriod />

      <StatisticsCharts
        currency={statisticsByCategoryResponse?.statisticsByCategory.currency}
        items={chartItems}
      />

      {statisticsByCategoryResponse?.statisticsByCategory.items.length ? (
        <StatisticsCategories
          currency={statisticsByCategoryResponse.statisticsByCategory.currency}
          items={statisticsByCategoryResponse.statisticsByCategory.items}
          isCategoryDisabled={isCategoryDisabled}
          setCategoryDisabled={setCategoryDisabled}
        />
      ) : null}

      {!statisticsByCategoryResponse && (
        <>
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
          <Card.Skeleton type="statistics" />
        </>
      )}
    </Card>
  )
}
