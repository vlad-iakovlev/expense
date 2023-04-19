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
}

export const OperationInfoCard: FC<Props> = ({ className }) => {
  return (
    <Card className={className}>
      <Card.Title title="Info" action={<OperationInfoDelete />} />
      <Card.Divider />
      <OperationInfoDate />
      <OperationInfoCategory />
      <OperationInfoName />
      <OperationInfoType />
      <OperationInfoExpenseWallet />
      <OperationInfoExpenseAmount />
      <OperationInfoIncomeWallet />
      <OperationInfoIncomeAmount />
    </Card>
  )
}
