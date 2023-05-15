import { useState } from 'react'
import { useOperations } from '../../../contexts/RootStore/hooks/useOperations.ts'
import { useStatistics } from '../../../contexts/RootStore/hooks/useStatistics.ts'
import { usePeriod } from '../../../hooks/usePeriod.ts'
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

export const StatisticsCard: React.FC<Props> = ({
  className,
  groupId,
  walletId,
}) => {
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

  const { chartItems, isCategoryDisabled, setCategoryDisabled } =
    useDisabledCategories(statisticsItems)

  if (!operationIds.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title
        title="Stats"
        actions={<TypeSelector value={type} onChange={setType} />}
      />

      <Card.Divider />

      <PeriodSelector
        fromDate={fromDate}
        period={period}
        onChangePeriod={setPeriod}
        onGoPrev={goPrev}
        onGoNext={goNext}
      />

      <Card.Divider />

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
