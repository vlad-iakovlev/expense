import { XMarkIcon } from '@heroicons/react/20/solid'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { useSession } from '@/auth-client'
import { Button } from '@/components/Button'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'
import { Route as DashboardRoute } from '@/routes/index'

type DeleteProps = {
  groupId: string
  userId: string
  tabIndex?: number
}

export const Delete = ({ groupId, userId, tabIndex }: DeleteProps) => {
  const session = useSession()
  const navigate = useNavigate()
  const { group, removeMemberFromGroup, leaveGroup } = useGroup({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    if (!session.data) throw new Error('Unauthenticated')

    if (userId === session.data.user.id) {
      leaveGroup()
      void navigate({ to: DashboardRoute.to })
    } else {
      removeMemberFromGroup(userId)
      setIsDeleteConfirmOpen(false)
    }
  }, [leaveGroup, navigate, removeMemberFromGroup, session.data, userId])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  if (group.clientOnly) {
    return null
  }

  return (
    <>
      <Button
        rounded
        size="sm"
        theme="red"
        tabIndex={tabIndex}
        aria-label="Delete member"
        iconStart={<XMarkIcon />}
        onClick={handleDelete}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete member from group"
        description="Are you sure you want to delete member from group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
