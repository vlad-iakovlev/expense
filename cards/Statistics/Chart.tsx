import { useCallback, useMemo } from 'react'
import { Amount } from '@/components/common/Amount'
import { Card } from '@/components/common/Card/index'
import { PieChart, PieChartItem } from '@/components/common/PieChart/index'
import {
  ClientStatisticsItem,
  ClientStatisticsType,
  PopulatedClientCurrency,
} from '@/types/client'
import { Decimal } from '@/utils/Decimal'
import { formatPercent } from '@/utils/formatPercent'

const TITLE = {
  [ClientStatisticsType.INCOMES]: 'Incomes',
  [ClientStatisticsType.EXPENSES]: 'Expenses',
}

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

type ChartProps = {
  currency: PopulatedClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Chart = ({ currency, items, type }: ChartProps) => {
  const chartItems = useMemo<PieChartItem[]>(
    () =>
      items.map((item) => ({
        id: item.category,
        color: item.color,
        value: item.amount,
      })),
    [items],
  )

  const renderTooltip = useCallback(
    (itemId: string | null, total: Decimal) => {
      const item = items.find((item) => item.category === itemId)

      return (
        <div
          className="max-w-[65%] pt-1 text-center"
          tabIndex={0}
          aria-label={`Total: ${total.toFixed(currency.fractionalDigits)} ${currency.name}`}
        >
          <div className="truncate text-tertiary-foreground">
            {item ? item.category : TITLE[type]}
          </div>
          <Amount
            className="truncate text-lg font-medium"
            amount={item ? item.amount : total}
            currency={currency}
            type={AMOUNT_TYPE[type]}
          />
          <div className="text-tertiary-foreground">
            {formatPercent(
              item ? item.amount.toNumber() / total.toNumber() : 1,
            )}
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
        className="max-w-56 flex-1"
        items={chartItems}
        renderTooltip={renderTooltip}
      />
    </Card.Block>
  )
}
