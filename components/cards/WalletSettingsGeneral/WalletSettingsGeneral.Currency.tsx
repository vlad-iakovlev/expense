import { useWallet } from '../../../contexts/RootStore/hooks/useWallet.ts'
import { CurrencySelect } from '../../ui-kit/CurrencySelect/CurrencySelect.tsx'

interface Props {
  walletId: string
}

export const Currency = ({ walletId }: Props) => {
  const { wallet, setWalletCurrency } = useWallet({ walletId })

  return (
    <CurrencySelect
      label="Currency"
      value={wallet.currency}
      onChange={setWalletCurrency}
    />
  )
}
