import assert from 'assert'
import { useMemo } from 'react'
import { WalletSelect } from '@/components/common/WalletSelect'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type ExpenseWalletProps = {
  operationId: string
}

export const ExpenseWallet = ({ operationId }: ExpenseWalletProps) => {
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
