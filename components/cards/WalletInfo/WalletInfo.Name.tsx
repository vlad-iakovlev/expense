import { FC } from 'react'
import { useWallet } from '../../../contexts/RootStore/hooks/useWallet.ts'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  walletId: string
}

export const Name: FC<Props> = ({ walletId }) => {
  const { wallet, setWalletName } = useWallet({ walletId })

  return (
    <Card.Input label="Name" value={wallet.name} onChange={setWalletName} />
  )
}
