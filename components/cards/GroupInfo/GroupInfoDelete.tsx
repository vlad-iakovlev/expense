import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteGroup } from '../../../api/client/groups'
import { ROUTES } from '../../../constants/routes'
import { useGroupContext } from '../../contexts/Group'
import { useLoadingContext } from '../../contexts/Loading'
import { useWalletsContext } from '../../contexts/Wallets'
import { Button } from '../../ui-kit/Button'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'

export const GroupInfoDelete: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { groupResponse } = useGroupContext()
  const { walletsResponse } = useWalletsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!groupResponse) return

    try {
      setLoading(true)
      setIsDeleteConfirmOpen(false)

      await deleteGroup({
        groupId: groupResponse.group.id,
      })

      await router.push(ROUTES.DASHBOARD)
    } finally {
      setLoading(false)
    }
  }, [groupResponse, router, setLoading])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {groupResponse && walletsResponse && !!walletsResponse.wallets.length && (
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
        title="Delete group"
        description="Are you sure you want to delete group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
