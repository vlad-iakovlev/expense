import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '../../../types/client.ts'
import { Category } from './Statistics.Category.tsx'

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Categories = ({ currency, items, type }: Props) => {
  return (
    <div role="listitem">
      <div role="list" aria-label="Categories">
        {items
          .filter((item) => item.amount)
          .map((item) => (
            <Category
              key={item.category}
              category={item.category}
              color={item.color}
              amount={item.amount}
              currency={currency}
              type={type}
            />
          ))}
      </div>
    </div>
  )
}
