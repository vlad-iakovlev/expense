import { ClientCurrency } from '../../../types/client.ts'

export interface CurrencyBadgeProps {
  currency: ClientCurrency
}

export const CurrencyBadge = ({ currency }: CurrencyBadgeProps) => {
  return (
    <div
      className="flex-none flex items-center justify-center w-14 px-2 py-1 text-sm text-zinc-700 bg-zinc-200 rounded-md"
      aria-hidden="true"
    >
      {currency.symbol}
    </div>
  )
}
