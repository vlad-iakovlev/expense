import { FC, useCallback, useMemo } from 'react'
import { updateGroup } from '../../../api/client/groups'
import { useCurrenciesContext } from '../../contexts/Currencies'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const GroupInfoDefaultCurrency: FC = () => {
  const { setLoading } = useLoadingContext()
  const { currencies } = useCurrenciesContext()
  const { group, mutateGroup } = useGroupContext()

  const options = useMemo(() => {
    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.name,
    }))
  }, [currencies])

  const value = useMemo(
    () => ({
      id: group.defaultCurrency.id,
      name: group.defaultCurrency.name,
    }),
    [group.defaultCurrency.id, group.defaultCurrency.name]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      try {
        setLoading(true)

        await updateGroup({
          groupId: group.id,
          defaultCurrencyId: option.id,
        })

        await mutateGroup()
      } finally {
        setLoading(false)
      }
    },
    [setLoading, group.id, mutateGroup]
  )

  return (
    <Card.Select
      name="Default currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
