import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { useOperationsContext } from '../../contexts/Operations'
import { useWalletContext } from '../../contexts/Wallet'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'
import { WalletInfoBalance } from './WalletInfoBalance'
import { WalletInfoCurrency } from './WalletInfoCurrency'
import { WalletInfoName } from './WalletInfoName'

export const WalletInfoCard: FC = () => {
  const router = useRouter()
  const { wallet } = useWalletContext()
  const { operations } = useOperationsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleteConfirmOpen(false)

    await deleteWallet({
      walletId: wallet.id,
    })

    await router.push(ROUTES.GROUP(wallet.group.id))
  }, [router, wallet.group.id, wallet.id])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

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
      <WalletInfoName />
      <WalletInfoCurrency />
      <WalletInfoBalance />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete wallet"
        description="Are you sure you want to delete wallet? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Card>
  )
}
