import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { Container } from '../ui-kit/Container'

interface PageDashboardIdProps {
  group: ClientGroup
}

export const PageDashboardId: FC<PageDashboardIdProps> = ({ group }) => {
  return (
    <Container className="py-6">
      <h1 className="text-xl font-medium mb-6">{group.name}</h1>
    </Container>
  )
}
