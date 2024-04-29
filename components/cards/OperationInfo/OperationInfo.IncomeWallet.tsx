import assert from 'assert'
import { useMemo } from 'react'
import { WalletSelect } from '@/components/ui-kit/WalletSelect/WalletSelect.jsx'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface Props {
  operationId: string
}

export const IncomeWallet = ({ operationId }: Props) => {
  const { operation, setOperationIncomeWallet } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    assert(wallet, 'Wallet not found')
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
