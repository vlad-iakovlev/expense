import { FC } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const Date: FC<Props> = ({ operationId }) => {
  const { operation, setOperationDate } = useOperation({ operationId })

  return (
    <Card.DateTime
      label="Date"
      value={operation.date}
      onChange={setOperationDate}
    />
  )
}
