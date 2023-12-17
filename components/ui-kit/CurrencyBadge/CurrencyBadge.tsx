import { ClientCurrency } from '../../../types/client.js'

export interface CurrencyBadgeProps {
  currency: ClientCurrency
}

export const CurrencyBadge = ({ currency }: CurrencyBadgeProps) => {
  return (
    <div
      className="text-secondary bg-quaternary flex w-14 flex-none items-center justify-center rounded-md px-2 py-1 text-sm"
      aria-hidden="true"
    >
      {currency.symbol}
    </div>
  )
}
