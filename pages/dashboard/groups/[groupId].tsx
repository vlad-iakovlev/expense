import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import { useCallback } from 'react'
import useSWR from 'swr'
import { getGroup } from '../../../api/client/groups'
import { getWallets } from '../../../api/client/wallets'
import { Group } from '../../../components/Group'
import { SWR_KEYS } from '../../../constants/swr'

interface Props {
  groupId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      groupId: String(context.query.groupId),
    },
  }
}

const GroupPage: NextPage<Props> = ({ groupId }) => {
  const { data: { group } = {}, isLoading: isGroupLoading } = useSWR(
    SWR_KEYS.GROUP(groupId),
    useCallback(() => getGroup(groupId), [groupId])
  )

  const { data: { wallets } = {}, isLoading: isWalletsLoading } = useSWR(
    SWR_KEYS.GROUP_WALLETS(groupId),
    useCallback(() => getWallets(groupId), [groupId])
  )

  if (isGroupLoading || isWalletsLoading) {
    return null
  }

  if (!group || !wallets) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{`Expense – ${group.name}`}</title>
      </Head>

      <Group group={group} wallets={wallets} />
    </>
  )
}

export default GroupPage
