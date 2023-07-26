import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router.js'
import { useCallback, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { useGroup } from '../../contexts/RootStore/hooks/useGroup.ts'
import { GroupInfoCard } from '../cards/GroupInfo/GroupInfo.tsx'
import { OperationsListCard } from '../cards/OperationsList/OperationsList.tsx'
import { StatisticsCard } from '../cards/Statistics/Statistics.tsx'
import { WalletsListCard } from '../cards/WalletsList/WalletsList.tsx'
import { NextHead } from '../next/Head.ts'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Button } from '../ui-kit/Button/Button.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'
import { Title } from '../ui-kit/Title/Title.tsx'

interface Props {
  groupId: string
}

export const Group = ({ groupId }: Props) => {
  const router = useRouter()
  const { group } = useGroup({ groupId })

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
    ]
  }, [])

  const handleOpenSettings = useCallback(() => {
    void (async () => {
      const href = ROUTES.GROUP_SETTINGS(groupId)
      await router.push(
        { pathname: href, query: { animation: 'forward' } },
        href,
      )
    })()
  }, [groupId, router])

  return (
    <>
      <NextHead>
        <title>{`Expense > ${group.name}`}</title>
      </NextHead>

      <Breadcrumbs parents={parents} />
      <Title
        title={group.name}
        actions={
          <Button
            className="-my-1"
            size="lg"
            rounded
            theme="zinc"
            iconStart={<Cog6ToothIcon />}
            onClick={handleOpenSettings}
          />
        }
      />

      <Columns className="md:grid-flow-col md:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupInfoCard groupId={groupId} />
        <div className="md:row-span-full lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 items-start gap-[inherit]">
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
