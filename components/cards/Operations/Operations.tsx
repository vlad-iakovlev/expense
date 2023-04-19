import { FC, Fragment } from 'react'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { OperationsCategory } from './OperationsCategory.tsx'
import { OperationsCreate } from './OperationsCreate.tsx'
import { OperationsExpenseItem } from './OperationsExpenseItem.tsx'
import { OperationsIncomeItem } from './OperationsIncomeItem.tsx'
import { OperationsTransferItem } from './OperationsTransferItem.tsx'

interface Props {
  className?: string
}

export const OperationsCard: FC<Props> = ({ className }) => {
  const { operationsResponse, operationsPayload } = useOperationsContext()

  if (
    !operationsPayload.walletId &&
    !operationsPayload.category &&
    operationsResponse?.operations.length === 0
  ) {
    return null
  }

  return (
    <Card className={className}>
      <Card.Title
        title="Operations"
        action={operationsPayload.walletId && <OperationsCreate />}
      />
      <Card.Divider />
      <OperationsCategory />
      {operationsResponse?.operations.length !== 0 && <Card.Divider />}

      {operationsResponse?.operations.map((operation) => (
        <Fragment key={operation.id}>
          {operation.incomeWallet && operation.expenseWallet ? (
            <OperationsTransferItem operation={operation} />
          ) : null}
          {operation.incomeWallet && !operation.expenseWallet ? (
            <OperationsIncomeItem operation={operation} />
          ) : null}
          {!operation.incomeWallet && operation.expenseWallet ? (
            <OperationsExpenseItem operation={operation} />
          ) : null}
        </Fragment>
      ))}

      {operationsResponse?.hasPrevOperations ||
      operationsResponse?.hasNextOperations ? (
        <>
          <Card.Divider />

          <Card.Pagination
            hasPrev={operationsResponse.hasPrevOperations}
            hasNext={operationsResponse.hasNextOperations}
            onPrevClick={operationsPayload.getPrevOperations}
            onNextClick={operationsPayload.getNextOperations}
          />
        </>
      ) : null}

      {!operationsResponse && (
        <>
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
