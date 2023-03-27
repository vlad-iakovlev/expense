import { FC, Fragment } from 'react'
import { useOperationsContext } from '../../contexts/Operations'
import { Card } from '../../ui-kit/Card'
import { OperationsCategory } from './OperationsCategory'
import { OperationsCreate } from './OperationsCreate'
import { OperationsExpenseItem } from './OperationsExpenseItem'
import { OperationsIncomeItem } from './OperationsIncomeItem'
import { OperationsTransferItem } from './OperationsTransferItem'

interface Props {
  className?: string
}

export const OperationsCard: FC<Props> = ({ className }) => {
  const { operationsResponse, operationsPayload } = useOperationsContext()

  const hasCategoriesFilter =
    !!operationsPayload.category ||
    !operationsResponse ||
    !!operationsResponse?.operations.length

  const hasPagination =
    !!operationsResponse?.hasPrevOperations ||
    !!operationsResponse?.hasNextOperations

  return (
    <Card
      className={className}
      title="Operations"
      action={operationsPayload.walletId && <OperationsCreate />}
    >
      {hasCategoriesFilter && <OperationsCategory />}

      {!!operationsResponse?.operations.length && (
        <>
          <Card.Divider />
          {operationsResponse.operations.map((operation) => (
            <Fragment key={operation.id}>
              {operation.incomeWallet && operation.expenseWallet && (
                <OperationsTransferItem operation={operation} />
              )}
              {!!operation.incomeWallet && !operation.expenseWallet && (
                <OperationsIncomeItem operation={operation} />
              )}
              {!operation.incomeWallet && operation.expenseWallet && (
                <OperationsExpenseItem operation={operation} />
              )}
            </Fragment>
          ))}
        </>
      )}

      {hasPagination && (
        <>
          <Card.Divider />
          <Card.Pagination
            hasPrev={operationsResponse.hasPrevOperations}
            hasNext={operationsResponse.hasNextOperations}
            onPrevClick={operationsPayload.getPrevOperations}
            onNextClick={operationsPayload.getNextOperations}
          />
        </>
      )}

      {!operationsResponse && (
        <>
          <Card.Divider />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Skeleton type="operation" />
          <Card.Divider />
          <Card.Skeleton />
        </>
      )}
    </Card>
  )
}
