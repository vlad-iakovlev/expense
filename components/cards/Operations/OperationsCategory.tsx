import { FC, useCallback, useMemo } from 'react'
import { useCategoriesContext } from '../../contexts/Categories'
import { useOperationsContext } from '../../contexts/Operations'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationsCategory: FC = () => {
  const { categoriesResponse } = useCategoriesContext()
  const { operationsPayload } = useOperationsContext()

  const options = useMemo<CardSelectOption[]>(() => {
    return [
      {
        id: '',
        name: 'Any',
      },
      ...(categoriesResponse?.categories.map((category) => ({
        id: category,
        name: category,
      })) || []),
    ]
  }, [categoriesResponse])

  const value = useMemo(() => {
    return {
      id: operationsPayload.category,
      name: operationsPayload.category || 'Any',
    }
  }, [operationsPayload.category])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      operationsPayload.setCategory(option.id)
    },
    [operationsPayload]
  )

  return (
    <Card.Select
      name="Category"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
