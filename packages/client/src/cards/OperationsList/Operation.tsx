import { Link } from '@tanstack/react-router'
import { Card } from '@/components/Card'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { Route as OperationRoute } from '@/routes/operation.$operationId'
import { ExpenseOperation } from './ExpenseOperation'
import { IncomeOperation } from './IncomeOperation'
import { TransferOperation } from './TransferOperation'

type OperationProps = {
  operationId: string
  walletId: string | undefined
}

export const Operation = ({ operationId, walletId }: OperationProps) => {
  const { operation } = useOperation({ operationId })

  return (
    <Link to={OperationRoute.to} params={{ operationId }}>
      <Card.Item
        label={
          <>
            {operation.incomeWallet && operation.expenseWallet ? (
              <TransferOperation operation={operation} walletId={walletId} />
            ) : null}
            {operation.incomeWallet && !operation.expenseWallet ? (
              <IncomeOperation operation={operation} walletId={walletId} />
            ) : null}
            {!operation.incomeWallet && operation.expenseWallet ? (
              <ExpenseOperation operation={operation} walletId={walletId} />
            ) : null}
          </>
        }
        clickable
        tabIndex={-1}
      />
    </Link>
  )
}
