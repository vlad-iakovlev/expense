import { XMarkIcon } from '@heroicons/react/20/solid'
import assert from 'assert'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { useCallback, useState } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroup } from '../../../contexts/RootStore/hooks/useGroup.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

interface Props {
  groupId: string
  userId: string
}

export const Delete: React.FC<Props> = ({ groupId, userId }) => {
  const session = useSession()
  const router = useRouter()
  const { group, removeUserFromGroup, leaveGroup } = useGroup({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      assert(session.status === 'authenticated', 'User is not authenticated')

      if (session.data.user.id === userId) {
        const href = ROUTES.DASHBOARD
        await router.push(
          { pathname: href, query: { animation: 'back' } },
          href
        )
        leaveGroup()
      } else {
        removeUserFromGroup(userId)
        setIsDeleteConfirmOpen(false)
      }
    })()
  }, [
    leaveGroup,
    removeUserFromGroup,
    router,
    session.data?.user.id,
    session.status,
    userId,
  ])

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
        theme="error"
        iconStart={<XMarkIcon />}
        onClick={handleDelete}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete user from group"
        description="Are you sure you want to delete user from group? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
