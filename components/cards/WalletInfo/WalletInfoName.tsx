import { FC, useCallback } from 'react'
import { updateWallet } from '../../../api/client/wallets'
import { useWalletContext } from '../../contexts/Wallet'
import { Card } from '../../ui-kit/Card'

export const WalletInfoName: FC = () => {
  const { wallet, mutateWallet } = useWalletContext()

  const handleChange = useCallback(
    async (name: string) => {
      await updateWallet({
        walletId: wallet.id,
        name,
      })

      await mutateWallet()
    },
    [wallet.id, mutateWallet]
  )

  return <Card.Input name="Name" value={wallet.name} onChange={handleChange} />
}
