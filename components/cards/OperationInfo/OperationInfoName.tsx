import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const OperationInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (name: string) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        await updateOperation({
          operationId: operationResponse.operation.id,
          name,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Input
      name="Name"
      value={operationResponse.operation.name}
      onChange={handleChange}
    />
  )
}
