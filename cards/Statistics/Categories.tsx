import {
  ClientCurrency,
  ClientStatisticsItem,
  ClientStatisticsType,
} from '@/types/client.js'
import { Decimal } from '@/utils/Decimal.js'
import { Category } from './Category.jsx'

interface CategoriesProps {
  currency: ClientCurrency
  items: ClientStatisticsItem[]
  type: ClientStatisticsType
}

export const Categories = ({ currency, items, type }: CategoriesProps) => (
  <div role="listitem">
    <div role="list" aria-label="Categories">
      {items
        .filter((item) => item.amount.neq(Decimal.ZERO))
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
