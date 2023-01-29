import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupsResponse } from '../../api/group'
import { Groups } from '../../components/Groups'

const Dashboard: NextPage = () => {
  const { data, isLoading } = useSWR<GetGroupsResponse>('/api/group')
  const groups = data?.groups

  if (isLoading) return null
  if (!groups) return <Error statusCode={404} />

  return (
    <>
      <Head>
        <title>Expense – Dashboard</title>
      </Head>

      <Groups groups={groups} />
    </>
  )
}

export default Dashboard
