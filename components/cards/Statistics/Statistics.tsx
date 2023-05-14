import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Period, usePeriod } from '../../../hooks/usePeriod.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { useStatisticsByCategory } from '../../../stores/RootStore/hooks/useStatisticsByCategory.ts'
import { ClientStatisticsType } from '../../../types/client.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Categories } from './Statistics.Categories.tsx'
import { Charts } from './Statistics.Charts.tsx'
import { PeriodSelector } from './Statistics.PeriodSelector.tsx'
import { TypeSelector } from './Statistics.TypeSelector.tsx'

interface Props {
  className?: string
  groupId?: string
  walletId?: string
}

export const StatisticsCard: FC<Props> = ({ className, groupId, walletId }) => {
  const { operationIds } = useOperations({ groupId, walletId })

  const [type, setType] = useState(ClientStatisticsType.EXPENSES)
  const { startDate, endDate, fromDate, period, setPeriod, goPrev, goNext } =
    usePeriod()
  const { statisticsByCategoryItems, statisticsByCategoryCurrency } =
    useStatisticsByCategory({ groupId, walletId, startDate, endDate, type })

  // Reset period when type changed
  useEffect(() => setPeriod(Period.WEEK), [setPeriod, type])

  const [disabledCategories, setDisabledCategories] = useState<
    Record<string, boolean>
  >({})

  const chartItems = useMemo(() => {
    return statisticsByCategoryItems.filter((item) => {
      return !disabledCategories[item.category]
    })
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

      <TypeSelector type={type} setType={setType} />

      <PeriodSelector
        fromDate={fromDate}
        period={period}
        setPeriod={setPeriod}
        goPrev={goPrev}
        goNext={goNext}
      />

      <Charts
        currency={statisticsByCategoryCurrency}
        items={chartItems}
        type={type}
      />

      {!!statisticsByCategoryItems.length && (
        <Categories
          currency={statisticsByCategoryCurrency}
          items={statisticsByCategoryItems}
          type={type}
          isCategoryDisabled={isCategoryDisabled}
          setCategoryDisabled={setCategoryDisabled}
        />
      )}
    </Card>
  )
}
