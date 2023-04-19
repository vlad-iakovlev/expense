import { FC, useCallback, useMemo } from 'react'
import { updateWallet } from '../../../api/client/wallets.ts'
import { useCurrenciesContext } from '../../contexts/Currencies.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { useWalletContext } from '../../contexts/Wallet.tsx'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

export const WalletInfoCurrency: FC = () => {
  const { setLoading } = useLoadingContext()
  const { currenciesResponse } = useCurrenciesContext()
  const { mutateOperations } = useOperationsContext()
  const { walletResponse, mutateWallet } = useWalletContext()

  const options = useMemo(() => {
    return (
      currenciesResponse?.currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
      })) ?? []
    )
  }, [currenciesResponse])

  const value = useMemo(
    () => ({
      id: walletResponse?.wallet.currency.id ?? '',
      name: walletResponse?.wallet.currency.name ?? '',
    }),
    [walletResponse?.wallet.currency.id, walletResponse?.wallet.currency.name]
  )

  const handleChange = useCallback(
    async (option: CardSelectOption) => {
      if (!walletResponse) return

      try {
        setLoading(true)

        await updateWallet({
          walletId: walletResponse.wallet.id,
          currencyId: option.id,
        })

        await Promise.all([mutateOperations(), mutateWallet()])
      } finally {
        setLoading(false)
      }
    },
    [walletResponse, setLoading, mutateOperations, mutateWallet]
  )

  if (!walletResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Select
      name="Currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
