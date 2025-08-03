import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import { Button } from '@/components/common/Button'
import { Card, CardSelectItem } from '@/components/common/Card/index'
import { useCategoryFilter } from '@/contexts/CategoryFilter'
import { useCategories } from '@/contexts/RootStore/hooks/useCategories'

interface CategoryFilterProps {
  groupId: string | undefined
  walletId: string | undefined
}

export const CategoryFilter = ({ groupId, walletId }: CategoryFilterProps) => {
  const { categoryFilter, setCategoryFilter, resetCategoryFilter } =
    useCategoryFilter()
  const { categories } = useCategories({ groupId, walletId })

  const options = React.useMemo<CardSelectItem[]>(
    () =>
      categories.map<CardSelectItem>((category) => ({
        id: category,
        label: category,
      })),
    [categories],
  )

  const valueForSelect = React.useMemo(
    () => ({
      id: categoryFilter,
      label: categoryFilter || 'Show all',
    }),
    [categoryFilter],
  )

  const handleResetClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      resetCategoryFilter()
    },
    [resetCategoryFilter],
  )

  React.useEffect(() => {
    if (categories.length < 2) {
      resetCategoryFilter()
    }
  }, [categories.length, resetCategoryFilter])

  if (categories.length < 2) {
    return null
  }

  return (
    <>
      <Card.Divider />
      <Card.Select
        label="Category"
        options={options}
        value={valueForSelect}
        onChange={setCategoryFilter}
        suffix={
          !!categoryFilter && (
            <Button
              rounded
              size="sm"
              theme="zinc"
              iconStart={<XMarkIcon />}
              aria-label="Reset filter"
              onClick={handleResetClick}
            />
          )
        }
        aria-label={`Category filter: ${categoryFilter || 'Show all'}`}
      />
    </>
  )
}
