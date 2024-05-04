import React from 'react'
import { twMerge } from 'tailwind-merge'
import { ClientCurrency } from '@/types/client.js'
import { Decimal } from '@/utils/Decimal.js'

export interface AmountProps {
  className?: string
  amount: Decimal
  currency: ClientCurrency
  type?: 'income' | 'expense'
  showSign?: 'non-zero' | 'negative' | 'never'
  hideCurrency?: boolean
}

export const Amount = ({
  className,
  amount,
  currency,
  type = amount.gte(Decimal.ZERO) ? 'income' : 'expense',
  showSign = 'never',
  hideCurrency,
}: AmountProps) => {
  const sign = React.useMemo(() => {
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
        type === 'income' && 'text-green-700 dark:text-green-500',
        type === 'expense' && 'text-red-700 dark:text-red-500',
        className,
      )}
    >
      <span>{sign}</span>
      <span>{amount.abs().toFixed(2)}</span>
      <span
        className="opacity-75"
        aria-label={currency.name ?? currency.symbol}
      >
        {hideCurrency ? '' : ` ${currency.symbol}`}
      </span>
    </div>
  )
}
