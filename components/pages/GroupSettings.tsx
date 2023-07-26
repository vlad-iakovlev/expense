import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useGroup } from '../../contexts/RootStore/hooks/useGroup.ts'
import { GroupMembersCard } from '../cards/GroupMembers/GroupMembers.tsx'
import { GroupSettingsGeneralCard } from '../cards/GroupSettingsGeneral/GroupSettingsGeneral.tsx'
import { RenameCategoryCard } from '../cards/RenameCategory/RenameCategory.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

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
