import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupsResponse } from '../../api/group'
import { Dashboard } from '../../components/Dashboard'

const DashboardPage: NextPage = () => {
  const { data, isLoading } = useSWR<GetGroupsResponse>('/api/group')
  const groups = data?.groups

  if (isLoading) return null
  if (!groups) return <Error statusCode={404} />

  return (
    <>
      <Head>
        <title>Expense – Dashboard</title>
      </Head>

      <Dashboard groups={groups} />
    </>
  )
}

export default DashboardPage
