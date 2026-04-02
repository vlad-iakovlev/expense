import { useMemo } from 'react'
import { WalletSelect } from '@/components/WalletSelect'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type IncomeWalletProps = {
  operationId: string
}

export const IncomeWallet = ({ operationId }: IncomeWalletProps) => {
  const { operation, setOperationIncomeWallet } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    if (!wallet) throw new Error('Wallet not found')
    return wallet.group.id
  }, [operation.expenseWallet, operation.incomeWallet])

  if (!operation.incomeWallet) {
    return null
  }

  return (
    <WalletSelect
      label={operation.expenseWallet ? 'To Wallet' : 'Wallet'}
      groupId={groupId}
      value={operation.incomeWallet}
      onChange={setOperationIncomeWallet}
    />
  )
}
