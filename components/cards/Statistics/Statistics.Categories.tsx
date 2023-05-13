import { FC } from 'react'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Switch } from '../../ui-kit/Switch/Switch.tsx'

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsByCategory[]
  type: ClientStatisticsType
  isCategoryDisabled: (category: string) => boolean
  setCategoryDisabled: (category: string, disabled: boolean) => void
}

export const Categories: FC<Props> = ({
  currency,
  items,
  type,
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
            <Amount
              className="font-medium"
              amount={item.amount}
              currency={currency}
              type={AMOUNT_TYPE[type]}
            />
          }
        />
      ))}
    </>
  )
}
