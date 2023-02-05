import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { FC, useCallback } from 'react'
import { deleteOperation } from '../../../api/client/operations'
import { ROUTES } from '../../../constants/routes'
import { useOperationContext } from '../../contexts/Operation'
import { Button } from '../../ui-kit/Button'
import { Card } from '../../ui-kit/Card'
import { OperationInfoAmount } from './OperationInfoAmount'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoName } from './OperationInfoName'
import { OperationInfoType } from './OperationInfoType'
import { OperationInfoWallet } from './OperationInfoWallet'

export const OperationInfoCard: FC = () => {
  const { operation } = useOperationContext()

  const router = useRouter()

  const handleDelete = useCallback(async () => {
    await deleteOperation({
      operationId: operation.id,
    })

    await router.push(ROUTES.WALLET(operation.wallet.id))
  }, [operation.id, operation.wallet.id, router])

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
    </Card>
  )
}
