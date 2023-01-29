import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupResponse } from '../../../api/group'
import { GetWalletsResponse } from '../../../api/wallet'
import { Group as GroupComponent } from '../../../components/Group'

interface Props {
  id: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      id: String(context.query.id),
    },
  }
}

const DashboardIdPage: NextPage<Props> = ({ id }) => {
  const { data: groupData, isLoading: isGroupLoading } =
    useSWR<GetGroupResponse>(`/api/group/${id}`)
  const { data: walletsData, isLoading: isWalletsLoading } =
    useSWR<GetWalletsResponse>(`/api/group/${id}/wallet`)
  const group = groupData?.group
  const wallets = walletsData?.wallets

  if (isGroupLoading || isWalletsLoading) return null
  if (!group || !wallets) return <Error statusCode={404} />

  return (
    <>
      <Head>
        <title>{`Expense – ${group.name}`}</title>
      </Head>

      <GroupComponent group={group} wallets={wallets} />
    </>
  )
}

export default DashboardIdPage
