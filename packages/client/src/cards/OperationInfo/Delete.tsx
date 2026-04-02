import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { Button } from '@/components/Button'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'
import { Route as DashboardRoute } from '@/routes/index'
import { Route as WalletRoute } from '@/routes/wallet.$walletId.index'

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
    void navigate(
      wallet
        ? { to: WalletRoute.to, params: { walletId: wallet.id } }
        : { to: DashboardRoute.to },
    )
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
