import { FC } from 'react'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const WalletInfoName: FC<Props> = ({ walletId }) => {
  const { wallet, setWalletName } = useWallet({ walletId })

  return <Card.Input name="Name" value={wallet.name} onChange={setWalletName} />
}
