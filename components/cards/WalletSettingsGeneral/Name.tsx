import { Card } from '@/components/common/Card/index.jsx'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface Props {
  walletId: string
}

export const Name = ({ walletId }: Props) => {
  const { wallet, setWalletName } = useWallet({ walletId })

  return (
    <Card.Input label="Name" value={wallet.name} onChange={setWalletName} />
  )
}
