import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { FC, useCallback, useMemo, useState } from 'react'
import { useCategories } from '../../../stores/RootStore/hooks/useCategories.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
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
      <Card.Title
        title="Rename category"
        actions={
          category && (
            <>
              <Button
                rounded
                size="sm"
                theme="error"
                iconStart={<XMarkIcon />}
                onClick={handleCancelClick}
              />
              <Button
                rounded
                size="sm"
                theme="primary"
                iconStart={<CheckIcon />}
                onClick={handleApplyClick}
              />
            </>
          )
        }
      />
      <Card.Divider />

      <Card.Select
        label="Category"
        options={categoriesOptions}
        value={categoryValue}
        onChange={handleSelectCategory}
      />

      {!!category && (
        <Card.Input label="New name" value={newName} onChange={setNewName} />
      )}
    </Card>
  )
}
