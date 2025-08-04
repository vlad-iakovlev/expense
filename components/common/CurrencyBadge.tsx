import { PopulatedClientCurrency } from '@/types/client'

export type CurrencyBadgeProps = {
  currency: PopulatedClientCurrency
}

export const CurrencyBadge = ({ currency }: CurrencyBadgeProps) => (
  <div
    className="flex w-14 flex-none items-center justify-center rounded-md bg-quaternary-background px-2 py-1 text-sm text-secondary-foreground"
    aria-hidden="true"
  >
    {currency.symbol}
  </div>
)
