import assert from 'assert'
import React from 'react'
import { useCurrencies } from '@/contexts/RootStore/hooks/useCurrencies'
import { PopulatedClientCurrency } from '@/types/client'
import { Card, CardSelectItem } from './Card/index'
import { CurrencyBadge } from './CurrencyBadge'

const PRIORITIZED_CURRENCIES = ['USD', 'EUR']

export interface CurrencySelectProps {
  label: string
  value: PopulatedClientCurrency
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
          label: currency.name,
          suffix: <CurrencyBadge currency={currency} />,
        }
      }),
      { type: 'divider', id: 'divider' },
      ...currencies
        .filter((currency) => !PRIORITIZED_CURRENCIES.includes(currency.symbol))
        .map((currency) => ({
          id: currency.id,
          label: currency.name,
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
      aria-label={`${label}: ${value.name}`}
      onChange={onChange}
    />
  )
}
