import { useMemo, useState } from 'react'
import { useDisabledCategories } from '../../../contexts/RootStore/hooks/useDisabledCategories.js'
import { useOperations } from '../../../contexts/RootStore/hooks/useOperations.js'
import { useStatistics } from '../../../contexts/RootStore/hooks/useStatistics.js'
import { usePeriod } from '../../../hooks/usePeriod.js'
import { ClientStatisticsType } from '../../../types/client.js'
import { Card } from '../../ui-kit/Card/Card.jsx'
import { Categories } from './Statistics.Categories.jsx'
import { Chart } from './Statistics.Chart.jsx'
import { PeriodSelector } from './Statistics.PeriodSelector.jsx'
import { TypeSelector } from './Statistics.TypeSelector.jsx'

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
  const chartItems = useMemo(
    () =>
      statisticsItems.map((item) => ({
        ...item,
        amount: disabledCategories.includes(item.category) ? 0 : item.amount,
      })),
    [disabledCategories, statisticsItems],
  )

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
