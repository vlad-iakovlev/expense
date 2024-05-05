import { PopulatedClientCurrency } from '@/types/client.js'

export interface CurrencyBadgeProps {
  currency: PopulatedClientCurrency
}

export const CurrencyBadge = ({ currency }: CurrencyBadgeProps) => (
  <div
    className="text-secondary bg-quaternary flex w-14 flex-none items-center justify-center rounded-md px-2 py-1 text-sm"
    aria-hidden="true"
  >
    {currency.symbol}
  </div>
)
