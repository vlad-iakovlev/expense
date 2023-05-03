import { FC } from 'react'
import { GroupsCards } from '../../cards/Groups/Groups.tsx'
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

      <Columns>
        <GroupsCards />
      </Columns>
    </>
  )
}
