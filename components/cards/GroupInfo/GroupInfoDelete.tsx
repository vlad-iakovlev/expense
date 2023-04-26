import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import assert from 'node:assert'
import { FC, useCallback, useState } from 'react'
import { deleteGroup } from '../../../api/client/groups.ts'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroupContext } from '../../contexts/Group.tsx'
import { useLoadingContext } from '../../contexts/Loading.tsx'
import { useWalletsContext } from '../../contexts/Wallets.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

export const GroupInfoDelete: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { groupResponse } = useGroupContext()
  const { walletsResponse } = useWalletsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      assert(groupResponse, 'groupResponse is not defined')

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
    })()
  }, [groupResponse, router, setLoading])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {groupResponse && walletsResponse?.wallets.length === 0 && (
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
