import { Card } from '@/components/common/Card/index'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type NameProps = {
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
