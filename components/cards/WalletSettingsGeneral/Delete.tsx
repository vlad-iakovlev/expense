import { useRouter } from 'next/router.js'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ConfirmDialog } from '@/components/common/ConfirmDialog.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations.js'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet.js'

interface Props {
  walletId: string
}

export const Delete = ({ walletId }: Props) => {
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
        <Button rounded size="sm" theme="red" onClick={handleDelete}>
          Delete
        </Button>
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
