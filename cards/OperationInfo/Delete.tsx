import { useRouter } from 'next/navigation.js'
import React from 'react'
import { Button } from '@/components/common/Button.jsx'
import { ConfirmDialog } from '@/components/common/ConfirmDialog.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'

interface DeleteProps {
  operationId: string
}

export const Delete = ({ operationId }: DeleteProps) => {
  const router = useRouter()
  const { operation, removeOperation } = useOperation({ operationId })
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = React.useState(false)

  const handleDelete = React.useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = React.useCallback(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    router.push(wallet ? ROUTES.WALLET(wallet.id) : ROUTES.DASHBOARD)
    removeOperation()
  }, [operation.expenseWallet, operation.incomeWallet, removeOperation, router])

  const handleDeleteCancel = React.useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      <Button rounded size="sm" theme="red" onClick={handleDelete}>
        Delete
      </Button>

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
