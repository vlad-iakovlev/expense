import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupResponse } from '../../../api/group'
import { GetWalletsResponse } from '../../../api/wallet'
import { Group } from '../../../components/Group'

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
  const { data: groupData, isLoading: isGroupLoading } =
    useSWR<GetGroupResponse>(`/api/group/${groupId}`)
  const { data: walletsData, isLoading: isWalletsLoading } =
    useSWR<GetWalletsResponse>(`/api/group/${groupId}/wallets`)
  const group = groupData?.group
  const wallets = walletsData?.wallets

  if (isGroupLoading || isWalletsLoading) return null
  if (!group || !wallets) return <Error statusCode={404} />

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
