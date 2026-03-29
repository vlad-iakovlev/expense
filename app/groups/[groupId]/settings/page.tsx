'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useEffect } from 'react'
import { GroupMembersCard } from '@/cards/GroupMembers/index'
import { GroupSettingsGeneralCard } from '@/cards/GroupSettingsGeneral/index'
import { RenameCategoryCard } from '@/cards/RenameCategory/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalGroup } from '@/contexts/RootStore/hooks/useGroup'

type GroupSettingsPageProps = {
  params: Promise<{
    groupId: string
  }>
}

const GroupSettingsPage = ({ params }: GroupSettingsPageProps) => {
  const { groupId } = use(params)
  const router = useRouter()
  const { group } = useOptionalGroup({ groupId })

  useEffect(() => {
    if (!group) {
      router.push(ROUTES.DASHBOARD)
    }
  }, [group, router])

  if (!group) return null

  return (
    <>
      <Breadcrumbs
        parents={[
          {
            href: ROUTES.DASHBOARD,
            title: 'Dashboard',
          },
          {
            href: ROUTES.GROUP(groupId),
            title: group.name,
          },
        ]}
      />
      <Title title="Settings" />

      <Columns>
        <GroupSettingsGeneralCard groupId={groupId} />
        <GroupMembersCard groupId={groupId} />
        <RenameCategoryCard groupId={groupId} />
      </Columns>
    </>
  )
}

export default function WrappedGroupSettingsPage(
  props: GroupSettingsPageProps,
) {
  return (
    <Page>
      <CategoryFilterProvider>
        <GroupSettingsPage {...props} />
      </CategoryFilterProvider>
    </Page>
  )
}
