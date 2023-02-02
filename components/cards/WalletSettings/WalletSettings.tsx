import { FC, useCallback, useMemo } from 'react'
import { useSWRConfig } from 'swr'
import { updateWallet } from '../../../api/client/wallets'
import { SWR_KEYS } from '../../../constants/swr'
import { useCurrenciesContext } from '../../contexts/Currencies'
import { useOperationsContext } from '../../contexts/Operations'
import { useWalletContext } from '../../contexts/Wallet'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const WalletSettingsCard: FC = () => {
  const { mutate } = useSWRConfig()
  const { currencies } = useCurrenciesContext()
  const { query: operationsQuery } = useOperationsContext()
  const { query, wallet } = useWalletContext()

  const currencyOptions = useMemo(() => {
    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.name,
    }))
  }, [currencies])

  const currencyValue = useMemo(
    () => ({
      id: wallet.currency.id,
      name: wallet.currency.name,
    }),
    [wallet.currency.id, wallet.currency.name]
  )

  const handleUpdateCurrency = useCallback(
    async (option: CardSelectOption) => {
      await updateWallet({
        walletId: wallet.id,
        currencyId: option.id,
      })

      await mutate(SWR_KEYS.OPERATIONS(operationsQuery))
      await mutate(SWR_KEYS.WALLET(query))
    },
    [mutate, operationsQuery, query, wallet.id]
  )

  return (
    <Card>
      <Card.Title title="Settings" />

      <Card.Divider />

      <Card.Select
        name="Currency"
        options={currencyOptions}
        value={currencyValue}
        onChange={handleUpdateCurrency}
      />
    </Card>
  )
}
