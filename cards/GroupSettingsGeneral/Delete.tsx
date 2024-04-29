import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ConfirmDialog } from '@/components/common/ConfirmDialog.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'
import { useWallets } from '@/contexts/RootStore/hooks/useWallets.js'

interface Props {
  groupId: string
}

export const Delete = ({ groupId }: Props) => {
  const router = useRouter()
  const { removeGroup } = useGroup({ groupId })
  const { walletIds } = useWallets({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = React.useCallback(() => {
    void (async () => {
      const href = ROUTES.DASHBOARD
      await router.push({ pathname: href, query: { animation: 'back' } }, href)
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
