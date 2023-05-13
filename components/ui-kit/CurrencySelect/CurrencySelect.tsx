import { FC, useCallback, useMemo } from 'react'
import { useCurrencies } from '../../../stores/RootStore/hooks/useCurrencies.ts'
import { ClientCurrency } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  label: string
  value: ClientCurrency
  onChange: (currencyId: string) => void
}

export const CurrencySelect: FC<Props> = ({ label, value, onChange }) => {
  const { currencies } = useCurrencies()

  const options = useMemo(() => {
    return currencies.map((currency) => ({
      id: currency.id,
      name: (
        <div className="flex gap-2">
          {!!currency.name && <div className="truncate">{currency.name}</div>}
          <div className="flex-none w-10 ml-auto text-right font-medium">
            {currency.symbol}
          </div>
        </div>
      ),
    }))
  }, [currencies])

  const valueForSelect = useMemo(
    () => ({
      id: value.id,
      name: value.symbol,
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
