import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
import { ClientOperationType } from '../../../types/client.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

const OperationTypeOptionsMap: Record<
  ClientOperationType,
  CardSelectOption<ClientOperationType>
> = {
  [ClientOperationType.INCOME]: {
    id: ClientOperationType.INCOME,
    label: 'Income',
  },
  [ClientOperationType.EXPENSE]: {
    id: ClientOperationType.EXPENSE,
    label: 'Expense',
  },
  [ClientOperationType.TRANSFER]: {
    id: ClientOperationType.TRANSFER,
    label: 'Transfer',
  },
}

const options = Object.values(OperationTypeOptionsMap)

interface Props {
  operationId: string
}

export const Type: React.FC<Props> = ({ operationId }) => {
  const { operation, setOperationType } = useOperation({ operationId })

  return (
    <Card.Select
      label="Type"
      options={options}
      value={OperationTypeOptionsMap[operation.type]}
      onChange={setOperationType}
    />
  )
}
