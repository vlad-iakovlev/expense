import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface Props {
  operationId: string
}

export const Name = ({ operationId }: Props) => {
  const { operation, setOperationName } = useOperation({ operationId })

  return (
    <Card.Input
      label="Name"
      value={operation.name}
      onChange={setOperationName}
    />
  )
}
