import assert from 'assert'
import { FC, useCallback, useMemo } from 'react'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { useWalletsOptions } from '../../../stores/RootStore/hooks/useWalletsOptions.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  operationId: string
}

export const ExpenseWallet: FC<Props> = ({ operationId }) => {
  const { operation, setOperationExpenseWallet } = useOperation({ operationId })

  const groupId = useMemo(() => {
    const wallet = operation.incomeWallet ?? operation.expenseWallet
    assert(wallet, 'Wallet not found')
    return wallet.group.id
  }, [operation.expenseWallet, operation.incomeWallet])

  const { walletsOptions } = useWalletsOptions({ groupId })

  const value = useMemo(() => {
    const wallet = operation.expenseWallet

    return {
      id: wallet?.id ?? '',
      name: `${wallet?.name ?? ''} ${wallet?.currency.name ?? ''}`,
    }
  }, [operation.expenseWallet])

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setOperationExpenseWallet(option.id)
    },
    [setOperationExpenseWallet]
  )

  if (!operation.expenseWallet) {
    return null
  }

  return (
    <Card.Select
      label={operation.incomeWallet ? 'From Wallet' : 'Wallet'}
      options={walletsOptions}
      value={value}
      onChange={handleChange}
    />
  )
}
