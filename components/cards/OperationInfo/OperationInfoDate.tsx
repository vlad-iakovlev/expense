import { FC, useCallback } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoDate: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operation, mutateOperation } = useOperationContext()

  const handleChange = useCallback(
    async (date: Date) => {
      try {
        setLoading(true)

        await updateOperation({
          operationId: operation.id,
          date: date.toISOString(),
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operation.id, setLoading]
  )

  return (
    <Card.DateTime name="Date" value={operation.date} onChange={handleChange} />
  )
}
