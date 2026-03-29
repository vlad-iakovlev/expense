'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useEffect } from 'react'
import { GroupInfoCard } from '@/cards/GroupInfo/index'
import { OperationsListCard } from '@/cards/OperationsList/index'
import { StatisticsCard } from '@/cards/Statistics/index'
import { WalletsListCard } from '@/cards/WalletsList/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'
import { useOptionalGroup } from '@/contexts/RootStore/hooks/useGroup'

type GroupPageProps = {
  params: Promise<{
    groupId: string
  }>
}

const GroupPage = ({ params }: GroupPageProps) => {
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
        ]}
      />
      <Title title={group.name} />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupInfoCard groupId={groupId} />
        <div className="grid grid-cols-1 items-start gap-[inherit] md:row-span-full lg:col-span-2 lg:grid-cols-2">
          <WalletsListCard groupId={groupId} />
          <OperationsListCard groupId={groupId} />
        </div>
        <StatisticsCard
          className="md:max-xl:col-start-1 md:max-xl:row-start-2 xl:row-span-full"
          groupId={groupId}
        />
      </Columns>
    </>
  )
}

export default function WrappedGroupPage(props: GroupPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <GroupPage {...props} />
      </CategoryFilterProvider>
    </Page>
  )
}
