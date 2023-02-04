import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useCategoriesContext } from '../../contexts/Categories'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoCategory: FC = () => {
  const { categories, mutateCategories } = useCategoriesContext()
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (category: string) => {
      await updateOperation({
        operationId: operation.id,
        category,
      })

      await mutateCategories()
      await mutateOperation()
    },
    [mutateCategories, mutateOperation, operation.id]
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
