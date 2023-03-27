import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { renameCategory } from '../../../api/client/categories'
import { useCategoriesContext } from '../../contexts/Categories'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationsContext } from '../../contexts/Operations'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory'
import { Card, CardSelectOption } from '../../ui-kit/Card'

interface Props {
  className?: string
}

export const RenameCategoryCard: FC<Props> = ({ className }) => {
  const { setLoading } = useLoadingContext()
  const { categoriesResponse, categoriesPayload, mutateCategories } =
    useCategoriesContext()
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
      name: category || 'Select',
    }),
    [category]
  )

  const handleSelectCategory = useCallback((option: CardSelectOption) => {
    setCategory(option.id)
  }, [])

  const handleNameChange = useCallback(
    async (name: string) => {
      try {
        setLoading(true)

        await renameCategory({
          groupId: categoriesPayload.groupId,
          walletId: categoriesPayload.walletId,
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
      categoriesPayload,
      category,
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
    <Card className={className} title="Rename category">
      {!!categoriesResponse?.categories.length && (
        <Card.Select
          name="Category"
          options={categoriesOptions}
          value={categoryValue}
          onChange={handleSelectCategory}
        />
      )}

      {!categoriesResponse && <Card.Skeleton />}

      {!!category && (
        <Card.Input
          name="New name"
          value={category}
          onChange={handleNameChange}
        />
      )}
    </Card>
  )
}
