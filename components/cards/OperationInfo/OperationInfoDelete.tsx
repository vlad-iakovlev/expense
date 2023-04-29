import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router.js'
import { FC, useCallback, useState } from 'react'
import { ROUTES } from '../../../constants/routes.ts'
import { useOperation } from '../../../stores/RootStore/hooks/useOperation.ts'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog/ConfirmDialog.tsx'

interface Props {
  operationId: string
}

export const OperationInfoDelete: FC<Props> = ({ operationId }) => {
  const router = useRouter()
  const { operation, removeOperation } = useOperation({ operationId })
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    void (async () => {
      const wallet = operation.expenseWallet ?? operation.incomeWallet
      await router.push(wallet ? ROUTES.WALLET(wallet.id) : ROUTES.DASHBOARD)
      removeOperation()
    })()
  }, [operation.expenseWallet, operation.incomeWallet, removeOperation, router])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

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
        title="Delete operation"
        description="Are you sure you want to delete operation? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
