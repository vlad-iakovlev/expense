import { FC, useCallback, useMemo, useState } from 'react'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { StatisticsCategories } from './StatisticsCategories.tsx'
import { StatisticsCharts } from './StatisticsCharts.tsx'
import { StatisticsPeriod } from './StatisticsPeriod.tsx'

interface Props {
  className?: string
}

export const StatisticsCard: FC<Props> = ({ className }) => {
  const { statisticsByCategoryResponse } = useStatisticsByCategoryContext()

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
      })) ?? []
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

  return (
    <Card className={className}>
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
