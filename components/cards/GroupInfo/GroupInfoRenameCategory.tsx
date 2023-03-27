import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { renameCategory } from '../../../api/client/categories'
import { useCategoriesContext } from '../../contexts/Categories'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationsContext } from '../../contexts/Operations'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const GroupInfoRenameCategory: FC = () => {
  const { setLoading } = useLoadingContext()
  const { categoriesResponse, mutateCategories } = useCategoriesContext()
  const { groupResponse } = useGroupContext()
  const { mutateOperations } = useOperationsContext()
  const { mutateStatisticsByCategory } = useStatisticsByCategoryContext()
  const [category, setCategory] = useState('')

  const categoriesOptions = useMemo<CardSelectOption[]>(() => {
    return (
      categoriesResponse?.categories.map((category) => ({
        id: category,
        name: category,
      })) || []
    )
  }, [categoriesResponse])

  const categoryValue = useMemo(
    () => ({
      id: category,
      name: category,
    }),
    [category]
  )

  const handleSelectCategory = useCallback((option: CardSelectOption) => {
    setCategory(option.id)
  }, [])

  const handleNameChange = useCallback(
    async (name: string) => {
      if (!groupResponse) {
        return
      }

      try {
        setLoading(true)

        await renameCategory({
          groupId: groupResponse.group.id,
          category,
          name,
        })

        setCategory('')

        await Promise.all([
          mutateCategories(),
          mutateOperations(),
          mutateStatisticsByCategory(),
        ])
      } finally {
        setLoading(false)
      }
    },
    [
      category,
      groupResponse,
      mutateCategories,
      mutateOperations,
      mutateStatisticsByCategory,
      setLoading,
    ]
  )

  useEffect(() => {
    setCategory('')
  }, [categoriesResponse])

  return (
    <>
      {groupResponse && categoriesOptions.length ? (
        <Card.Select
          name="Rename category"
          options={categoriesOptions}
          value={categoryValue}
          onChange={handleSelectCategory}
        />
      ) : (
        <Card.Skeleton />
      )}

      {category ? (
        <Card.Input
          name="New name"
          value={category}
          onChange={handleNameChange}
        />
      ) : null}
    </>
  )
}
