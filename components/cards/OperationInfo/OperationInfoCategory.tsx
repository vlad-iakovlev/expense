import assert from 'node:assert'
import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { useCategoriesContext } from '../../contexts/Categories.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CardSkeleton } from '../../ui-kit/Card/CardSkeleton.tsx'

export const OperationInfoCategory: FC = () => {
  const { setLoading } = useLoadingContext()
  const { categoriesResponse, mutateCategories } = useCategoriesContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (category: string) => {
      assert(operationResponse, 'operationResponse is not defined')

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
