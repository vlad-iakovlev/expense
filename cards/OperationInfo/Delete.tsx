import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ROUTES } from '@/constants/routes'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

type DeleteProps = {
  operationId: string
}

export const Delete = ({ operationId }: DeleteProps) => {
  const router = useRouter()
  const { operation, removeOperation } = useOperation({ operationId })
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet
    const targetPath = wallet ? ROUTES.WALLET(wallet.id) : ROUTES.DASHBOARD
    removeOperation()
    router.push(targetPath)
  }, [operation.expenseWallet, operation.incomeWallet, removeOperation, router])

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
