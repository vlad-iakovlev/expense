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

export const Categories: FC<Props> = ({
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
          prefix={
            <Switch
              value={!isCategoryDisabled(item.category)}
              color={isCategoryDisabled(item.category) ? undefined : item.color}
              onChange={(value) => setCategoryDisabled(item.category, !value)}
            />
          }
          label={item.category}
          value={
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
        />
      ))}
    </>
  )
}
