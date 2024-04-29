import React from 'react'
import { GroupMembersCard } from '@/cards/GroupMembers/index.jsx'
import { GroupSettingsGeneralCard } from '@/cards/GroupSettingsGeneral/index.jsx'
import { RenameCategoryCard } from '@/cards/RenameCategory/index.jsx'
import { Breadcrumbs } from '@/components/common/Breadcrumbs.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'
import { useTitle } from '@/hooks/useTitle.js'

interface GroupSettingsProps {
  groupId: string
}

export const GroupSettings = ({ groupId }: GroupSettingsProps) => {
  const { group } = useGroup({ groupId })

  useTitle(`Expense > ${group.name} > Settings`)

  const parents = React.useMemo(
    () => [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(groupId),
        title: group.name,
      },
    ],
    [group.name, groupId],
  )

  return (
    <>
      <Breadcrumbs parents={parents} />
      <Title title="Settings" />

      <Columns>
        <GroupSettingsGeneralCard groupId={groupId} />
        <GroupMembersCard groupId={groupId} />
        <RenameCategoryCard groupId={groupId} />
      </Columns>
    </>
  )
}
