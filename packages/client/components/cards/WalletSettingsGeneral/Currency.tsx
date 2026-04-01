import { CurrencySelect } from '@/components/common/CurrencySelect'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'

type CurrencyProps = {
  walletId: string
}

export const Currency = ({ walletId }: CurrencyProps) => {
  const { wallet, setWalletCurrency } = useWallet({ walletId })

  return (
    <CurrencySelect
      label="Currency"
      value={wallet.currency}
      onChange={setWalletCurrency}
    />
  )
}
