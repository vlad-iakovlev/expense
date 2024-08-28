import { XMarkIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ConfirmDialog } from '@/components/common/ConfirmDialog.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface DeleteProps {
  groupId: string
  userId: string
  tabIndex?: number
}

export const Delete = ({ groupId, userId, tabIndex }: DeleteProps) => {
  const session = useSession()
  const router = useRouter()
  const { group, removeMemberFromGroup, leaveGroup } = useGroup({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = React.useCallback(() => {
    void (async () => {
      assert(session.status === 'authenticated', 'User is not authenticated')
      assert(session.data.user?.id, 'User id is required')

      if (session.data.user.id === userId) {
        await router.push(ROUTES.DASHBOARD)
        leaveGroup()
      } else {
        removeMemberFromGroup(userId)
        setIsDeleteConfirmOpen(false)
      }
    })()
  }, [leaveGroup, removeMemberFromGroup, router, session, userId])

  const handleDeleteCancel = React.useCallback(() => {
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
