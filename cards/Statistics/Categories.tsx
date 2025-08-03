import {
  ClientStatisticsItem,
  ClientStatisticsType,
  PopulatedClientCurrency,
} from '@/types/client'
import { Decimal } from '@/utils/Decimal'
import { Category } from './Category'

interface CategoriesProps {
  currency: PopulatedClientCurrency
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
