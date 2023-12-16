import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.js'
import { Card } from '../../ui-kit/Card/Card.jsx'

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
