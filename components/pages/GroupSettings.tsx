import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.js'
import { useGroup } from '../../contexts/RootStore/hooks/useGroup.js'
import { GroupMembersCard } from '../cards/GroupMembers/GroupMembers.jsx'
import { GroupSettingsGeneralCard } from '../cards/GroupSettingsGeneral/GroupSettingsGeneral.jsx'
import { RenameCategoryCard } from '../cards/RenameCategory/RenameCategory.jsx'
import { NextHead } from '../next/Head.js'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

interface Props {
  groupId: string
}

export const GroupSettings = ({ groupId }: Props) => {
  const { group } = useGroup({ groupId })

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(groupId),
        title: group.name,
      },
    ]
  }, [group.name, groupId])

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
