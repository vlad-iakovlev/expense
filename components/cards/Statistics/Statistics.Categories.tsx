import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '@/types/client.js'
import { Category } from './Statistics.Category.jsx'

interface Props {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Categories = ({ currency, items, type }: Props) => (
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
