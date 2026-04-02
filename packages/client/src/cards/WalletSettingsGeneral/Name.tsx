import { Card } from '@/components/Card'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'

type NameProps = {
  walletId: string
}

export const Name = ({ walletId }: NameProps) => {
  const { wallet, setWalletName } = useWallet({ walletId })

  return (
    <Card.Input label="Name" value={wallet.name} onChange={setWalletName} />
  )
}
