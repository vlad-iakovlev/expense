import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { Groups } from '../Groups'
import { Container } from '../ui-kit/Container'

interface PageDashboardProps {
  groups: ClientGroup[]
}

export const PageDashboard: FC<PageDashboardProps> = ({ groups }) => {
  return (
    <Container className="py-6">
      <Groups groups={groups} />
    </Container>
  )
}
