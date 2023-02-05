import clsx from 'clsx'
import { FC } from 'react'
import { ClientCurrency } from '../../../api/types/currencies'
import { formatAmount } from '../../../utils/formatAmount'

export interface AmountProps {
  className?: string
  amount: number
  currency: ClientCurrency
}

export const Amount: FC<AmountProps> = ({ className, amount, currency }) => {
  return (
    <div
      className={clsx(className, {
        'text-green-700': amount >= 0,
        'text-red-700': amount < 0,
      })}
    >
      {formatAmount(amount, currency)}
    </div>
  )
}
