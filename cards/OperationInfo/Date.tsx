import { Card } from '@/components/common/Card/index.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface DateProps {
  operationId: string
}

export const Date = ({ operationId }: DateProps) => {
  const { operation, setOperationDate } = useOperation({ operationId })

  return (
    <Card.DateTime
      label="Date"
      value={operation.date}
      onChange={setOperationDate}
    />
  )
}
