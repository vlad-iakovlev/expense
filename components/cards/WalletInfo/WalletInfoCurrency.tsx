import { FC, useCallback, useMemo } from 'react'
import { updateWallet } from '../../../api/client/wallets'
import { useCurrenciesContext } from '../../contexts/Currencies'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationsContext } from '../../contexts/Operations'
import { useWalletContext } from '../../contexts/Wallet'
import { Card, CardSelectOption } from '../../ui-kit/Card'

export const WalletInfoCurrency: FC = () => {
  const { setLoading } = useLoadingContext()
  const { currencies } = useCurrenciesContext()
  const { mutateOperations } = useOperationsContext()
  const { wallet, mutateWallet } = useWalletContext()

  const options = useMemo(() => {
    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.name,
    }))
  }, [currencies])

  const value = useMemo(
    () => ({
      id: wallet.currency.id,
      name: wallet.currency.name,
    }),
    [wallet.currency.id, wallet.currency.name]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      try {
        setLoading(true)

        await updateWallet({
          walletId: wallet.id,
          currencyId: option.id,
        })

        await Promise.all([mutateOperations(), mutateWallet()])
      } finally {
        setLoading(false)
      }
    },
    [setLoading, wallet.id, mutateOperations, mutateWallet]
  )

  return (
    <Card.Select
      name="Currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
