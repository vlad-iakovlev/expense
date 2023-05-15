import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { FC, useCallback, useMemo, useState } from 'react'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
  groupId: string
}

export const RenameCategoryCard: FC<Props> = ({ className, groupId }) => {
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
    [oldName]
  )

  const handleSelectCategory = useCallback((category: string) => {
    setOldName(category)
    setNewName(category)
  }, [])

  const handleApplyClick = useCallback(() => {
    if (oldName !== newName) {
      renameCategory(oldName, newName)
    }

    setOldName('')
    setNewName('')
  }, [oldName, newName, renameCategory])

  const handleCancelClick = useCallback(() => {
    setOldName('')
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
          oldName && (
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

      {!!oldName && (
        <Card.Input label="New name" value={newName} onChange={setNewName} />
      )}
    </Card>
  )
}
