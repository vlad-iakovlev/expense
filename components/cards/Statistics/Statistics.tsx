import { FC, useCallback, useMemo, useState } from 'react'
import { usePeriod } from '../../../hooks/usePeriod.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { useStatisticsByCategory } from '../../../stores/RootStore/hooks/useStatisticsByCategory.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Categories } from './Statistics.Categories.tsx'
import { Charts } from './Statistics.Charts.tsx'
import { PeriodSelector } from './Statistics.PeriodSelector.tsx'

interface Props {
  className?: string
  groupId?: string
  walletId?: string
}

export const StatisticsCard: FC<Props> = ({ className, groupId, walletId }) => {
  const { operationIds } = useOperations({ groupId, walletId })

  const { startDate, endDate, fromDate, period, setPeriod, goPrev, goNext } =
    usePeriod()
  const { statisticsByCategoryItems, statisticsByCategoryCurrency } =
    useStatisticsByCategory({ groupId, walletId, startDate, endDate })

  const [disabledCategories, setDisabledCategories] = useState<
    Record<string, boolean>
  >({})

  const chartItems = useMemo(() => {
    return statisticsByCategoryItems.map((item) => ({
      ...item,
      ...(disabledCategories[item.category] && {
        incomeAmount: 0,
        expenseAmount: 0,
      }),
    }))
  }, [disabledCategories, statisticsByCategoryItems])

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

  if (!operationIds.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Statistics" />

      <Card.Divider />

      <PeriodSelector
        fromDate={fromDate}
        period={period}
        setPeriod={setPeriod}
        goPrev={goPrev}
        goNext={goNext}
      />

      <Charts currency={statisticsByCategoryCurrency} items={chartItems} />

      {!!statisticsByCategoryItems.length && (
        <>
          <Card.Divider />

          <Categories
            currency={statisticsByCategoryCurrency}
            items={statisticsByCategoryItems}
            isCategoryDisabled={isCategoryDisabled}
            setCategoryDisabled={setCategoryDisabled}
          />
        </>
      )}
    </Card>
  )
}
