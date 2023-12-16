import { ClientCurrency } from '../../../types/client.js'

export interface CurrencyBadgeProps {
  currency: ClientCurrency
}

export const CurrencyBadge = ({ currency }: CurrencyBadgeProps) => {
  return (
    <div
      className="flex w-14 flex-none items-center justify-center rounded-md bg-zinc-200 px-2 py-1 text-sm text-zinc-700"
      aria-hidden="true"
    >
      {currency.symbol}
    </div>
  )
}
