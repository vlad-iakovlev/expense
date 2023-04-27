import assert from 'assert'
import { FC, useCallback, useMemo } from 'react'
import { updateOperation } from '../../../api/client/operations.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationContext } from '../../contexts/Operation.tsx'
import { useWalletsContext } from '../../contexts/Wallets.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

export const OperationInfoIncomeWallet: FC = () => {
  const { setLoading } = useLoadingContext()
  const { operationResponse, mutateOperation } = useOperationContext()
  const { walletsResponse } = useWalletsContext()

  const options = useMemo(() => {
    return (
      walletsResponse?.wallets.map((wallet) => ({
        id: wallet.id,
        name: `${wallet.name} ${wallet.currency.name}`,
      })) ?? []
    )
  }, [walletsResponse])

  const value = useMemo(() => {
    const wallet = operationResponse?.operation.incomeWallet

    return {
      id: wallet?.id ?? '',
      name: `${wallet?.name ?? ''} ${wallet?.currency.name ?? ''}`,
    }
  }, [operationResponse?.operation.incomeWallet])

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      assert(operationResponse, 'operationResponse is not defined')

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
