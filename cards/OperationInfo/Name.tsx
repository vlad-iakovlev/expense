import { Card } from '@/components/common/Card/index.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface NameProps {
  operationId: string
}

export const Name = ({ operationId }: NameProps) => {
  const { operation, setOperationName } = useOperation({ operationId })

  return (
    <Card.Input
      label="Name"
      value={operation.name}
      onChange={setOperationName}
    />
  )
}
