import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import { useCallback } from 'react'
import useSWR from 'swr'
import { getGroups } from '../../api/client/groups'
import { getWallets } from '../../api/client/wallets'
import { Dashboard } from '../../components/Dashboard'
import { SWR_KEYS } from '../../constants/swr'

const DashboardPage: NextPage = () => {
  const { data: { groups } = {}, isLoading: isGroupsLoading } = useSWR(
    SWR_KEYS.GROUPS,
    useCallback(() => getGroups(), [])
  )

  const { data: { wallets } = {}, isLoading: isWalletsLoading } = useSWR(
    SWR_KEYS.WALLETS,
    useCallback(() => getWallets(), [])
  )

  if (isGroupsLoading || isWalletsLoading) {
    return null
  }

  if (!groups || !wallets) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Expense – Dashboard</title>
      </Head>

      <Dashboard groups={groups} wallets={wallets} />
    </>
  )
}

export default DashboardPage
