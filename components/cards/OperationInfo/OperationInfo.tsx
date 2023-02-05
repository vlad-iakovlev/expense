import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useOperationContext } from '../../contexts/Operation'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'
import { OperationInfoAmount } from './OperationInfoAmount'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoName } from './OperationInfoName'
import { OperationInfoType } from './OperationInfoType'
import { OperationInfoWallet } from './OperationInfoWallet'

export const OperationInfoCard: FC = () => {
  const router = useRouter()
  const { operation } = useOperationContext()
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const handleDelete = useCallback(() => {
    setIsDeleteConfirmOpen(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleteConfirmOpen(false)

    await deleteOperation({
      operationId: operation.id,
    })

    await router.push(ROUTES.WALLET(operation.wallet.id))
  }, [operation.id, operation.wallet.id, router])

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteConfirmOpen(false)
  }, [])

  return (
    <Card>
      <Card.Title
        title="Info"
        action={
          <Button
            rounded
            size="sm"
            theme="error"
            iconStart={<XMarkIcon />}
            onClick={handleDelete}
          />
        }
      />
      <Card.Divider />
      <OperationInfoDate />
      <OperationInfoWallet />
      <OperationInfoCategory />
      <OperationInfoName />
      <OperationInfoAmount />
      <OperationInfoType />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete operation"
        description="Are you sure you want to delete operation? This action cannot be undone."
        action="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Card>
  )
}
