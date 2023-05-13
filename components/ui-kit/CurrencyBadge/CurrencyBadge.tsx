import { FC } from 'react'
import { ClientCurrency } from '../../../types/client.ts'

export interface CurrencyBadgeProps {
  currency: ClientCurrency
}

export const CurrencyBadge: FC<CurrencyBadgeProps> = ({ currency }) => {
  return (
    <div className="flex-none flex items-center justify-center w-14 px-2 py-1 text-sm text-zinc-700 bg-zinc-200 rounded-md">
      {currency.symbol}
    </div>
  )
}
