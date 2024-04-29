import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { Card, CardSelectOption } from '@/components/common/Card/index.jsx'
import { useCategoryFilter } from '@/contexts/CategoryFilter.jsx'
import { useCategories } from '@/contexts/RootStore/hooks/useCategories.js'

interface RenameCategoryCardProps {
  className?: string
  groupId: string
}

export const RenameCategoryCard = ({
  className,
  groupId,
}: RenameCategoryCardProps) => {
  const { resetCategoryFilter } = useCategoryFilter()
  const { categories, renameCategory } = useCategories({ groupId })
  const [oldName, setOldName] = React.useState('')
  const [newName, setNewName] = React.useState('')

  const categoriesOptions = React.useMemo<CardSelectOption[]>(
    () =>
      categories.map((category) => ({
        id: category,
        label: category,
      })),
    [categories],
  )

  const categoryValue = React.useMemo(
    () => ({
      id: oldName,
      label: oldName || 'Select',
    }),
    [oldName],
  )

  const handleSelectCategory = React.useCallback((category: string) => {
    setOldName(category)
    setNewName(category)
  }, [])

  const handleApplyClick = React.useCallback(() => {
    if (oldName !== newName) {
      resetCategoryFilter()
      renameCategory(oldName, newName)
    }

    setOldName('')
    setNewName('')
  }, [oldName, newName, renameCategory, resetCategoryFilter])

  const handleCancelClick = React.useCallback(() => {
    setOldName('')
    setNewName('')
  }, [])

  if (!categories.length) {
    return null
  }

  return (
    <Card className={className} aria-label="Rename category">
      <Card.Title
        title="Rename category"
        actions={
          oldName && (
            <>
              <Button
                rounded
                size="sm"
                theme="red"
                iconStart={<XMarkIcon />}
                onClick={handleCancelClick}
              />
              <Button
                rounded
                size="sm"
                theme="green"
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

      {!!oldName && (
        <Card.Input label="New name" value={newName} onChange={setNewName} />
      )}
    </Card>
  )
}
