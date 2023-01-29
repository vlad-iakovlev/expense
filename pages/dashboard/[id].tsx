import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupResponse } from '../../api/group'
import { Group as GroupComponent } from '../../components/Group'

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

const DashboardId: NextPage<Props> = ({ id }) => {
  const { data, isLoading } = useSWR<GetGroupResponse>(`/api/group/${id}`)
  const group = data?.group

  if (isLoading) return null
  if (!group) return <Error statusCode={404} />

  return (
    <>
      <Head>
        <title>{`Expense – Group ${group.name}`}</title>
      </Head>

      <GroupComponent group={group} />
    </>
  )
}

export default DashboardId
