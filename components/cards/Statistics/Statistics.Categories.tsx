import { useCallback } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useDisabledCategories } from '../../../contexts/RootStore/hooks/useDisabledCategories.ts'
import {
  ClientCurrency,
  ClientStatisticsItem,
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
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Categories = ({ currency, items, type }: Props) => {
  const { setCategoryFilter } = useCategoryFilter()
  const { disabledCategories, toggleCategory } = useDisabledCategories()

  const isEnabled = useCallback(
    (category: string) => !disabledCategories.includes(category),
    [disabledCategories],
  )

  return (
    <>
      {items
        .filter((item) => item.amount)
        .map((item) => (
          <Card.Button
            key={item.category}
            prefix={
              <Switch
                ariaLabel={`Toggle category ${item.category}`}
                value={isEnabled(item.category)}
                color={isEnabled(item.category) ? item.color : undefined}
                onChange={(value) => toggleCategory(item.category, value)}
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
            onClick={() => setCategoryFilter(item.category)}
          />
        ))}
    </>
  )
}
