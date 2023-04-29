import { FC } from 'react'
import { Card } from '../../ui-kit/Card/Card.tsx'
import { OperationInfoCategory } from './OperationInfoCategory.tsx'
import { OperationInfoDate } from './OperationInfoDate.tsx'
import { OperationInfoDelete } from './OperationInfoDelete.tsx'
import { OperationInfoExpenseAmount } from './OperationInfoExpenseAmount.tsx'
import { OperationInfoExpenseWallet } from './OperationInfoExpenseWallet.tsx'
import { OperationInfoIncomeAmount } from './OperationInfoIncomeAmount.tsx'
import { OperationInfoIncomeWallet } from './OperationInfoIncomeWallet.tsx'
import { OperationInfoName } from './OperationInfoName.tsx'
import { OperationInfoType } from './OperationInfoType.tsx'

interface Props {
  className?: string
  operationId: string
}

export const OperationInfoCard: FC<Props> = ({ className, operationId }) => {
  return (
    <Card className={className}>
      <Card.Title
        title="Info"
        action={<OperationInfoDelete operationId={operationId} />}
      />
      <Card.Divider />
      <OperationInfoDate operationId={operationId} />
      <OperationInfoCategory operationId={operationId} />
      <OperationInfoName operationId={operationId} />
      <OperationInfoType operationId={operationId} />
      <OperationInfoExpenseWallet operationId={operationId} />
      <OperationInfoExpenseAmount operationId={operationId} />
      <OperationInfoIncomeWallet operationId={operationId} />
      <OperationInfoIncomeAmount operationId={operationId} />
    </Card>
  )
}
