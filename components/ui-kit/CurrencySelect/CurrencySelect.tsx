import { FC, useCallback, useMemo } from 'react'
import { useCurrencies } from '../../../stores/RootStore/hooks/useCurrencies.ts'
import { ClientCurrency } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'
import { CurrencyBadge } from '../CurrencyBadge/CurrencyBadge.tsx'

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
    return currencies.map((currency) => ({
      id: currency.id,
      label: currency.name ?? '',
      suffix: <CurrencyBadge currency={currency} />,
    }))
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
      popupFullWidth
      label={label}
      options={options}
      value={valueForSelect}
      onChange={handleChange}
    />
  )
}
