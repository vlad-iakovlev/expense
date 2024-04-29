import { Card, CardSelectOption } from '@/components/ui-kit/Card/Card.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { ClientOperationType } from '@/types/client.js'

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

export const Type = ({ operationId }: Props) => {
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
