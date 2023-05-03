import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback, useState } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useGroup } from '../../../stores/RootStore/hooks/useGroup.ts'
import { useWallets } from '../../../stores/RootStore/hooks/useWallets.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

interface Props {
  groupId: string
}

export const Delete: FC<Props> = ({ groupId }) => {
  const router = useRouter()
  const { removeGroup } = useGroup({ groupId })
  const { walletIds } = useWallets({ groupId })

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      const href = ROUTES.DASHBOARD
      await router.push({ pathname: href, query: { animation: 'back' } }, href)
      removeGroup()
    })()
  }, [removeGroup, router])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {!walletIds.length && (
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
