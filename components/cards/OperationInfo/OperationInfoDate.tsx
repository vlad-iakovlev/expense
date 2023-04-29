import { FC } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const OperationInfoDate: FC<Props> = ({ operationId }) => {
  const { operation, setOperationDate } = useOperation({ operationId })

  return (
    <Card.DateTime
      name="Date"
      value={operation.date}
      onChange={setOperationDate}
    />
  )
}
