import { FC } from 'react'
import { ClientCurrency } from '../../../api/types/currencies'
import { StatisticsByCategoryItem } from '../../../api/types/statistics'
import { Amount } from '../../ui-kit/Amount'
import { Card } from '../../ui-kit/Card'
import { Switch } from '../../ui-kit/Switch'

interface Props {
  currency: ClientCurrency
  items: StatisticsByCategoryItem[]
  colors: Record<string, string>
  isCategoryDisabled: (category: string) => boolean
  setCategoryDisabled: (category: string, disabled: boolean) => void
}

export const StatisticsCategories: FC<Props> = ({
  currency,
  items,
  colors,
  isCategoryDisabled,
  setCategoryDisabled,
}) => {
  return (
    <>
      {items.map((item) => (
        <Card.Text
          key={item.category}
          start={
            <Switch
              value={!isCategoryDisabled(item.category)}
              onChange={(value) => setCategoryDisabled(item.category, !value)}
            />
          }
          end={
            <div className="font-medium text-right">
              <Amount
                amount={item.incomeAmount}
                currency={currency}
                type="income"
              />
              <Amount
                amount={item.expenseAmount}
                currency={currency}
                type="expense"
              />
            </div>
          }
        >
          <div
            className="w-20 h-4 my-1 rounded-full"
            style={{ backgroundColor: colors[item.category] }}
          />
          {item.category}
        </Card.Text>
      ))}
    </>
  )
}
