import clsx from 'clsx'
import { FC } from 'react'
import { ClientCurrency } from '../../../api/types/currencies'
import { formatAmount } from '../../../utils/formatAmount'

export interface AmountProps {
  className?: string
  amount: number
  currency: ClientCurrency
  type?: 'income' | 'expense'
}

export const Amount: FC<AmountProps> = ({
  className,
  amount,
  currency,
  type = amount >= 0 ? 'income' : 'expense',
}) => {
  return (
    <div
      className={clsx(className, {
        'text-green-700': type === 'income',
        'text-red-700': type === 'expense',
      })}
    >
      {formatAmount(amount, currency)}
    </div>
  )
}
