import { FC } from 'react'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Switch } from '../../ui-kit/Switch/Switch.tsx'

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsByCategory[]
  isCategoryDisabled: (category: string) => boolean
  setCategoryDisabled: (category: string, disabled: boolean) => void
}

export const StatisticsCategories: FC<Props> = ({
  currency,
  items,
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
            style={{ backgroundColor: item.color }}
          />
          {item.category}
        </Card.Text>
      ))}
    </>
  )
}
