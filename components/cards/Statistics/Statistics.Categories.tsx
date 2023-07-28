import { FunnelIcon } from '@heroicons/react/20/solid'
import { useCallback } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useDisabledCategories } from '../../../contexts/RootStore/hooks/useDisabledCategories.ts'
import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'
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
  const { categoryFilter, toggleCategoryFilter } = useCategoryFilter()
  const { disabledCategories, toggleCategory } = useDisabledCategories()

  const isEnabled = useCallback(
    (category: string) => !disabledCategories.includes(category),
    [disabledCategories],
  )

  return (
    <div role="listitem">
      <div role="list" aria-label="Categories">
        {items
          .filter((item) => item.amount)
          .map((item) => (
            <Card.Item
              key={item.category}
              prefix={
                <Switch
                  style={{
                    backgroundColor: isEnabled(item.category)
                      ? item.color
                      : undefined,
                  }}
                  value={isEnabled(item.category)}
                  aria-disabled="false"
                  aria-label="Include in total sum"
                  onChange={(value) => toggleCategory(item.category, value)}
                />
              }
              suffix={
                <Button
                  size="sm"
                  theme={categoryFilter === item.category ? 'green' : 'white'}
                  iconStart={<FunnelIcon />}
                  role="checkbox"
                  aria-disabled="false"
                  aria-checked={
                    categoryFilter === item.category ? 'true' : 'false'
                  }
                  aria-label="Filter operations by category"
                  onClick={() => toggleCategoryFilter(item.category)}
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
              tabIndex={0}
              aria-label={`${item.category}: ${formatAmount(item.amount)} ${
                currency.name ?? currency.symbol
              }`}
            />
          ))}
      </div>
    </div>
  )
}
