import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets'
import { Route as IndexRoute } from '@/routes/index'

type DeleteProps = {
  groupId: string
}

export const Delete = ({ groupId }: DeleteProps) => {
  const navigate = useNavigate()
  const { removeGroup } = useGroup({ groupId })
  const { walletIds } = useWallets({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    removeGroup()
    void navigate({ to: IndexRoute.to })
  }, [navigate, removeGroup])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {!walletIds.length && (
        <Button rounded size="sm" theme="red" onClick={handleDelete}>
          Delete
        </Button>
      )}

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete group"
        description="Are you sure you want to delete group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
