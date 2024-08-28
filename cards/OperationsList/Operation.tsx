import { Card } from '@/components/common/Card/index.jsx'
import { NextLink } from '@/components/next/Link.js'
import { ROUTES } from '@/constants/routes.js'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { ExpenseOperation } from './ExpenseOperation.jsx'
import { IncomeOperation } from './IncomeOperation.jsx'
import { TransferOperation } from './TransferOperation.jsx'

interface OperationProps {
  operationId: string
  walletId: string | undefined
}

export const Operation = ({ operationId, walletId }: OperationProps) => {
  const { operation } = useOperation({ operationId })

  return (
    <NextLink href={ROUTES.OPERATION(operation.id)}>
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
    </NextLink>
  )
}
