import { FC, useCallback, useMemo } from 'react'
import { useCurrencies } from '../../../stores/RootStore/hooks/useCurrencies.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string
}

export const DefaultCurrency: FC<Props> = ({ groupId }) => {
  const { currencies } = useCurrencies()
  const { group, setGroupDefaultCurrency } = useGroup({ groupId })

  const options = useMemo(() => {
    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.symbol,
    }))
  }, [currencies])

  const value = useMemo(
    () => ({
      id: group.defaultCurrency.id,
      name: group.defaultCurrency.symbol,
    }),
    [group.defaultCurrency.id, group.defaultCurrency.symbol]
  )

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setGroupDefaultCurrency(option.id)
    },
    [setGroupDefaultCurrency]
  )

  return (
    <Card.Select
      label="Default currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
