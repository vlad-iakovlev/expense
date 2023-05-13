import { clsx } from 'clsx'
import { FC } from 'react'
import { ClientCurrency } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'

export interface AmountProps {
  className?: string
  amount: number
  currency?: ClientCurrency
  type?: 'income' | 'expense' | 'none'
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
      {formatAmount(amount)}
      {currency && (
        <span className="ml-[0.3em] text-[0.75em]">{currency.symbol}</span>
      )}
    </div>
  )
}
