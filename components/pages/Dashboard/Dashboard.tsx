import { FC } from 'react'
import { GroupsCard } from '../../cards/Groups/Groups.tsx'
import { OperationsCard } from '../../cards/Operations/Operations.tsx'
import { StatisticsCard } from '../../cards/Statistics/Statistics.tsx'
import { WalletsCard } from '../../cards/Wallets/Wallets.tsx'
import { Columns } from '../../ui-kit/Columns/Columns.tsx'
import { NextHead } from '../../ui-kit/NextHead/NextHead.ts'
import { Title } from '../../ui-kit/Title/Title.tsx'

export const Dashboard: FC = () => {
  return (
    <>
      <NextHead>
        <title>Expense</title>
      </NextHead>

      <Title>Dashboard</Title>

      <Columns className="md:grid-flow-col md:grid-rows-[auto_auto_1fr] lg:grid-rows-[auto_1fr] xl:grid-rows-none">
        <GroupsCard />
        <WalletsCard />
        <OperationsCard className="lg:row-span-full" />
        <StatisticsCard className="md:row-span-full" />
      </Columns>
    </>
  )
}
