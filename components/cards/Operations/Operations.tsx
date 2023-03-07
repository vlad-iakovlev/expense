import { FC, Fragment } from 'react'
import { useOperationsContext } from '../../contexts/Operations'
import { Card } from '../../ui-kit/Card'
import { OperationsCategory } from './OperationsCategory'
import { OperationsCreate } from './OperationsCreate'
import { OperationsExpenseItem } from './OperationsExpenseItem'
import { OperationsIncomeItem } from './OperationsIncomeItem'
import { OperationsTransferItem } from './OperationsTransferItem'

export const OperationsCard: FC = () => {
  const {
    operations,
    operationsQuery,
    hasPrevOperations,
    hasNextOperations,
    getPrevOperations,
    getNextOperations,
  } = useOperationsContext()

  if (
    !operationsQuery.walletId &&
    !operationsQuery.category &&
    !operations.length
  ) {
    return null
  }

  return (
    <Card>
      <Card.Title
        title="Operations"
        action={operationsQuery.walletId && <OperationsCreate />}
      />

      <Card.Divider />

      <OperationsCategory />

      {operations.length ? <Card.Divider /> : null}

      {operations.map((operation) => (
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

      {hasPrevOperations || hasNextOperations ? (
        <>
          <Card.Divider />

          <Card.Pagination
            hasPrev={hasPrevOperations}
            hasNext={hasNextOperations}
            onPrevClick={getPrevOperations}
            onNextClick={getNextOperations}
          />
        </>
      ) : null}
    </Card>
  )
}
