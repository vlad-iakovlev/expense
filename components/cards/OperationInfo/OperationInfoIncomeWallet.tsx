import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationInfoIncomeWallet: FC = () => {
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
      id: operationResponse?.operation.incomeWallet?.id || '',
      name: `${operationResponse?.operation.incomeWallet?.name} ${operationResponse?.operation.incomeWallet?.currency.name}`,
    }),
    [operationResponse?.operation.incomeWallet]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (!operationResponse) return

      try {
        setLoading(true)

        await updateOperation({
          operationId: operationResponse.operation.id,
          incomeWalletId: option.id,
        })

        await mutateOperation()
      } finally {
        setLoading(false)
      }
    },
    [mutateOperation, operationResponse, setLoading]
  )

  if (!operationResponse?.operation.incomeWallet) {
    return null
  }

  return (
    <Card.Select
      name={operationResponse.operation.expenseWallet ? 'To Wallet' : 'Wallet'}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
