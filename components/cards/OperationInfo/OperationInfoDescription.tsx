import { FC, useCallback } from 'react'
import { useSWRConfig } from 'swr'
import { updateOperation } from '../../../api/client/operations'
import { SWR_KEYS } from '../../../constants/swr'
import { useOperationContext } from '../../contexts/Operation'
import { Card } from '../../ui-kit/Card'

export const OperationInfoDescription: FC = () => {
  const { mutate } = useSWRConfig()
  const { query, operation } = useOperationContext()

  const handleChange = useCallback(
    async (description: string) => {
      await updateOperation({
        operationId: operation.id,
        description,
      })

      await mutate(SWR_KEYS.OPERATION(query))
    },
    [mutate, operation.id, query]
  )

  return (
    <Card.Input
      name="Description"
      value={operation.description}
      onChange={handleChange}
    />
  )
}
