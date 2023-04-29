import { FC, useCallback, useMemo, useState } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
  groupId: string
}

export const RenameCategoryCard: FC<Props> = ({ className, groupId }) => {
  const { categories, renameCategory } = useCategories({ groupId })
  const [category, setCategory] = useState('')

  const categoriesOptions = useMemo<CardSelectOption[]>(() => {
    return categories.map((category) => ({
      id: category,
      name: category,
    }))
  }, [categories])

  const categoryValue = useMemo(
    () => ({
      id: category,
      name: category || 'Select',
    }),
    [category]
  )

  const handleSelectCategory = useCallback((option: CardSelectOption) => {
    setCategory(option.id)
  }, [])

  const handleNameChange = useCallback(
    (name: string) => {
      renameCategory(category, name)
      setCategory('')
    },
    [category, renameCategory]
  )

  if (!categories.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Rename category" />
      <Card.Divider />

      <Card.Select
        name="Category"
        options={categoriesOptions}
        value={categoryValue}
        onChange={handleSelectCategory}
      />

      {category ? (
        <Card.Input
          name="New name"
          value={category}
          onChange={handleNameChange}
        />
      ) : null}
    </Card>
  )
}
