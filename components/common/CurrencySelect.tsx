import assert from 'assert'
import React from 'react'
import { useCurrencies } from '@/contexts/RootStore/hooks/useCurrencies.js'
import { ClientCurrency } from '@/types/client.js'
import { Card, CardSelectItem } from './Card/index.jsx'
import { CurrencyBadge } from './CurrencyBadge.jsx'

const PRIORITIZED_CURRENCIES = ['USD', 'EUR']

export interface CurrencySelectProps {
  label: string
  value: ClientCurrency
  onChange: (currencyId: string) => void
}

export const CurrencySelect = ({
  label,
  value,
  onChange,
}: CurrencySelectProps) => {
  const { currencies } = useCurrencies()

  const options = React.useMemo<CardSelectItem[]>(
    () => [
      ...PRIORITIZED_CURRENCIES.map((symbol) => {
        const currency = currencies.find((item) => item.symbol === symbol)
        assert(currency, `Currency ${symbol} not found`)

        return {
          id: currency.id,
          label: currency.name ?? '',
          suffix: <CurrencyBadge currency={currency} />,
        }
      }),
      { type: 'divider', id: 'divider' },
      ...currencies
        .filter((currency) => !PRIORITIZED_CURRENCIES.includes(currency.symbol))
        .map((currency) => ({
          id: currency.id,
          label: currency.name ?? '',
          suffix: <CurrencyBadge currency={currency} />,
        })),
    ],
    [currencies],
  )

  const valueForSelect = React.useMemo(
    () => ({
      id: value.id,
      label: value.symbol,
    }),
    [value.id, value.symbol],
  )

  return (
    <Card.Select
      label={label}
      options={options}
      value={valueForSelect}
      aria-label={`${label}: ${value.name ?? value.symbol}`}
      onChange={onChange}
    />
  )
}
