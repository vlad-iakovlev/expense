import assert from 'assert'
import { FC, useCallback, useMemo } from 'react'
import { useCurrencies } from '../../../stores/RootStore/hooks/useCurrencies.ts'
import { ClientCurrency } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'
import { CurrencyBadge } from '../CurrencyBadge/CurrencyBadge.tsx'

const PRIORITIZED_CURRENCIES = ['USD', 'EUR']

export interface CurrencySelectProps {
  label: string
  value: ClientCurrency
  onChange: (currencyId: string) => void
}

export const CurrencySelect: FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
}) => {
  const { currencies } = useCurrencies()

  const options = useMemo(() => {
    return [
      ...PRIORITIZED_CURRENCIES.map((symbol) => {
        const currency = currencies.find((item) => item.symbol === symbol)
        assert(currency, `Currency ${symbol} not found`)

        return {
          id: currency.id,
          label: currency.name ?? '',
          suffix: <CurrencyBadge currency={currency} />,
        }
      }),
      {
        type: 'divider' as const,
        id: 'divider',
      },
      ...currencies
        .filter((currency) => !PRIORITIZED_CURRENCIES.includes(currency.symbol))
        .map((currency) => ({
          id: currency.id,
          label: currency.name ?? '',
          suffix: <CurrencyBadge currency={currency} />,
        })),
    ]
  }, [currencies])

  const valueForSelect = useMemo(
    () => ({
      id: value.id,
      label: value.symbol,
    }),
    [value.id, value.symbol]
  )

  const handleChange = useCallback(
    (option: CardSelectOption) => onChange(option.id),
    [onChange]
  )

  return (
    <Card.Select
      label={label}
      options={options}
      value={valueForSelect}
      onChange={handleChange}
    />
  )
}
