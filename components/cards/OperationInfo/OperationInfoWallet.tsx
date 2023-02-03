import { FC, useCallback, useMemo } from 'react'
import { useSWRConfig } from 'swr'
import { updateOperation } from '../../../api/client/operations'
import { SWR_KEYS } from '../../../constants/swr'
import { useOperationContext } from '../../contexts/Operation'
import { useWalletsContext } from '../../contexts/Wallets'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const OperationInfoWallet: FC = () => {
  const { mutate } = useSWRConfig()
  const { query, operation } = useOperationContext()
  const { wallets } = useWalletsContext()

  const options = useMemo(() => {
    return wallets.map((wallet) => ({
      id: wallet.id,
      name: `${wallet.name} ${wallet.currency.name}`,
    }))
  }, [wallets])

  const value = useMemo(
    () => ({
      id: operation.wallet.id,
      name: `${operation.wallet.name} ${operation.wallet.currency.name}`,
    }),
    [operation.wallet.currency.name, operation.wallet.id, operation.wallet.name]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      await updateOperation({
        operationId: operation.id,
        walletId: option.id,
      })

      await mutate(SWR_KEYS.OPERATION(query))
    },
    [mutate, operation.id, query]
  )

  return (
    <Card.Select
      name="Wallet"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
