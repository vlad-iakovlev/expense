import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface Props {
  operationId: string
}

export const Date = ({ operationId }: Props) => {
  const { operation, setOperationDate } = useOperation({ operationId })

  return (
    <Card.DateTime
      label="Date"
      value={operation.date}
      onChange={setOperationDate}
    />
  )
}
