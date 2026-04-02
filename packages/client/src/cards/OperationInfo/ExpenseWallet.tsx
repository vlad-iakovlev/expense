import { useMemo } from 'react'
import { WalletSelect } from '@/components/WalletSelect'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type ExpenseWalletProps = {
  operationId: string
}

export const ExpenseWallet = ({ operationId }: ExpenseWalletProps) => {
  const { operation, setOperationExpenseWallet } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    if (!wallet) throw new Error('Wallet not found')
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
