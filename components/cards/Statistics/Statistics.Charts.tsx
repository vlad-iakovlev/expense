import { FC, useCallback, useMemo } from 'react'
import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { formatPercent } from '../../../utils/formatPercent.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { PieChart, PieChartItem } from '../../ui-kit/PieChart/PieChart.tsx'

const TITLE = {
  [ClientStatisticsType.INCOMES]: 'Incomes',
  [ClientStatisticsType.EXPENSES]: 'Expenses',
}

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
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

      return (
        <div className="max-w-[65%] pt-1 text-center">
          <div className="text-gray-600 truncate">
            {item ? item.category : TITLE[type]}
          </div>
          <Amount
            className="text-lg font-medium truncate"
            amount={item ? item.amount : total}
            currency={currency}
            type="expense"
          />
          <div className="text-gray-600">
            {formatPercent(item ? item.amount / total : 1)}
          </div>
        </div>
      )
    },
    [currency, items, type]
  )

  return (
    <Card.Block className="flex justify-center gap-3">
      <PieChart
        className="flex-1 max-w-56"
        items={chartItems}
        renderTooltip={renderTooltip}
      />
    </Card.Block>
  )
}
