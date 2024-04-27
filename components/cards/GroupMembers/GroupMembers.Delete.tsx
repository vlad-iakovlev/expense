import { XMarkIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { useCallback, useState } from 'react'
import { ROUTES } from '../../../constants/routes.js'
import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.js'
import { Button } from '../../ui-kit/Button/Button.jsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.jsx'

interface Props {
  groupId: string
  userId: string
  tabIndex?: number
}

export const Delete = ({ groupId, userId, tabIndex }: Props) => {
  const session = useSession()
  const router = useRouter()
  const { group, removeMemberFromGroup, leaveGroup } = useGroup({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      assert(session.status === 'authenticated', 'User is not authenticated')
      assert(session.data.user?.id, 'User id is required')

      if (session.data.user.id === userId) {
        const href = ROUTES.DASHBOARD
        await router.push(
          { pathname: href, query: { animation: 'back' } },
          href,
        )
        leaveGroup()
      } else {
        removeMemberFromGroup(userId)
        setIsDeleteConfirmOpen(false)
      }
    })()
  }, [leaveGroup, removeMemberFromGroup, router, session, userId])

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
