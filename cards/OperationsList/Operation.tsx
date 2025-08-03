import Link from 'next/link'
import { Card } from '@/components/common/Card/index'
import { ROUTES } from '@/constants/routes'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { ExpenseOperation } from './ExpenseOperation'
import { IncomeOperation } from './IncomeOperation'
import { TransferOperation } from './TransferOperation'

interface OperationProps {
  operationId: string
  walletId: string | undefined
}

export const Operation = ({ operationId, walletId }: OperationProps) => {
  const { operation } = useOperation({ operationId })

  return (
    <Link href={ROUTES.OPERATION(operation.id)}>
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
