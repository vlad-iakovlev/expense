import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationInfoExpenseWallet: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operation, mutateOperation } = useOperationContext()
  const { wallets } = useWalletsContext()

  const options = useMemo(() => {
    return wallets.map((wallet) => ({
      id: wallet.id,
      name: `${wallet.name} ${wallet.currency.name}`,
    }))
  }, [wallets])

  const value = useMemo(
    () => ({
      id: operation.expenseWallet?.id || '',
      name: `${operation.expenseWallet?.name} ${operation.expenseWallet?.currency.name}`,
    }),
    [operation.expenseWallet]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      try {
        setLoading(true)

        await updateOperation({
          operationId: operation.id,
          expenseWalletId: option.id,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operation.id, setLoading]
  )

  if (!operation.expenseWallet) return null

  return (
    <Card.Select
      name={operation.incomeWallet ? 'From Wallet' : 'Wallet'}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
