import { FC } from 'react'
import { ClientGroup } from '../../models/group'
import { DashboardGroups } from './DashboardGroups'

interface Props {
  groups: ClientGroup[]
}

export const Dashboard: FC<Props> = ({ groups }) => {
  return (
    <>
      <h1 className="text-lg font-medium mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <DashboardGroups groups={groups} />
      </div>
    </>
  )
}
