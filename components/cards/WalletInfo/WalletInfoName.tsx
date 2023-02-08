import { FC, useCallback } from 'react'
import { updateWallet } from '../../../api/client/wallets'
import { useLoadingContext } from '../../contexts/Loading'
import { useWalletContext } from '../../contexts/Wallet'
import { Card } from '../../ui-kit/Card'

export const WalletInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { wallet, mutateWallet } = useWalletContext()

  const handleChange = useCallback(
    async (name: string) => {
      try {
        setLoading(true)

        await updateWallet({
          walletId: wallet.id,
          name,
        })

        await mutateWallet()
      } finally {
        setLoading(false)
      }
    },
    [setLoading, wallet.id, mutateWallet]
  )

  return <Card.Input name="Name" value={wallet.name} onChange={handleChange} />
}
