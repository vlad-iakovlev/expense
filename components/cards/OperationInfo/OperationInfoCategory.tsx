import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useCategoriesContext } from '../../contexts/Categories'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'
import { CardSkeleton } from '../../ui-kit/Card/CardSkeleton'

export const OperationInfoCategory: FC = () => {
  const { setLoading } = useLoadingContext()
  const { categoriesResponse, mutateCategories } = useCategoriesContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (category: string) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        await updateOperation({
          operationId: operationResponse.operation.id,
          category,
        })

        await Promise.all([mutateCategories(), mutateOperation()])
      } finally {
        setLoading(false)
      }
    },
    [mutateCategories, mutateOperation, operationResponse, setLoading]
  )

  if (!categoriesResponse || !operationResponse) {
    return <CardSkeleton />
  }

  return (
    <Card.Input
      name="Category"
      suggestions={categoriesResponse.categories}
      value={operationResponse.operation.category}
      onChange={handleChange}
    />
  )
}
