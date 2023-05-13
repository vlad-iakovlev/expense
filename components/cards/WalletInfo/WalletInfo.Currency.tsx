import { FC } from 'react'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { CurrencySelect } from '../../ui-kit/CurrencySelect/CurrencySelect.tsx'

interface Props {
  walletId: string
}

export const Currency: FC<Props> = ({ walletId }) => {
  const { wallet, setWalletCurrency } = useWallet({ walletId })

  return (
    <CurrencySelect
      label="Currency"
      value={wallet.currency}
      onChange={setWalletCurrency}
    />
  )
}
