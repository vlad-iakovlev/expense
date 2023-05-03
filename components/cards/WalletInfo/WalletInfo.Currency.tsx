import { FC, useCallback, useMemo } from 'react'
import { useCurrencies } from '../../../stores/RootStore/hooks/useCurrencies.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { Card, CardSelectOption } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const Currency: FC<Props> = ({ walletId }) => {
  const { currencies } = useCurrencies()
  const { wallet, setWalletCurrency } = useWallet({ walletId })

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
    (option: CardSelectOption) => {
      setWalletCurrency(option.id)
    },
    [setWalletCurrency]
  )

  return (
    <Card.Select
      label="Currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
