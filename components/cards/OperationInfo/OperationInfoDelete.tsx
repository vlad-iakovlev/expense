import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useLoadingContext } from '../../contexts/Loading'
import { useOperationContext } from '../../contexts/Operation'
import { Button } from '../../ui-kit/Button'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'

export const OperationInfoDelete: FC = () => {
  const router = useRouter()
  const { setLoading } = useLoadingContext()
  const { operationResponse } = useOperationContext()
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    if (!operationResponse) return

    try {
      setLoading(true)
      setIsDeleteConfirmOpen(false)

      await deleteOperation({
        operationId: operationResponse.operation.id,
      })

      const wallet =
        operationResponse.operation.expenseWallet ||
        operationResponse.operation.incomeWallet

      if (wallet) {
        await router.push(ROUTES.WALLET(wallet.id))
      } else {
        await router.push(ROUTES.DASHBOARD)
      }
    } finally {
      setLoading(false)
    }
  }, [operationResponse, router, setLoading])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <>
      {operationResponse && (
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
        title="Delete operation"
        description="Are you sure you want to delete operation? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
