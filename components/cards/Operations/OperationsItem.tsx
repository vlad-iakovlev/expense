import { FC } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { OperationsExpenseItem } from './OperationsExpenseItem.tsx'
import { OperationsIncomeItem } from './OperationsIncomeItem.tsx'
import { OperationsTransferItem } from './OperationsTransferItem.tsx'

interface Props {
  operationId: string
  walletId: string | undefined
}

export const OperationsItem: FC<Props> = ({ operationId, walletId }) => {
  const { operation } = useOperation({ operationId })

  return (
    <>
      {operation.incomeWallet && operation.expenseWallet ? (
        <OperationsTransferItem operation={operation} walletId={walletId} />
      ) : null}
      {operation.incomeWallet && !operation.expenseWallet ? (
        <OperationsIncomeItem operation={operation} walletId={walletId} />
      ) : null}
      {!operation.incomeWallet && operation.expenseWallet ? (
        <OperationsExpenseItem operation={operation} walletId={walletId} />
      ) : null}
    </>
  )
}
