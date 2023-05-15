import { FC } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { ExpenseOperation } from './OperationsList.ExpenseOperation.tsx'
import { IncomeOperation } from './OperationsList.IncomeOperation.tsx'
import { TransferOperation } from './OperationsList.TransferOperation.tsx'

interface Props {
  operationId: string
  walletId: string | undefined
}

export const Operation: FC<Props> = ({ operationId, walletId }) => {
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
