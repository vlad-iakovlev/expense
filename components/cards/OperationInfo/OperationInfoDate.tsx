import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { CardSkeleton } from '../../ui-kit/Card/CardSkeleton.tsx'

export const OperationInfoDate: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (date: Date) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        await updateOperation({
          operationId: operationResponse.operation.id,
          date: date.toISOString(),
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse) {
    return <CardSkeleton />
  }

  return (
    <Card.DateTime
      name="Date"
      value={operationResponse.operation.date}
      onChange={handleChange}
    />
  )
}
