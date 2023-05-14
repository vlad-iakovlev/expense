import { FC, useCallback, useEffect, useMemo } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import {
  Card,
  CardSelectItem,
  CardSelectOption,
} from '../../ui-kit/Card/Card.tsx'
import { CountBadge } from '../../ui-kit/CountBadge/CountBadge.tsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
  category: string
  setCategory: (category: string) => void
}

export const CategoryFilter: FC<Props> = ({
  groupId,
  walletId,
  category,
  setCategory,
}) => {
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    const totalOperations = categories.reduce(
      (acc, category) => acc + category.operationsCount,
      0
    )

    return [
      {
        id: '',
        label: 'Show all',
        suffix: <CountBadge count={totalOperations} />,
      },
      {
        type: 'divider',
        id: 'divider',
      },
      ...categories.map((category) => ({
        id: category.name,
        label: category.name,
        suffix: <CountBadge count={category.operationsCount} />,
      })),
    ]
  }, [categories])

  const value = useMemo(() => {
    return {
      id: category,
      label: category || 'Show all',
    }
  }, [category])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setCategory(option.id)
    },
    [setCategory]
  )

  useEffect(() => {
    if (categories.length < 2) setCategory('')
  }, [categories.length, setCategory])

  if (categories.length < 2) {
    return null
  }

  return (
    <>
      <Card.Divider />
      <Card.Select
        label="Category"
        options={options}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}
