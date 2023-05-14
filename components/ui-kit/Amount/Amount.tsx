import { clsx } from 'clsx'
import { FC, useMemo } from 'react'
import { ClientCurrency } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'

export interface AmountProps {
  className?: string
  amount: number
  currency?: ClientCurrency
  type?: 'income' | 'expense'
  showSign?: 'non-zero' | 'negative' | 'never'
}

export const Amount: FC<AmountProps> = ({
  className,
  amount,
  currency,
  type = amount >= 0 ? 'income' : 'expense',
  showSign = 'never',
}) => {
  const sign = useMemo(() => {
    switch (showSign) {
      case 'non-zero':
        if (!amount) return ''
        return type === 'income' ? '+' : '-'

      case 'negative':
        if (!amount) return ''
        return type === 'income' ? '' : '-'

      case 'never':
        return ''
    }
  }, [amount, showSign, type])

  return (
    <div
      className={clsx(className, {
        'text-green-700': type === 'income',
        'text-red-700': type === 'expense',
      })}
    >
      {sign}
      {formatAmount(amount)}
      {currency && <span className="opacity-60"> {currency.symbol}</span>}
    </div>
  )
}
