import { FC, useCallback, useMemo } from 'react'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { PieChart, PieChartItem } from '../../ui-kit/PieChart/PieChart.tsx'

const TITLE = {
  [ClientStatisticsType.INCOMES]: 'Incomes',
  [ClientStatisticsType.EXPENSES]: 'Expenses',
}

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsByCategory[]
  type: ClientStatisticsType
}

export const Charts: FC<Props> = ({ currency, items, type }) => {
  const chartItems = useMemo<PieChartItem[]>(() => {
    return items.map((item) => ({
      id: item.category,
      color: item.color,
      value: item.amount,
    }))
  }, [items])

  const renderTooltip = useCallback(
    (itemId: string | null, total: number) => {
      const item = items.find((item) => item.category === itemId)

      const title = item ? item.category : TITLE[type]
      const amount = item ? item.amount : total
      const percent = item ? Math.round((item.amount / total) * 100) : 100

      return (
        <div className="max-w-[65%] pt-1 text-center">
          <div className="text-gray-600 truncate">{title}</div>
          <Amount
            className="font-medium truncate"
            amount={amount}
            currency={currency}
            type="expense"
          />
          <div className="text-gray-800">{percent}%</div>
        </div>
      )
    },
    [currency, items, type]
  )

  return (
    <Card.Block className="flex justify-center gap-3">
      <PieChart
        className="flex-1 max-w-48"
        items={chartItems}
        renderTooltip={renderTooltip}
      />
    </Card.Block>
  )
}
