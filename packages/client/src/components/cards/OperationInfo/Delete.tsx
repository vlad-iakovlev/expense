import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type DeleteProps = {
  operationId: string
}

export const Delete = ({ operationId }: DeleteProps) => {
  const navigate = useNavigate()
  const { operation, removeOperation } = useOperation({ operationId })
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    removeOperation()
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    if (!wallet) return
    void navigate({ to: '/wallet/$walletId', params: { walletId: wallet.id } })
  }, [
    navigate,
    operation.expenseWallet,
    operation.incomeWallet,
    removeOperation,
  ])

  const handleDeleteCancel = useCallback(() => {
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
