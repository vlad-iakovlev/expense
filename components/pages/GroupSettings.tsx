import { useMemo } from 'react'
import { GroupMembersCard } from '@/components/cards/GroupMembers/GroupMembers.jsx'
import { GroupSettingsGeneralCard } from '@/components/cards/GroupSettingsGeneral/GroupSettingsGeneral.jsx'
import { RenameCategoryCard } from '@/components/cards/RenameCategory/RenameCategory.jsx'
import { NextHead } from '@/components/next/Head.js'
import { Breadcrumbs } from '@/components/ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '@/components/ui-kit/Columns/Columns.jsx'
import { Title } from '@/components/ui-kit/Title/Title.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup.js'

interface Props {
  groupId: string
}

export const GroupSettings = ({ groupId }: Props) => {
  const { group } = useGroup({ groupId })

  const parents = useMemo(
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
      <NextHead>
        <title>{`Expense > ${group.name} > Settings`}</title>
      </NextHead>

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
