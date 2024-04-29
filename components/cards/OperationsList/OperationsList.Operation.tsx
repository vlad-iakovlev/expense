import { Card } from '@/components/ui-kit/Card/Card.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { ExpenseOperation } from './OperationsList.ExpenseOperation.jsx'
import { IncomeOperation } from './OperationsList.IncomeOperation.jsx'
import { TransferOperation } from './OperationsList.TransferOperation.jsx'

interface Props {
  operationId: string
  walletId: string | undefined
}

export const Operation = ({ operationId, walletId }: Props) => {
  const { operation } = useOperation({ operationId })

  return (
    <Card.Link
      href={ROUTES.OPERATION(operation.id)}
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
    />
  )
}
