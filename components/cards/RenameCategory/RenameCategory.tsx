import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
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
  const [newName, setNewName] = useState('')

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
    setNewName(option.id)
  }, [])

  const handleApplyClick = useCallback(() => {
    if (category !== newName) {
      renameCategory(category, newName)
    }

    setCategory('')
    setNewName('')
  }, [category, newName, renameCategory])

  const handleCancelClick = useCallback(() => {
    setCategory('')
    setNewName('')
  }, [])

  if (!categories.length) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Rename category" />
      <Card.Divider />

      <Card.Select
        label="Category"
        options={categoriesOptions}
        value={categoryValue}
        onChange={handleSelectCategory}
      />

      {category ? (
        <>
          <Card.Input label="New name" value={newName} onChange={setNewName} />
          <Card.Divider />
          <div className="flex">
            <Card.Button
              className="flex-1 min-w-0"
              prefix={<CheckIcon className="w-6 h-6" />}
              label="Apply"
              onClick={handleApplyClick}
            />
            <Card.Button
              className="flex-1 min-w-0"
              prefix={<XMarkIcon className="w-6 h-6" />}
              label="Cancel"
              onClick={handleCancelClick}
            />
          </div>
        </>
      ) : null}
    </Card>
  )
}
