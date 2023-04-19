import { XMarkIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useRouter } from 'next/router.js'
import { FC, useCallback, useState } from 'react'
import { deleteWallet } from '../../../api/client/wallets.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useOperationsContext } from '../../contexts/Operations.tsx'
import { useWalletContext } from '../../contexts/Wallet.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

export const WalletInfoDelete: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { walletResponse } = useWalletContext()
  const { operationsResponse } = useOperationsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      assert(walletResponse, 'walletResponse is empty')

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
    })()
  }, [router, setLoading, walletResponse])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {walletResponse && operationsResponse?.operations.length === 0 ? (
        <Button
          rounded
          size="sm"
          theme="error"
          iconStart={<XMarkIcon />}
          onClick={handleDelete}
        />
      ) : undefined}

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
