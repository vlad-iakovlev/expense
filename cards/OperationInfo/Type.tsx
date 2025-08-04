import { Card, CardSelectOption } from '@/components/common/Card/index'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { ClientOperationType } from '@/types/client'

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

type TypeProps = {
  operationId: string
}

export const Type = ({ operationId }: TypeProps) => {
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
