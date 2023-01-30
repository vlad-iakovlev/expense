import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import { useCallback } from 'react'
import useSWR from 'swr'
import { getGroups } from '../../api/client/groups'
import { Dashboard } from '../../components/Dashboard'

const DashboardPage: NextPage = () => {
  const { data: { groups } = {}, isLoading } = useSWR(
    'groups',
    useCallback(() => getGroups(), [])
  )

  if (isLoading) {
    return null
  }

  if (!groups) {
    return <Error statusCode={404} />
  }

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
