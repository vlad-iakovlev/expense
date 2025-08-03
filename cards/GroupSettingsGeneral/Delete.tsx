import { useRouter } from 'next/router'
import React from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ROUTES } from '@/constants/routes'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets'

interface DeleteProps {
  groupId: string
}

export const Delete = ({ groupId }: DeleteProps) => {
  const router = useRouter()
  const { removeGroup } = useGroup({ groupId })
  const { walletIds } = useWallets({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = React.useCallback(() => {
    void (async () => {
      await router.push(ROUTES.DASHBOARD)
      removeGroup()
    })()
  }, [removeGroup, router])

  const handleDeleteCancel = React.useCallback(() => {
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
