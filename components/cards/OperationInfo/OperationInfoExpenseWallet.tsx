import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationInfoExpenseWallet: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()
  const { walletsResponse } = useWalletsContext()

  const options = useMemo(() => {
    return (
      walletsResponse?.wallets.map((wallet) => ({
        id: wallet.id,
        name: `${wallet.name} ${wallet.currency.name}`,
      })) || []
    )
  }, [walletsResponse])

  const value = useMemo(
    () => ({
      id: operationResponse?.operation.expenseWallet?.id || '',
      name: `${operationResponse?.operation.expenseWallet?.name} ${operationResponse?.operation.expenseWallet?.currency.name}`,
    }),
    [operationResponse?.operation.expenseWallet]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        await updateOperation({
          operationId: operationResponse.operation.id,
          expenseWalletId: option.id,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse) {
    return <Card.Skeleton />
  }

  if (!operationResponse.operation.expenseWallet) {
    return null
  }

  return (
    <Card.Select
      name={operationResponse.operation.incomeWallet ? 'From Wallet' : 'Wallet'}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
