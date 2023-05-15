import assert from 'assert'
import { FC, useMemo } from 'react'
import { useOperation } from '../../../contexts/RootStore/hooks/useOperation.ts'
import { WalletSelect } from '../../ui-kit/WalletSelect/WalletSelect.tsx'

interface Props {
  operationId: string
}

export const ExpenseWallet: FC<Props> = ({ operationId }) => {
  const { operation, setOperationExpenseWallet } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    assert(wallet, 'Wallet not found')
    return wallet.group.id
  }, [operation.expenseWallet, operation.incomeWallet])

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <WalletSelect
      label={operation.incomeWallet ? 'From Wallet' : 'Wallet'}
      groupId={groupId}
      value={operation.expenseWallet}
      onChange={setOperationExpenseWallet}
    />
  )
}
