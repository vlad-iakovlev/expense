import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { GetGroupResponse } from '../../api/group'
import { Group as GroupComponent } from '../../components/Group'

const DashboardId: NextPage = () => {
  const router = useRouter()
  const { data, isLoading } = useSWR<GetGroupResponse>(
    `/api/group/${router.query.id}`
  )
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
