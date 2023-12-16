import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useCallback, useMemo, useState } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.jsx'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.js'
import { Button } from '../../ui-kit/Button/Button.jsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.jsx'

interface Props {
  className?: string
  groupId: string
}

export const RenameCategoryCard = ({ className, groupId }: Props) => {
  const { resetCategoryFilter } = useCategoryFilter()
  const { categories, renameCategory } = useCategories({ groupId })
  const [oldName, setOldName] = useState('')
  const [newName, setNewName] = useState('')

  const categoriesOptions = useMemo<CardSelectOption[]>(() => {
    return categories.map((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const categoryValue = useMemo(
    () => ({
      id: oldName,
      label: oldName || 'Select',
    }),
    [oldName],
  )

  const handleSelectCategory = useCallback((category: string) => {
    setOldName(category)
    setNewName(category)
  }, [])

  const handleApplyClick = useCallback(() => {
    if (oldName !== newName) {
      resetCategoryFilter()
      renameCategory(oldName, newName)
    }

    setOldName('')
    setNewName('')
  }, [oldName, newName, renameCategory, resetCategoryFilter])

  const handleCancelClick = useCallback(() => {
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
