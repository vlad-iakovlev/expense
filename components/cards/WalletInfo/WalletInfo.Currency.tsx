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
      name: (
        <div className="flex gap-2">
          {!!currency.name && <div className="truncate">{currency.name}</div>}
          <div className="flex-none w-10 ml-auto text-right font-medium">
            {currency.symbol}
          </div>
        </div>
      ),
    }))
  }, [currencies])

  const value = useMemo(
    () => ({
      id: wallet.currency.id,
      name: wallet.currency.symbol,
    }),
    [wallet.currency.id, wallet.currency.symbol]
  )

  const handleChange = useCallback(
    (option: CardSelectOption) => {
      setWalletCurrency(option.id)
    },
    [setWalletCurrency]
  )

  return (
    <Card.Select
      popupFullWidth
      label="Currency"
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
