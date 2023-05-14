import { FC, useCallback, useMemo } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import {
  Card,
  CardSelectItem,
  CardSelectOption,
} from '../../ui-kit/Card/Card.tsx'

interface Props {
  category: string
  setCategory: (category: string) => void
}

export const CategoryFilter: FC<Props> = ({ category, setCategory }) => {
  const { categories } = useCategories()

  const options = useMemo<CardSelectItem[]>(() => {
    return [
      {
        id: '',
        label: 'All',
      },
      {
        type: 'divider',
        id: 'divider',
      },
      ...categories.map((category) => ({
        id: category,
        label: category,
      })),
    ]
  }, [categories])

  const value = useMemo(() => {
    return {
      id: category,
      label: category || 'All',
    }
  }, [category])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setCategory(option.id)
    },
    [setCategory]
  )

  return (
    <Card.Select
      label="Category"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
