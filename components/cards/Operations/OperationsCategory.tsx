import { FC, useCallback, useMemo } from 'react'
import { useCategoriesContext } from '../../contexts/Categories'
import { useOperationsContext } from '../../contexts/Operations'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationsCategory: FC = () => {
  const { categories } = useCategoriesContext()
  const { category, setCategory } = useOperationsContext()

  const options = useMemo<CardSelectOption[]>(() => {
    return [
      {
        id: '',
        name: 'Any',
      },
      ...categories.map((category) => ({
        id: category,
        name: category,
      })),
    ]
  }, [categories])

  const value = useMemo(() => {
    return options.find((option) => category === option.id) || options[0]
  }, [category, options])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setCategory(option.id)
    },
    [setCategory]
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
