import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { deleteWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { useOperationsContext } from '../../contexts/Operations'
import { useWalletContext } from '../../contexts/Wallet'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { WalletInfoBalance } from './WalletInfoBalance'
import { WalletInfoCurrency } from './WalletInfoCurrency'

export const WalletInfoCard: FC = () => {
  const { wallet } = useWalletContext()
  const { operations } = useOperationsContext()

  const router = useRouter()

  const handleDelete = useCallback(async () => {
    await deleteWallet({
      walletId: wallet.id,
    })

    await router.push(ROUTES.GROUP(wallet.group.id))
  }, [router, wallet.group.id, wallet.id])

  return (
    <Card>
      <Card.Title
        title="Info"
        action={
          operations.length === 0 ? (
            <Button
              rounded
              size="sm"
              theme="error"
              iconStart={<XMarkIcon />}
              onClick={handleDelete}
            />
          ) : undefined
        }
      />
      <Card.Divider />
      <WalletInfoBalance />
      <WalletInfoCurrency />
    </Card>
  )
}
