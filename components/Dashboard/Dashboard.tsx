import { FC } from 'react'
import { ClientGroup } from '../../api/types/groups'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'
import { DashboardGroups } from './DashboardGroups'

interface Props {
  groups: ClientGroup[]
}

export const Dashboard: FC<Props> = ({ groups }) => {
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Title title="Dashboard" />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <DashboardGroups groups={groups} />
      </div>
    </>
  )
}
