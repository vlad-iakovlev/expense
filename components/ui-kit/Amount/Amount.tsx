import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { ClientCurrency } from '../../../types/client.ts'
import { formatAmount } from '../../../utils/formatAmount.ts'

export interface AmountProps {
  className?: string
  amount: number
  currency?: ClientCurrency
  type?: 'income' | 'expense'
  showSign?: 'non-zero' | 'negative' | 'never'
}

export const Amount = ({
  className,
  amount,
  currency,
  type = amount >= 0 ? 'income' : 'expense',
  showSign = 'never',
}: AmountProps) => {
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
      className={twMerge(
        type === 'income' && 'text-green-700',
        type === 'expense' && 'text-red-700',
        className
      )}
    >
      {sign}
      {formatAmount(amount)}
      {currency && <span className="opacity-60"> {currency.symbol}</span>}
    </div>
  )
}
