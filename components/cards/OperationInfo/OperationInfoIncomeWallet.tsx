import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationInfoIncomeWallet: FC = () => {
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
      id: operation.incomeWallet?.id || '',
      name: `${operation.incomeWallet?.name} ${operation.incomeWallet?.currency.name}`,
    }),
    [operation.incomeWallet]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      try {
        setLoading(true)

        await updateOperation({
          operationId: operation.id,
          incomeWalletId: option.id,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operation.id, setLoading]
  )

  if (!operation.incomeWallet) {
    return null
  }

  return (
    <Card.Select
      name={operation.expenseWallet ? 'To Wallet' : 'Wallet'}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
