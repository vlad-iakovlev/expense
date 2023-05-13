import assert from 'assert'
import { FC, useMemo } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { WalletSelect } from '../../ui-kit/WalletSelect/WalletSelect.tsx'

interface Props {
  operationId: string
}

export const IncomeWallet: FC<Props> = ({ operationId }) => {
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
