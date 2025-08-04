import Head from 'next/head'
import { useMemo } from 'react'
import { GroupMembersCard } from '@/cards/GroupMembers/index'
import { GroupSettingsGeneralCard } from '@/cards/GroupSettingsGeneral/index'
import { RenameCategoryCard } from '@/cards/RenameCategory/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { ROUTES } from '@/constants/routes'
import { useGroup } from '@/contexts/RootStore/hooks/useGroup'

type GroupSettingsProps = {
  groupId: string
}

export const GroupSettings = ({ groupId }: GroupSettingsProps) => {
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
      <Head>
        <title>{`Expense > ${group.name} > Settings`}</title>
      </Head>

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
