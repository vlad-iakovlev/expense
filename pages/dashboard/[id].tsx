import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { GetGroupResponse } from '../../api/group'
import { PageDashboardId } from '../../components/PageDashboardId'

const DashboardId: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR<GetGroupResponse>(`/api/group/${router.query.id}`)
  const group = data?.group

  if (!group) {
    // TODO redirect
    return null
  }

  return (
    <>
      <Head>
        <title>{`Expense – Group ${group.name || ''}`}</title>
      </Head>

      {group ? <PageDashboardId group={group} /> : null}
    </>
  )
}

export default DashboardId
