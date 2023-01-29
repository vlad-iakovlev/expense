import { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupsResponse } from '../../api/group'
import { PageDashboard } from '../../components/PageDashboard'

const Dashboard: NextPage = () => {
  const { data } = useSWR<GetGroupsResponse>('/api/group')
  const groups = data?.groups

  if (!groups) {
    // TODO redirect
    return null
  }

  return (
    <>
      <Head>
        <title>Expense – Dashboard</title>
      </Head>

      <PageDashboard groups={groups} />
    </>
  )
}

export default Dashboard
