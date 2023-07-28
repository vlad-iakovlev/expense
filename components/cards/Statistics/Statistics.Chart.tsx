import { useCallback, useMemo } from 'react'
import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { formatPercent } from '../../../utils/formatPercent.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { PieChart, PieChartItem } from '../../ui-kit/PieChart/PieChart.tsx'

const TITLE = {
  [ClientStatisticsType.INCOMES]: 'Incomes',
  [ClientStatisticsType.EXPENSES]: 'Expenses',
}

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Chart = ({ currency, items, type }: Props) => {
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
        <div
          className="max-w-[65%] pt-1 text-center"
          tabIndex={0}
          aria-label={`Total: ${formatAmount(total)} ${
            currency.name ?? currency.symbol
          }`}
        >
          <div className="text-gray-600 truncate">
            {item ? item.category : TITLE[type]}
          </div>
          <Amount
            className="text-lg font-medium truncate"
            amount={item ? item.amount : total}
            currency={currency}
            type={AMOUNT_TYPE[type]}
          />
          <div className="text-gray-600">
            {formatPercent(item ? item.amount / total : 1)}
          </div>
        </div>
      )
    },
    [currency, items, type],
  )

  return (
    <Card.Block
      className="justify-center"
      aria-label="Chart"
      aria-disabled="true"
    >
      <PieChart
        className="flex-1 max-w-56"
        items={chartItems}
        renderTooltip={renderTooltip}
      />
    </Card.Block>
  )
}
