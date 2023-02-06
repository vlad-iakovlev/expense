import { XMarkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'
import { deleteOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useOperationContext } from '../../contexts/Operation'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { ConfirmDialog } from '../../ui-kit/ConfirmDialog'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoExpenseAmount } from './OperationInfoExpenseAmount'
import { OperationInfoExpenseWallet } from './OperationInfoExpenseWallet'
import { OperationInfoIncomeAmount } from './OperationInfoIncomeAmount'
import { OperationInfoIncomeWallet } from './OperationInfoIncomeWallet'
import { OperationInfoName } from './OperationInfoName'
import { OperationInfoType } from './OperationInfoType'

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

    const wallet = operation.expenseWallet || operation.incomeWallet

    if (wallet) {
      await router.push(ROUTES.WALLET(wallet.id))
    } else {
      await router.push(ROUTES.DASHBOARD)
    }
  }, [operation.expenseWallet, operation.id, operation.incomeWallet, router])

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
      <OperationInfoCategory />
      <OperationInfoName />
      <OperationInfoType />
      <OperationInfoExpenseWallet />
      <OperationInfoExpenseAmount />
      <OperationInfoIncomeWallet />
      <OperationInfoIncomeAmount />

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
