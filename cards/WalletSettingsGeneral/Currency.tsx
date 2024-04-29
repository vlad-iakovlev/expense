import { CurrencySelect } from '@/components/common/CurrencySelect.jsx'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface CurrencyProps {
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
