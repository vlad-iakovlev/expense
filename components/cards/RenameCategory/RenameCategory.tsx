import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { renameCategory } from '../../../api/client/categories.ts'
import { useCategoriesContext } from '../../contexts/Categories.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { useStatisticsByCategoryContext } from '../../contexts/StatisticsByCategory.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

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
      })) ?? []
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

  if (categoriesResponse?.categories.length === 0) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title title="Rename category" />
      <Card.Divider />

      {categoriesResponse ? (
        <Card.Select
          name="Category"
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
    </Card>
  )
}
