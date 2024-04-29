import { Card } from '@/components/common/Card/index.jsx'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface NameProps {
  walletId: string
}

export const Name = ({ walletId }: NameProps) => {
  const { wallet, setWalletName } = useWallet({ walletId })

  return (
    <Card.Input label="Name" value={wallet.name} onChange={setWalletName} />
  )
}
