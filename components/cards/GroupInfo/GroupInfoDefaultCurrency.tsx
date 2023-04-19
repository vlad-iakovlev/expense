import { FC, useCallback, useMemo } from 'react'
import { updateGroup } from '../../../api/client/groups.ts'
import { useCurrenciesContext } from '../../contexts/Currencies.tsx'
import { useGroupContext } from '../../contexts/Group.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

export const GroupInfoDefaultCurrency: FC = () => {
  const { setLoading } = useLoadingContext()
  const { currenciesResponse } = useCurrenciesContext()
  const { groupResponse, mutateGroup } = useGroupContext()
  const { mutateStatisticsByCategory } = useStatisticsByCategoryContext()

  const options = useMemo(() => {
    return (
      currenciesResponse?.currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
      })) ?? []
    )
  }, [currenciesResponse])

  const value = useMemo(
    () => ({
      id: groupResponse?.group.defaultCurrency.id ?? '',
      name: groupResponse?.group.defaultCurrency.name ?? '',
    }),
    [
      groupResponse?.group.defaultCurrency.id,
      groupResponse?.group.defaultCurrency.name,
    ]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (!groupResponse) return

      try {
        setLoading(true)

        await updateGroup({
          groupId: groupResponse.group.id,
          defaultCurrencyId: option.id,
        })

        await Promise.all([mutateGroup(), mutateStatisticsByCategory()])
      } finally {
        setLoading(false)
      }
    },
    [groupResponse, setLoading, mutateGroup, mutateStatisticsByCategory]
  )

  if (!currenciesResponse || !groupResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Select
      name="Default currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
