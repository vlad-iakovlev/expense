import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback, useState } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperations } from '../../../stores/RootStore/hooks/useOperations.ts'
import { useWallet } from '../../../stores/RootStore/hooks/useWallet.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

interface Props {
  walletId: string
}

export const WalletInfoDelete: FC<Props> = ({ walletId }) => {
  const router = useRouter()
  const { wallet, removeWallet } = useWallet({ walletId })
  const { operationIds } = useOperations({ walletId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      const href = ROUTES.GROUP(wallet.group.id)
      await router.push({ pathname: href, query: { animation: 'back' } }, href)
      removeWallet()
    })()
  }, [removeWallet, router, wallet.group.id])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {!operationIds.length && (
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
