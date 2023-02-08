import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (name: string) => {
      try {
        setLoading(true)

        await updateOperation({
          operationId: operation.id,
          name,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operation.id, setLoading]
  )

  return (
    <Card.Input name="Name" value={operation.name} onChange={handleChange} />
  )
}
