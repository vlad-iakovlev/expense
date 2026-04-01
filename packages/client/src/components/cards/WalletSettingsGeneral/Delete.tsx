import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { useOperations } from '@/contexts/RootStore/hooks/useOperations'
import { useWallet } from '@/contexts/RootStore/hooks/useWallet'
import { Route as GroupRoute } from '@/routes/group.$groupId.index'

type DeleteProps = {
  walletId: string
}

export const Delete = ({ walletId }: DeleteProps) => {
  const navigate = useNavigate()
  const { wallet, removeWallet } = useWallet({ walletId })
  const { operationIds } = useOperations({ walletId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    removeWallet()
    void navigate({ to: GroupRoute.to, params: { groupId: wallet.group.id } })
  }, [navigate, removeWallet, wallet.group.id])

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
