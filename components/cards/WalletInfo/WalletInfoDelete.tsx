import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteWallet } from '../../../api/client/wallets'
import { ROUTES } from '../../../constants/routes'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationsContext } from '../../contexts/Operations'
import { useWalletContext } from '../../contexts/Wallet'
import { Button } from '../../ui-kit/Button'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'

export const WalletInfoDelete: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { walletResponse } = useWalletContext()
  const { operationsResponse } = useOperationsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!walletResponse) return

    try {
      setLoading(true)
      setIsDeleteConfirmOpen(false)

      await deleteWallet({
        walletId: walletResponse.wallet.id,
      })

      await router.push(ROUTES.GROUP(walletResponse.wallet.group.id))
    } finally {
      setLoading(false)
    }
  }, [router, setLoading, walletResponse])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {walletResponse &&
        operationsResponse &&
        !!operationsResponse.operations.length && (
          <Button
            rounded
            size="sm"
            theme="error"
            iconStart={<XMarkIcon />}
            onClick={handleDelete}
          />
        )}

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete wallet"
        description="Are you sure you want to delete wallet? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
