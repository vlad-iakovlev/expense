import { XMarkIcon } from '@heroicons/react/20/solid'
import { useCallback, useEffect, useMemo } from 'react'
import { useCategoryFilter } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'
import { useCategories } from '../../../contexts/RootStore/hooks/useCategories.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card, CardSelectItem } from '../../ui-kit/Card/Card.tsx'

interface Props {
  groupId: string | undefined
  walletId: string | undefined
}

export const CategoryFilter = ({ groupId, walletId }: Props) => {
  const { categoryFilter, setCategoryFilter, resetCategoryFilter } =
    useCategoryFilter()
  const { categories } = useCategories({ groupId, walletId })

  const options = useMemo<CardSelectItem[]>(() => {
    return categories.map<CardSelectItem>((category) => ({
      id: category,
      label: category,
    }))
  }, [categories])

  const valueForSelect = useMemo(() => {
    return {
      id: categoryFilter,
      label: categoryFilter || 'Show all',
    }
  }, [categoryFilter])

  const handleResetClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      resetCategoryFilter()
    },
    [resetCategoryFilter],
  )

  const handleResetKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation()
    }
  }, [])

  useEffect(() => {
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
              onKeyDown={handleResetKeyDown}
            />
          )
        }
        aria-label={`Category filter: ${categoryFilter || 'Show all'}`}
      />
    </>
  )
}
