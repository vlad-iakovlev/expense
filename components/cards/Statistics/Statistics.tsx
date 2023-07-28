import { useMemo, useState } from 'react'
import { useDisabledCategories } from '../../../contexts/RootStore/hooks/useDisabledCategories.ts'
import { useOperations } from '../../../contexts/RootStore/hooks/useOperations.ts'
import { useStatistics } from '../../../contexts/RootStore/hooks/useStatistics.ts'
import { usePeriod } from '../../../hooks/usePeriod.ts'
import { ClientStatisticsType } from '../../../types/client.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Categories } from './Statistics.Categories.tsx'
import { Chart } from './Statistics.Chart.tsx'
import { PeriodSelector } from './Statistics.PeriodSelector.tsx'
import { TypeSelector } from './Statistics.TypeSelector.tsx'

interface Props {
  className?: string
  groupId?: string
  walletId?: string
}

export const StatisticsCard = ({ className, groupId, walletId }: Props) => {
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

  const { disabledCategories } = useDisabledCategories()
  const chartItems = useMemo(() => {
    return statisticsItems.map((item) => ({
      ...item,
      amount: disabledCategories.includes(item.category) ? 0 : item.amount,
    }))
  }, [disabledCategories, statisticsItems])

  const { operationIds } = useOperations({ groupId, walletId })
  if (!operationIds.length) {
    return null
  }

  return (
    <Card className={className} aria-label="Statistics">
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

      <Chart currency={statisticsCurrency} items={chartItems} type={type} />

      <Categories
        currency={statisticsCurrency}
        items={statisticsItems}
        type={type}
      />
    </Card>
  )
}
