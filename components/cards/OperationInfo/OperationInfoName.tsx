import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoName: FC = () => {
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (name: string) => {
      await updateOperation({
        operationId: operation.id,
        name,
      })

      await mutateOperation()
    },
    [mutateOperation, operation.id]
  )

  return (
    <Card.Input name="Name" value={operation.name} onChange={handleChange} />
  )
}
