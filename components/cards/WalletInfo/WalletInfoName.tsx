import assert from 'node:assert'
import { FC, useCallback } from 'react'
import { updateWallet } from '../../../api/client/wallets.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useWalletContext } from '../../contexts/Wallet.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

export const WalletInfoName: FC = () => {
  const { setLoading } = useLoadingContext()
  const { walletResponse, mutateWallet } = useWalletContext()

  const handleChange = useCallback(
    async (name: string) => {
      assert(walletResponse, 'walletResponse is not defined')

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
