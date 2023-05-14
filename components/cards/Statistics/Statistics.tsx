import { FC, useEffect, useState } from 'react'
import { Period, usePeriod } from '../../../hooks/usePeriod.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { useStatistics } from '../../../stores/RootStore/hooks/useStatistics.ts'
import { ClientStatisticsType } from '../../../types/client.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Categories } from './Statistics.Categories.tsx'
import { Charts } from './Statistics.Charts.tsx'
import { PeriodSelector } from './Statistics.PeriodSelector.tsx'
import { TypeSelector } from './Statistics.TypeSelector.tsx'
import { useDisabledCategories } from './useDisabledCategories.ts'

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

  const { statisticsItems, statisticsCurrency } = useStatistics({
    groupId,
    walletId,
    startDate,
    endDate,
    type,
  })

  // Reset period when type changed
  useEffect(() => setPeriod(Period.WEEK), [setPeriod, type])

  const { chartItems, isCategoryDisabled, setCategoryDisabled } =
    useDisabledCategories(statisticsItems)

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

      <Charts currency={statisticsCurrency} items={chartItems} type={type} />

      <Categories
        currency={statisticsCurrency}
        items={statisticsItems}
        type={type}
        isCategoryDisabled={isCategoryDisabled}
        setCategoryDisabled={setCategoryDisabled}
      />
    </Card>
  )
}
