import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useCategoriesContext } from '../../contexts/Categories'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoCategory: FC = () => {
  const { setLoading } = useLoadingContext()
  const { categories, mutateCategories } = useCategoriesContext()
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (category: string) => {
      try {
        setLoading(true)

        await updateOperation({
          operationId: operation.id,
          category,
        })

        await mutateCategories()
        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateCategories, mutateOperation, operation.id, setLoading]
  )

  return (
    <Card.Input
      name="Category"
      suggestions={categories}
      value={operation.category}
      onChange={handleChange}
    />
  )
}
