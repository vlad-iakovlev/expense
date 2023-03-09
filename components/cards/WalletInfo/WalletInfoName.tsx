import { FC, useCallback } from 'react'
import { updateWallet } from '../../../api/client/wallets'
import { useLoadingContext } from '../../contexts/Loading'
import { useWalletContext } from '../../contexts/Wallet'
import { Card } from '../../ui-kit/Card'

export const WalletInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { walletResponse, mutateWallet } = useWalletContext()

  const handleChange = useCallback(
    async (name: string) => {
      if (!walletResponse) return

      try {
        setLoading(true)

        await updateWallet({
          walletId: walletResponse.wallet.id,
          name,
        })

        await mutateWallet()
      } finally {
        setLoading(false)
      }
    },
    [mutateWallet, setLoading, walletResponse]
  )

  if (!walletResponse) {
    return <Card.Skeleton />
  }

  return (
    <Card.Input
      name="Name"
      value={walletResponse.wallet.name}
      onChange={handleChange}
    />
  )
}
