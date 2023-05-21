import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { Amount } from '../../ui-kit/Amount/Amount.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { Switch } from './Statistics.Switch.tsx'

const AMOUNT_TYPE = {
  [ClientStatisticsType.INCOMES]: 'income',
  [ClientStatisticsType.EXPENSES]: 'expense',
} as const

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
  isCategoryDisabled: (category: string) => boolean
  setCategoryDisabled: (category: string, disabled: boolean) => void
}

export const Categories: React.FC<Props> = ({
  currency,
  items,
  type,
  isCategoryDisabled,
  setCategoryDisabled,
}) => {
  const { setCategoryFilter } = useCategoryFilter()

  return (
    <>
      {items
        .filter((item) => item.amount)
        .map((item) => (
          <Card.Button
            key={item.category}
            prefix={
              <div className="flex items-center gap-3">
                <Switch
                  value={!isCategoryDisabled(item.category)}
                  onChange={(value) =>
                    setCategoryDisabled(item.category, !value)
                  }
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
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
