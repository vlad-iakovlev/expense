import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteGroup } from '../../../api/client/groups'
import { ROUTES } from '../../../constants/routes'
import { useGroupContext } from '../../contexts/Group'
import { useWalletsContext } from '../../contexts/Wallets'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'
import { GroupInfoName } from './GroupInfoName'

export const GroupInfoCard: FC = () => {
  const router = useRouter()
  const { group } = useGroupContext()
  const { wallets } = useWalletsContext()

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleteConfirmOpen(false)

    await deleteGroup({
      groupId: group.id,
    })

    await router.push(ROUTES.DASHBOARD)
  }, [group.id, router])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <Card>
      <Card.Title
        title="Info"
        action={
          wallets.length === 0 ? (
            <Button
              rounded
              size="sm"
              theme="error"
              iconStart={<XMarkIcon />}
              onClick={handleDelete}
            />
          ) : undefined
        }
      />
      <Card.Divider />
      <GroupInfoName />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete group"
        description="Are you sure you want to delete group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Card>
  )
}
