import { FC } from 'react'
import { Card } from '../../ui-kit/Card'
import { OperationInfoAmount } from './OperationInfoAmount'
import { OperationInfoCategory } from './OperationInfoCategory'
import { OperationInfoDate } from './OperationInfoDate'
import { OperationInfoDescription } from './OperationInfoDescription'
import { OperationInfoWallet } from './OperationInfoWallet'

export const OperationInfoCard: FC = () => (
  <Card>
    <Card.Title title="Info" />
    <Card.Divider />
    <OperationInfoDate />
    <OperationInfoWallet />
    <OperationInfoCategory />
    <OperationInfoDescription />
    <OperationInfoAmount />
  </Card>
)
